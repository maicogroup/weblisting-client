<template>
	<div>
		<div class="grid grid-cols-[45px_auto] gap-2 mt-3 lg:mt-4">
			<guest-user-avatar
				:name="comment.authorName"
				class="mt-1 w-10 h-10 rounded-full cursor-pointer"
			></guest-user-avatar>
			<div
				class="border rounded-xl py-0.5 pl-2 pr-3 bg-slate-50 w-full leading-4"
			>
				<a href="#" class="font-bold text-sm">
					{{ comment.authorName }}
				</a>
				<span class="text-sm text-[#858585]">
					{{ formatPostDate(comment.dateCreated) }}
				</span>
				<p
					:class="[!showFullContent ? 'shortcontent' : '']"
					style="word-break: break-word"
					ref="commentContent"
					class="text-sm font-normal leading-4 whitespace-pre-line"
				>
					{{ comment.content }}
				</p>
				<span
					v-show="contentOverflowing && !showFullContent"
					id="show-more"
					class="text-sm cursor-pointer text-gray-500"
					@click="showFullContent = true"
					>Xem thêm</span
				>
			</div>
		</div>
	</div>
</template>

<script>
import GuestUserAvatar from "~/pages/components/guest-user-avatar.vue";

export default {
	components: { GuestUserAvatar },
	props: ["comment"],
	watch: {
		comment: {
			handler() {
				// watch it

				this.$nextTick().then(() => {
					if (!this.comment) return;

					const e = this.$refs.commentContent;
					if (e.clientHeight - e.scrollHeight < 0) {
						this.contentOverflowing = true;
					} else {
						this.contentOverflowing = false;
					}
					window.addEventListener("resize", this.getOverflow);
				});
			},
			immediate: true,
		},
	},
	data() {
		return {
			showFullContent: false,
			contentOverflowing: false,
			//   comment: createComment(),
		};
	},
	mounted() {
		this.$nextTick().then(() => {
			const e = this.$refs.commentContent;
			if (e.clientHeight - e.scrollHeight < 0) {
				this.contentOverflowing = true;
			} else {
				this.contentOverflowing = false;
			}
			window.addEventListener("resize", this.getOverflow);
		});
	},
	methods: {
		getOverflow() {
			const e = this.$refs.commentContent;
			this.contentOverflowing = e.clientHeight - e.scrollHeight < 0;
		},
		// todo: đổi thành dạng "x phút trước/x ngày trước"
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
						return this.today.getHours() - hi.getHours() + " giờ trước";
					} else if (this.today.getHours() === hi.getHours()) {
						if (this.today.getMinutes() - hi.getMinutes() === 0) {
							return "Vừa xong";
						}
						return this.today.getMinutes() - hi.getMinutes() + " phút trước";
					}
				} else {
					return this.formatReviewDateCreated(hi);
				}
			} else {
				return this.formatReviewDateCreated(hi);
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
function createComment() {
	return {
		authorName: "Linh Chí",
		authorAvatarSource:
			"https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
		dateCreated: new Date(2069, 3, 19, 9, 4, 23),
		content: "Đúng vậy hết sức bất mãn với cái vụ cơm chó này, vote 1 sao",
	};
}
</script>

<style></style>
