<template>
	<div class="flex flex-row w-full justify-center mb-72">
		<div class="flex flex-col items-center w-[52.25rem] mr-2">
			<h1 class="text-3xl font-bold mb-10">Thêm bài viết</h1>
			<textbox class="mb-6" title="Tiêu đề" v-model="values.pageInfor.title" />
			<h2 class="mb-2 text-zinc-800 font-medium"></h2>
			<Editor
				:blog-content="editorContent"
				@contentChanged="onChange"
				title="Nội dung"
				class="mb-5"
			/>

			<button-basic
				v-if="buttonState === 'success'"
				style="height: 50px"
				class="self-end"
			>
				<NuxtLink :to="`/blog/${values.pageInfor.slug}`">Xem bài đăng</NuxtLink>
			</button-basic>
			<button-basic
				v-else
				:handleClick="handleSubmit"
				style="height: 50px"
				class="self-end"
				:isDisable="buttonState === 'pending'"
				>{{
					buttonState === "init"
						? "Đăng bài"
						: buttonState === "pending"
						? "Đang tải"
						: "Xem bài đăngg"
				}}</button-basic
			>
		</div>
		<div
			class="flex flex-col w-[22rem] mt-[214px] items-center rounded-md border border-neutral-300 h-fit p-5"
		>
			<h2 class="mb-7 text-stone-900 font-bold text-lg">Thiết lập bài viết</h2>
			<textbox class="mb-7" title="Slug" v-model="values.pageInfor.slug" />
			<textbox
				title="Meta Description"
				v-model="values.pageInfor.metaDescription"
				type="textarea"
				class="mb-7"
			/>
			<preview-thumbnail
				title="Tải lên ảnh Thumbnail"
				:setThumbnail="setThumbnail"
			/>
		</div>

		<guest-user-authentication-modal
			:open="showAuthenModal"
			:sign-up="signUp"
			@close="showAuthenModal = false"
		/>
	</div>
</template>

<script>
import Editor from "~/components/editor/Editor.vue";
import Textbox from "~/components/textbox/index.vue";
import ButtonBasic from "~/components/button-basic/index.vue";
import PreviewThumbnail from "./preview-thumbnail";
import GuestUserAuthenticationModal from "~/pages/components/guest-user-authentication-modal.vue";
import gql from "graphql-tag";

export default {
	components: {
		Editor,
		Textbox,
		ButtonBasic,
		PreviewThumbnail,
		GuestUserAuthenticationModal,
	},
	data() {
		return {
			signUp: true,
			showAuthenModal: false,
			buttonState: "init",
			editorContent: { time: "", blocks: [], version: "2.22.2" },
			values: {
				pageInfor: {
					slug: "",
					title: "",
					metaDescription: "",
				},
				content: "",
				blogId: "",
			},
			guestUser: {},
			thumbnail: null,
			ObjectId: ((
				m = Math,
				d = Date,
				h = 16,
				s = s => m.floor(s).toString(h),
			) =>
				s(d.now() / 1000) +
				" ".repeat(h).replace(/./g, () => s(m.random() * h)))(),
		};
	},
	created() {
		this.guestUser = this.$cookies.get("GuestUser") ?? null;
	},
	head() {
		return {
			title: "Khởi tạo blog",
			script: [
				{
					once: true,
					hid: "s3-sdk",
					src: "https://sdk.amazonaws.com/js/aws-sdk-2.1095.0.min.js",
					body: true,
				},
			],
		};
	},
	watch: {
		"values.pageInfor.title"() {
			this.values.pageInfor.slug = `${this.values.pageInfor.title
				.trim()
				.toLowerCase()
				.normalize("NFD")
				.replaceAll("đ", "d")
				.replace(/[\u0300-\u036f]|[^\w\s\-]/g, "")
				.split(" ")
				.join("-")}`;
		},
	},
	methods: {
		openAuthenModal(signUp) {
			this.showAuthenModal = true;
			this.signUp = signUp;
		},
		setThumbnail(file) {
			this.thumbnail = file;
			console.log(this.thumbnail);
		},
		onChange(data) {
			this.editorContent = data;
			console.log(this.editorContent);
		},
		UploadThumbnail(file) {
			AWS.config.update({
				accessKeyId: "8EL21GNHMRNZYW8488OV",
				secretAccessKey: "xBjwyBdSYz91ADgV9TH8oeTnAuZapmAJ8ycmrCiD",
				region: "hn",
				endpoint: "https://hn.ss.bfcplatform.vn",
				apiVersions: {
					s3: "2006-03-01",
				},
			});

			const uploadImageToS3 = file => {
				const s3 = new AWS.S3();

				var uploadParams = {
					Bucket: "weblisting",
					Key: `blog/${this.ObjectId}/${file.name}`,
					Body: file,
					ACL: "public-read",
					ContentType: file.type,
				};

				var uploadOptions = {
					partSize: 10 * 1024 * 1024,
					queueSize: 1,
				};

				var upload = s3.upload(uploadParams, uploadOptions);

				upload.send((err, data) => {
					if (err) {
						console.error("Upload lỗi:", err);
					} else if (data) {
						console.log("Upload thành công:", data);
					}
				});

				this.thumbnail.S3url = `https://weblisting.hn.ss.bfcplatform.vn/blog/${this.ObjectId}/${file.name}`;
			};
			uploadImageToS3(file);
		},
		handleSubmit() {
			this.guestUser = this.$cookies.get("GuestUser") ?? null;
			if (this.guestUser == null) {
				this.openAuthenModal(false);
				this.guestUser = this.$cookies.get("GuestUser") ?? null;

				return;
			} else {
				if (this.values.pageInfor.title === "") {
					this.$toast.show("Tiêu đề không được để trống", {
						type: "error",
						theme: "bubble",
						duration: 3000,
						position: "top-right",
					});
					return;
				}
				console.log(this.slug);
				if (this.values.pageInfor.slug === "") {
					this.$toast.show("Slug không được để trống", {
						type: "error",
						theme: "bubble",
						duration: 3000,
						position: "top-right",
					});
					return;
				}
				if (this.values.pageInfor.metaDescription === "") {
					this.$toast.show("Meta Description không được để trống", {
						type: "error",
						theme: "bubble",
						duration: 3000,
						position: "top-right",
					});
					return;
				}
				if (this.editorContent.blocks.length === 0) {
					this.$toast.show("Nội dung không được để trống", {
						type: "error",
						theme: "bubble",
						duration: 3000,
						position: "top-right",
					});
					return;
				}
				if (this.thumbnail === null) {
					this.$toast.show("Thumbnail không được để trống!", {
						type: "error",
						theme: "bubble",
						duration: 3000,
						position: "top-right",
					});
					return;
				}

				this.buttonState = "pending";
				const urlModified = [];

				const imageUrlArray = this.editorContent.blocks
					.filter(block => block.type === "image")
					.map(block => ({
						id: block.id,
						url: block.data.file.url,
						file: block.data.file.file,
					}));

				AWS.config.update({
					accessKeyId: "8EL21GNHMRNZYW8488OV",
					secretAccessKey: "xBjwyBdSYz91ADgV9TH8oeTnAuZapmAJ8ycmrCiD",
					region: "hn",
					endpoint: "https://hn.ss.bfcplatform.vn",
					apiVersions: {
						s3: "2006-03-01",
					},
				});

				const uploadImageToS3 = (file, id) => {
					const s3 = new AWS.S3();

					var uploadParams = {
						Bucket: "weblisting",
						Key: `blog/${this.ObjectId}/${file.name}`,
						Body: file,
						ACL: "public-read",
						ContentType: file.type,
					};

					var uploadOptions = {
						partSize: 10 * 1024 * 1024,
						queueSize: 1,
					};

					var upload = s3.upload(uploadParams, uploadOptions);

					upload.send((err, data) => {
						if (err) {
							console.error("Upload lỗi:", err);
						} else if (data) {
							console.log("Upload thành công:", data);
						}
					});

					urlModified.push({
						id,
						url: `https://weblisting.hn.ss.bfcplatform.vn/blog/${this.ObjectId}/${file.name}`,
					});
				};

				imageUrlArray.map(img => uploadImageToS3(img.file, img.id));

				const contentData = this.editorContent.blocks.map(block => {
					urlModified.map(img => {
						if (img.id === block.id) {
							block = {
								...block,
								data: {
									...block.data,
									file: {
										url: img.url,
									},
								},
							};
						}
					});
					return block;
				});

				this.UploadThumbnail(this.thumbnail);

				//FIXME: Data ở đây nha <3
				const submitData = {
					...this.values,
					authorId: this.guestUser.id,
					blogId: this.ObjectId,
					pageInfor: {
						...this.values.pageInfor,
					},
					thumbnail: this.thumbnail.S3url,
					content: JSON.stringify({
						...this.editorContent,
						blocks: contentData,
					}),
				};

				//FIXME this.thumbnail.S3url là url thumbnail nha

				this.$apollo
					.mutate({
						mutation: gql`
							mutation CreateBlog($input: CreateBlogInput!) {
								createBlog(input: $input) {
									string
								}
							}
						`,
						variables: {
							input: submitData,
						},
					})
					.then(data => {
						this.$toast.show("Đăng thành công!", {
							type: "success",
							theme: "bubble",
							duration: 3000,
							position: "top-right",
						});
					})
					.catch(error => {
						this.$toast.show("Slug đã tồn tại", {
							type: "error",
							theme: "bubble",
							duration: 3000,
							position: "top-right",
						});
					});
				this.buttonState = "success";
			}
		},
	},
};
</script>

<style lang="scss">
.ce-block {
	h1 {
		display: block;
		font-size: 2em;
		margin-top: 0.67em;
		margin-bottom: 0.67em;
		margin-left: 0;
		margin-right: 0;
		font-weight: bold;
	}

	h2 {
		display: block;
		font-size: 1.5em;
		margin-top: 0.83em;
		margin-bottom: 0.83em;
		margin-left: 0;
		margin-right: 0;
		font-weight: bold;
	}

	h3 {
		display: block;
		font-size: 1.17em;
		margin-top: 1em;
		margin-bottom: 1em;
		margin-left: 0;
		margin-right: 0;
		font-weight: bold;
	}

	h4 {
		display: block;
		font-size: 1em;
		margin-top: 1.33em;
		margin-bottom: 1.33em;
		margin-left: 0;
		margin-right: 0;
		font-weight: bold;
	}

	h5 {
		display: block;
		font-size: 0.83em;
		margin-top: 1.67em;
		margin-bottom: 1.67em;
		margin-left: 0;
		margin-right: 0;
		font-weight: bold;
	}

	h6 {
		display: block;
		font-size: 0.67em;
		margin-top: 2.33em;
		margin-bottom: 2.33em;
		margin-left: 0;
		margin-right: 0;
		font-weight: bold;
	}

	& img {
		margin: auto;
	}

	p > a {
		color: blue;
		text-decoration: underline;
	}
}
</style>
