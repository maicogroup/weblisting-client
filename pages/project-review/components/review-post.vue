<template>
	<div class="">
		<guest-user-authentication-modal
			:open="isShowingLogIn"
			@close="isShowingLogIn = false"
		/>
		<div class="border rounded-md px-3 lg:px-8 py-3 lg:py-5 my-2">
			<div class="flex items-center">
				<guest-user-avatar
					:name="review.authorName"
					class="w-10 h-10 rounded-full cursor-pointer"
				></guest-user-avatar>
				<div class="ml-2">
					<a href="#" class="text-base font-bold">
						{{ review.authorName }}
					</a>
					<div class="text-sm text-neutral-400">
						{{ formatPostDate(review.dateCreated) }}
					</div>
				</div>
			</div>

			<p
				id="review-content"
				ref="reviewContent"
				:class="[!showFullContent ? shortContentClass : '']"
				class="text-sm text-stone-900 font-normal mt-1 leading-4 lg:leading-5"
				v-html="review.content"
			/>
			<span
				v-if="contentOverflowing && !showFullContent"
				id="show-more"
				class="text-sm cursor-pointer text-gray-500"
				@click="showFullContent = !showFullContent"
				>Xem thêm</span
			>
			<span
				v-if="contentOverflowing && showFullContent"
				class="text-sm cursor-pointer text-gray-500"
				@click="showFullContent = !showFullContent"
				>Rút gọn</span
			>
			<div class="mt-2">
				<div
					v-if="review.imageSources.length == 1"
					class="max-h-[55vh] md:max-h-[600px] md:min-h-[300px] bg-black/80"
				>
					<div class="">
						<media
							class="object-cover md:aspect-auto w-full md:w-auto cursor-pointer max-h-[55vh] md:min-h-[300px] md:max-h-[600px] m-auto"
							:mediaSource="review.imageSources[0]"
							classes="object-cover md:aspect-auto w-full md:w-auto cursor-pointer max-h-[55vh] md:min-h-[300px] md:max-h-[600px] m-auto"
							@media-clicked="handleGallery(0)"
						/>
					</div>
				</div>
				<div
					v-if="review.imageSources.length == 2"
					class="grid grid-cols-2 gap-1 mt-2 h-[250px] md:h-[500px]"
				>
					<div v-for="imgId in 2" :key="imgId" class="h-[250px] md:h-[500px]">
						<media
							class="object-cover w-full cursor-pointer h-full"
							classes="object-cover w-full cursor-pointer h-full"
							:mediaSource="review.imageSources[imgId - 1]"
							@media-clicked="handleGallery(imgId - 1)"
						/>
					</div>
				</div>
				<div
					v-if="review.imageSources.length >= 3"
					class="grid h-[250px] md:h-[550px] grid-cols-[60%_40%] gap-1 mt-2"
				>
					<div class="h-[250px] md:h-[550px]">
						<media
							class="object-cover w-full cursor-pointer h-full"
							classes="object-cover w-full cursor-pointer h-full"
							:mediaSource="review.imageSources[0]"
							@media-clicked="handleGallery(0)"
						/>
					</div>
					<div
						class="grid grid-cols-1 grid-rows-2 gap-1 h-[250px] md:h-[550px]"
					>
						<media
							class="object-cover w-full cursor-pointer h-full"
							classes="object-cover w-full cursor-pointer h-full"
							:mediaSource="review.imageSources[1]"
							@media-clicked="handleGallery(1)"
						/>
						<div v-if="review.imageSources.length > 3" class="relative">
							<media
								class="object-cover w-full cursor-pointer h-full"
								classes="object-cover w-full cursor-pointer h-full"
								:mediaSource="review.imageSources[2]"
								@media-clicked="handleGallery(2)"
							/>
							<div
								class="absolute top-0 left-0 w-full h-full bg-black opacity-40"
							/>
							<button
								class="absolute top-0 left-0 w-full h-full text-white font-semibold text-4xl"
								@click="handleGallery(2)"
							>
								{{ `+${review.imageSources.length - 3}` }}
							</button>
						</div>
						<div v-else>
							<media
								class="object-cover w-full cursor-pointer h-full"
								classes="object-cover w-full cursor-pointer h-full"
								:mediaSource="review.imageSources[2]"
								@media-clicked="handleGallery(2)"
							/>
						</div>
					</div>
				</div>
			</div>
			<gallery
				ref="galleryref"
				class="hidden"
				:items="tempGallery"
				:gallery-index="index"
			/>
			<div class="grid grid-cols-2 border-y my-3 text-sm">
				<button
					:class="[liked ? 'text-[#F33E58]' : 'text-black']"
					class="py-1.5 px-3 items-center hover:bg-gray-100 border-r"
					@click="toggleLike"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-1 h-5 w-5 inline"
						:fill="liked ? 'currentColor' : 'none'"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
					<span class="font-normal">Thích</span>
				</button>
				<button
					id="discussBtn"
					class="py-1.5 px-3 items-center hover:bg-gray-100"
					@click="setFocus"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-1 h-5 w-5 inline"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
						/>
					</svg>
					<span class="font-normal">Thảo luận</span>
				</button>
			</div>

			<div class="mt-4">
				<div class="flex items-start">
					<template v-if="author">
						<guest-user-avatar
							:name="author.name"
							class="w-10 h-10 rounded-full"
						></guest-user-avatar>
					</template>
					<template v-else>
						<img :src="user.avatarSource" class="w-10 h-10 rounded-full" />
					</template>
					<div class="grow px-3">
						<!-- todo: style placeholder -->
						<textarea
							@click="setFocus"
							:disabled="isShowingLogIn"
							ref="discussArea"
							v-model="content"
							style="overflow: auto"
							placeholder="Thảo luận"
							class="resize-none no-scrollbar w-full px-2 py-1 text-gray-800 border rounded-md h-9"
						/>
					</div>
					<div class="">
						<button
							class="text-sm font-semibold text-white bg-green-600 rounded-md px-4 py-1.5 h-9"
							@click="addNewComment"
						>
							Đăng
						</button>
					</div>
				</div>
				<div v-if="comments.length > 0">
					<div v-if="showAllComment == false">
						<div v-for="comment in first3Comments" :key="comment.id">
							<review-comment :comment="comment" />
						</div>
					</div>
					<div v-for="comment in comments" v-else :key="comment.id">
						<review-comment :comment="comment" />
					</div>
				</div>
			</div>
			<div
				v-if="showAllComment == false"
				class="bg-stone-200 border border-neutral-400 h-8 mt-4 rounded flex items-center justify-center cursor-pointer hover:bg-stone-300 text-sm text-stone-900"
				@click="showAllComment = true"
			>
				Hiển thị thêm bình luận
			</div>
		</div>
	</div>
</template>

<script>
import { gql } from "graphql-tag";
import reviewComment from "./review-comment.vue";
import media from "./media.vue";
import GuestUserAvatar from "~/pages/components/guest-user-avatar.vue";
import GuestUserAuthenticationModal from "~/pages/components/guest-user-authentication-modal.vue";
export default {
	components: {
		reviewComment,
		GuestUserAuthenticationModal,
		GuestUserAvatar,
		media,
	},
	props: ["review", "index", "author"],
	data() {
		return {
			content: "",
			showFullContent: false,
			comments: this.review.comments.reverse(),
			tempGallery: this.review.imageSources,
			isShowingLogIn: false,
			liked: this.review.isLiked,
			showAllComment: this.isGather3Comments(),
			contentOverflowing: false,
			user: {
				avatarSource:
					"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
			},
			shortContentClass: "shortcontent",
			gridForTwoImages: "grid-cols-2",
			gridForThreeImages: "grid-cols-3",
		};
	},
	computed: {
		first3Comments() {
			const reversignComments = this.comments.slice(0, 3);
			if (this.review.comments.length < 3) {
				return null;
			}
			return reversignComments;
		},
	},
	mounted() {
		const e = this.$refs.reviewContent;
		if (e.clientHeight - e.scrollHeight < 0) {
			this.contentOverflowing = true;
		} else {
			this.contentOverflowing = false;
		}
		window.addEventListener("resize", this.getOverflow);
	},
	methods: {
		formatPostDate(time) {
			this.today = new Date();
			const hi = new Date(time);
			if (
				this.today.getFullYear() === hi.getFullYear() &&
				this.today.getMonth() === hi.getMonth()
			) {
				if (this.today.getDate() === hi.getDate() + 1) {
					return "Hôm qua";
				} else if (this.today.getDate() === hi.getDate()) {
					if (this.today.getHours() - hi.getHours() > 0) {
						return this.today.getHours() - hi.getHours() + "giờ trước";
					} else if (this.today.getHours() === hi.getHours()) {
						if (this.today.getMinutes() - hi.getMinutes() === 0) {
							return "vừa xong";
						}
						return this.today.getMinutes() - hi.getMinutes() + "phút trước";
					}
				} else {
					return this.formatReviewDateCreated(hi);
				}
			} else {
				return this.formatReviewDateCreated(hi);
			}
		},
		toggleLike() {
			if (this.author === null) {
				this.isShowingLogIn = true;
				return;
			}
			this.liked = !this.liked;
			const tempLiked = [...this.review.liked];
			if (this.liked) {
				tempLiked.push(this.author.id);
			} else {
				for (const x in tempLiked) {
					if (tempLiked[x] === this.author.id) {
						tempLiked.splice(x, 1);
						break;
					}
				}
			}
			const tempComments = this.review.comments;
			this.$apollo.mutate({
				mutation: gql`
					mutation UpdateLikhgd($input: UpdateReviewInput!) {
						updateReview(input: $input) {
							__typename
						}
					}
				`,
				variables: {
					input: {
						reviewId: this.review.id,
						liked: tempLiked,
					},
				},
			});
		},
		isGather3Comments() {
			if (this.review.comments.length > 3) {
				return false;
			} else {
				return true;
			}
		},
		sendAddCommentMutation(author) {
			this.$apollo.mutate({
				mutation: gql`
					mutation CreateNewComment($input: CreateCommentInput!) {
						createComment(input: $input) {
							string
						}
					}
				`,
				variables: {
					input: {
						author: {
							authorName: author.name,
							authorId: author.id,
						},
						content: this.content,
						discussionId: this.review.id,
						type: "Review",
					},
				},
			});
		},
		addNewComment() {
			if (this.author === null) {
				this.isShowingLogIn = true;
				return;
			}
			if (this.content === "") {
				return;
			}
			{
				const tempComment = {
					authorName: this.author.name,
					authorAvatarSource:
						"https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
					dateCreated: new Date(),
					content: this.content,
				};
				if (this.comments.length > 3) {
					// eslint-disable-next-line vue/no-mutating-props
					this.comments.unshift(tempComment);
				} else {
					this.comments.unshift(tempComment);
					this.showAllComment = true;
				}
				this.sendAddCommentMutation(this.author);
				this.content = "";
			}
		},
		getOverflow() {
			const e = this.$refs.reviewContent;
			this.contentOverflowing = e.clientHeight - e.scrollHeight < 0;
		},
		setFocus() {
			const e = this.$refs.discussArea;
			if (this.author === null) {
				this.isShowingLogIn = true;
				return;
			}
			setTimeout(function () {
				e.focus();
			}, 0);
		},
		handleGallery(index) {
			this.tempGallery = this.review.imageSources;
			if (this.$refs.galleryref) {
				this.$refs.galleryref.openGallery(index);
			}
		},
		formatReviewDateCreated(dateCreated) {
			const day = dateCreated.getDate();
			// getMonth trả về tháng bắt đầu từ 0 đến 11
			const month = dateCreated.getMonth() + 1;
			const year = dateCreated.getFullYear();
			return `${padZero(day)}/${padZero(month)}/${year}`;
			function padZero(num) {
				return num.toString().padStart(2, "0");
			}
		},
	},
};
</script>

<style>
.shortcontent {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
@media only screen and (max-width: 769px) {
	.shortcontent {
		-webkit-line-clamp: 6;
	}
}
</style>
