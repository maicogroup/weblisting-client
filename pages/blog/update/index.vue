<template>
	<div class="flex flex-row w-full justify-center mb-72">
		<div class="flex flex-col items-center w-[52.25rem] mr-2">
			<h1 class="text-3xl font-bold mb-10">Chỉnh sửa bài viết</h1>
			<textbox
				class="mb-6"
				title="Tiêu đề"
				v-model="blog.pageInfor.title"
				:handleChange="() => (flag = true)"
			/>
			<h2 class="mb-2 text-zinc-800 font-medium"></h2>
			<Editor
				:existingContent="editorContent"
				@contentChanged="onChange"
				v-if="editorContent.blocks.length > 0"
				title="Nội dung"
				class="mb-5"
			/>
			<button-basic
				:handleClick="handleSubmit"
				style="height: 50px"
				class="self-end"
				>Cập nhật</button-basic
			>
		</div>
		<div
			class="flex flex-col w-[22rem] mt-[214px] items-center rounded-md border border-neutral-300 h-fit p-5"
		>
			<h2 class="mb-7 text-stone-900 font-bold text-lg">Thiết lập bài viết</h2>
			<textbox
				@onchange="() => (flag = true)"
				class="mb-7"
				title="Slug"
				v-model="blog.pageInfor.slug"
				:handleChange="() => (flag = true)"
			/>
			<textbox
				@onchange="() => (flag = true)"
				title="Meta Description"
				v-model="blog.pageInfor.metaDescription"
				type="textarea"
				:handleChange="() => (flag = true)"
				class="mb-7"
			/>
			<div
				v-if="
					typeof blog.thumbnail != 'object' &&
					blog.thumbnail.includes('weblisting')
				"
			>
				<p class="mb-2 text-zinc-800 font-medium">Thumbnail</p>
				<img class="mb-7" :src="blog.thumbnail" />
			</div>
			<preview-thumbnail
				title="Chỉnh sửa ảnh Thumbnail"
				:setThumbnail="setThumbnail"
			/>
		</div>
	</div>
</template>

<script>
import Editor from "~/components/editor/Editor.vue";
import Textbox from "~/components/textbox/index.vue";
import ButtonBasic from "~/components/button-basic/index.vue";
import gql from "graphql-tag";
import PreviewThumbnail from "../create/preview-thumbnail";

const getBlog = gql`
	query GetBlog($condition: BlogCollectionFilterInput) {
		blog(where: $condition) {
			id
			content
			pageInfor {
				title
				slug
				metaDescription
			}
			authorId
			author {
				id
				name
			}
			thumbnail
		}
	}
`;

const updateBlog = gql`
	mutation UpdateBlog($input: UpdateBlogInput!) {
		updateBlog(input: $input) {
			string
		}
	}
`;

export default {
	components: { Editor, Textbox, ButtonBasic, PreviewThumbnail },
	apollo: {
		blog: {
			query() {
				return getBlog;
			},
			variables() {
				return {
					condition: {
						pageInfor: {
							slug: {
								eq: this.$route.params.slug,
							},
						},
					},
				};
			},
		},
	},
	watch: {
		blog: function () {
			this.editorContent = JSON.parse(this.blog.content);
			this.editorCount = this.editorContent.blocks.length;
			console.log(this.editorContent);
		},
		"blog.pageInfor.title"() {
			this.blog.pageInfor.slug = `${this.blog.pageInfor.title
				.toLowerCase()
				.normalize("NFD")
				.replaceAll("đ", "d")
				.replace(/[\u0300-\u036f]|[^\w\s]/g, "")
				.split(" ")
				.join("-")}`;
		},
	},

	data() {
		return {
			editorCount: 0,
			flag: false,
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
		};
	},
	head() {
		return {
			title: "Chỉnh sửa blog",
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
	methods: {
		onChange(data) {
			this.editorContent = data;
		},
		setThumbnail(file) {
			this.blog.thumbnail = file;
			this.flag = true;
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
					Key: `blog/${this.blog.id}/${file.name}`,
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

				this.blog.thumbnail.s3Url = `https://weblisting.hn.ss.bfcplatform.vn/blog/${this.blog.id}/${file.name}`;
			};
			uploadImageToS3(file);
		},
		handleSubmit() {
			if (
				this.flag === false &&
				this.editorContent.blocks.length === this.editorCount
			) {
				this.$toast.show("Dữ liệu chưa có thay đổi", {
					type: "error",
					theme: "bubble",
					duration: 3000,
					position: "top-right",
				});
				return;
			}
			if (this.blog.pageInfor.title === "") {
				this.$toast.show("Tiêu đề không được để trống!", {
					type: "error",
					theme: "bubble",
					duration: 3000,
				});
				return;
			}
			if (this.blog.pageInfor.slug === "") {
				this.$toast.show("Slug không được để trống", {
					type: "error",
					theme: "bubble",
					duration: 3000,
					position: "top-right",
				});
				return;
			}
			if (this.blog.pageInfor.metaDescription === "") {
				this.$toast.show("Meta Description không được để trống", {
					type: "error",
					theme: "bubble",
					duration: 3000,
					position: "top-right",
				});
				return;
			}
			if (typeof this.blog.thumbnail === "object") {
				this.UploadThumbnail(this.blog.thumbnail);
			}
			const urlModified = [];

			const imageUrlArray = this.editorContent.blocks
				.filter(
					block =>
						block.type === "image" && block.data.file.url.includes("blob"),
				)
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
					Key: `blog/${this.blog.id}/${file.name}`,
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
					url: `https://weblisting.hn.ss.bfcplatform.vn/blog/${this.blog.id}/${file.name}`,
				});
				// upload.on("httpUploadProgress", function (evt) {
				//   var progress = parseInt((evt.loaded * 100) / evt.total);
				//   console.log(progress + "%");
				// });
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

			//FIXME: Data ở đây nha <3
			// const submitData = {
			//   ...this.values,
			//   blogId: ObjectId,
			//   pageInfor: {
			//     ...this.values.pageInfor,
			//     slug: this.slug,
			//   },
			//   content: JSON.stringify({ ...this.editorContent, blocks: contentData }),
			// };
			// console.log(submitData);

			this.$apollo
				.mutate({
					mutation: updateBlog,
					variables: {
						input: {
							thumbnail: this.blog.thumbnail.s3Url,
							blogId: this.blog.id,
							content: JSON.stringify({
								...this.editorContent,
								blocks: contentData,
							}),
							pageInfor: {
								title: this.blog.pageInfor.title,
								slug: this.blog.pageInfor.slug,
								metaDescription: this.blog.pageInfor.metaDescription,
							},
						},
					},
				})
				.then(data => {
					this.$toast.show("Cập nhật thành công!", {
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
}
</style>
