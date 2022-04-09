<template>
	<div class="w-full max-w-screen-xl px-4">
		<div class="flex items-start">
			<div
				class="hidden mr-8 xl:block ml-4 shrink-0 w-48 px-4 py-3 border rounded-md"
			>
				<nuxt-link
					to="/"
					class="flex justify-between items-center hover:text-green-500"
				>
					<span>Trang chủ</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mt-1 h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</nuxt-link>
				<divider class="my-2" />
				<button
					class="w-full flex justify-between items-center hover:text-green-500"
				>
					Bình luận
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mt-1 h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>

			<div class="grow flex-col space-y-5">
				<div v-for="review in reviews" :key="review" class="border rounded-md">
					<div class="px-6 py-5">
						<div class="flex">
							<img
								:src="review.authorAvatarSource"
								class="w-12 h-12 rounded-full cursor-pointer"
							/>
							<div class="ml-2">
								<a href="#" class="text-lg font-bold">
									{{ review.authorName }}
								</a>
								<span class="text-sm">
									{{ formatReviewDateCreated(review.dateCreated) }}
								</span>
								<div class="text-lg leading-4">
									<nuxt-link
										class="font-semibold text-blue-500 hover:text-blue-700"
										:to="`/danh-sach-can-ho/${review.project.slug}`"
									>
										{{ review.project.name }}
									</nuxt-link>
								</div>
							</div>
						</div>

						<divider class="my-3" />

						<p class="font-bold">
							{{ review.title }}
						</p>

						<p class="text-sm mt-1">
							{{ review.content }}
						</p>

						<div class="hidden md:grid grid-cols-4 gap-1 mt-2">
							<template v-if="review.imageSources.length <= 4">
								<img
									v-for="imgSrc in review.imageSources"
									:key="imgSrc"
									class="object-cover w-full h-28 lg:h-40 cursor-pointer"
									:src="imgSrc"
								/>
							</template>
							<template v-else>
								<img
									v-for="index in 3"
									:key="review.imageSources[index - 1]"
									class="object-cover w-full h-28 lg:h-40 cursor-pointer"
									:src="review.imageSources[index - 1]"
								/>
								<div class="relative">
									<img
										class="object-cover w-full h-28 lg:h-40"
										:src="review.imageSources[3]"
									/>
									<div
										class="absolute top-0 left-0 w-full h-full bg-black opacity-40"
									/>
									<button
										class="absolute top-0 left-0 w-full h-full text-white font-semibold text-4xl"
									>
										{{ `${review.imageSources.length - 4}+` }}
									</button>
								</div>
							</template>
						</div>

						<div class="md:hidden grid grid-cols-3 gap-1 mt-2">
							<template v-if="review.imageSources.length <= 3">
								<img
									v-for="imgSrc in review.imageSources"
									:key="imgSrc"
									class="object-cover w-full h-32 sm:h-40 cursor-pointer"
									:src="imgSrc"
								/>
							</template>
							<template v-else>
								<img
									v-for="index in 2"
									:key="review.imageSources[index - 1]"
									class="object-cover w-full h-32 sm:h-40 cursor-pointer"
									:src="review.imageSources[index - 1]"
								/>
								<div class="relative">
									<img
										class="object-cover w-full h-32 sm:h-40"
										:src="review.imageSources[2]"
									/>
									<div
										class="absolute top-0 left-0 w-full h-full bg-black opacity-40"
									/>
									<button
										class="absolute top-0 left-0 w-full h-full text-white font-semibold text-4xl"
									>
										{{ `${review.imageSources.length - 3}+` }}
									</button>
								</div>
							</template>
						</div>
					</div>

					<divider />
					<button
						class="ml-3 py-2 px-3 inline-flex items-center hover:bg-gray-100"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-1 h-5 w-5"
							fill="none"
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
						<span class="font-semibold">Thích</span>
					</button>
					<button
						class="ml-4 py-2 px-3 inline-flex items-center hover:bg-gray-100"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-1 h-5 w-5"
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
						<span class="font-semibold">Thảo luận</span>
					</button>
					<divider />

					<div class="mt-4 mb-6 px-6">
						<div class="flex items-start">
							<img :src="user.avatarSource" class="w-10 h-10 rounded-full" />
							<div class="w-full relative">
								<textarea
									placeholder="Thảo luận"
									class="resize-none no-scrollbar ml-2 w-full px-2 py-1 text-gray-800 border rounded-md focus:outline-none"
								/>
								<div class="absolute bottom-3 right-1">
									<button
										class="font-semibold text-blue-500 hover:text-blue-700"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>

						<div
							v-for="comment in review.comments"
							:key="comment"
							class="flex mt-4"
						>
							<img
								:src="comment.authorAvatarSource"
								class="mt-1 w-10 h-10 rounded-full cursor-pointer"
							/>
							<div class="ml-2 w-full border rounded-md pl-2 pr-3 pt-1 pb-2">
								<a href="#" class="font-bold">
									{{ comment.authorName }}
								</a>
								<span class="text-sm text-gray-600">
									{{ formatReviewDateCreated(comment.dateCreated) }}
								</span>
								<p class="text-sm">
									{{ comment.content }}
								</p>
							</div>
						</div>
					</div>
				</div>

				<pagination
					class="mt-4"
					:total="totalReviews"
					:per-page="5"
					:current-page="currentPage"
					@pagechanged="onPageChanged"
				/>
			</div>

			<div
				class="hidden md:block ml-8 shrink-0 border w-56 lg:w-72 rounded-md px-3.5 py-4 flex-col space-y-3"
			>
				<button
					class="w-full rounded w-44 h-12 border text-sm font-bold hover:text-white hover:bg-gray-700"
				>
					Yêu cầu tư vấn
				</button>
				<button
					class="rounded w-full py-2 border bg-green-600 hover:bg-green-700 text-white text-sm font-bold flex items-center justify-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-1 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M16 3h5m0 0v5m0-5l-6 6M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
						/>
					</svg>
					0256 452 125
				</button>
				<button
					class="rounded w-full py-2 border bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold flex items-center justify-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-1 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
						/>
					</svg>
					Viết bài đánh giá
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import Divider from "~/components/Divider.vue";

export default {
	name: "ProductReviewPage",
	components: { Divider },
	data() {
		return {
			currentPage: 1,
			// TODO: lấy project reviews (chứa cả thông tin project) và user từ DB
			reviews: [createMockReview(), createMockReview(), createMockReview()],
			user: {
				avatarSource: "https://pbgdpl.daklak.gov.vn/uploads/avatar.png",
			},
		};
	},

	computed: {
		projectAddress() {
			const address = this.project.address;
			return `${address.street}, ${address.district}, ${address.city}`;
		},

		totalReviews() {
			// TODO: lấy từ DB
			return 100;
		},
	},

	methods: {
		formatReviewDateCreated(dateCreated) {
			const day = dateCreated.getDate();
			// getMonth trả về tháng bắt đầu từ 0 đến 11
			const month = dateCreated.getMonth() + 1;
			const year = dateCreated.getFullYear();

			return `${padZero(day)}/${padZero(month)}/${year} ${padZero(
				dateCreated.getHours(),
			)}:${padZero(dateCreated.getMinutes())}`;

			function padZero(num) {
				return num.toString().padStart(2, "0");
			}
		},

		onPageChanged(index) {
			// TODO: lấy dữ liệu mới khi đổi trang
			this.currentPage = index;
		},
	},
};

function createMockProject() {
	return {
		projectName: "Saigon Gateway",
		address: {
			street: "90 Võ Văn Ngân",
			district: "Thủ Đức",
			city: "Hồ Chí Minh",
			googleMapLocation:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5771215787845!2d106.76944501546055!3d10.843638392275993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175270a20c656e9%3A0x7a1ed3f69d909e5d!2sSaigon%20Gateway!5e0!3m2!1svi!2s!4v1640588724479!5m2!1svi!2s",
		},
		images: [
			"https://photo.rever.vn/v3/get/bq_rJn35xx1gNdW9gkmb7zRVIYbgm5GMFWS6uZyz9As=/750x500/image.jpg",
			"https://photo.rever.vn/v3/get/YQ_o7hH45f2TARcy6y7MGTb7pDFcPaY7CS3cOkrHDnY=/750x500/image.jpg",
			"https://photo.rever.vn/v3/get/crEUbfQlhX4XeefHOjMWQWMRmEmeTUWey8cu9oFtsWw=/750x500/image.jpg",
		],
	};
}

function createMockReview() {
	return {
		authorName: "Chí Linh",
		authorAvatarSource:
			"https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/1408930/8a30ed34e8e412873de69d48f8bcb5fd991b8ab5.jpg",
		dateCreated: new Date(),
		project: {
			name: "Chung cư Saigon Gateway",
			slug: "ban-thue-can-ho-chung-cu-the-sun-avenue",
		},
		title: "Tên đề của bài đánh giá",
		content:
			"Hôm qua vừa đặt 2 phần Furai về. Furai vẫn ngon nè, bên trên có bột chiên giòn và trứng tôm (tuỳ lúc cho ít hay nhiều), nhân có trứng chiên, tôm, nấm xào, dưa leo và thanh cua, bên trên có cá hồi nữa, chấm với sốt cay hoặc không đều ngon. Ở MH thì mình thích Furai và cuộn da cá nhất nhưng cuộn da cá thì không có trong menu giao hàng nên mình toàn ăn Furai.",
		imageSources: [
			"https://www3.nhk.or.jp/nhkworld/en/radio/cooking/update/meal_200228_l.jpg",
			"https://pogogi.com/sites/default/files/japanesefoodimages/2015/2/134%20Furai.jpg",
			"https://kenh14cdn.com/thumb_w/660/2019/1/25/3cbbd3ec62d085e2372585f56ccc8c69-15484114508781292670329.jpg",
			"https://img.tinxe.vn/resize/1000x-/2020/10/08/vwnbOqjE/mazda-furai-concept-front-studio-20a5.jpg",
			"https://i.ytimg.com/vi/K_7lPqLZrE8/maxresdefault.jpg",
		],
		comments: [
			{
				authorName: "Linh Chí",
				authorAvatarSource:
					"https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
				dateCreated: new Date(2069, 3, 19, 9, 4, 23),
				content:
					"Cái này thì đúng nha, mình đi ăn mấy lần đều phải đặt bàn từ hôm trước hoặc lúc sáng sớm tổng đài vừa hoạt động thì mới đặt được, đặt trễ thì quán báo tổng đài tình trạng đang đông để ngừng nhận thêm khách, lỡ bạn đặt được xong tới quán không có bàn thì sao ?? Từ lúc ko đặt được bàn thì nên nghĩ đi ăn chổ khác rồi ))",
			},
			{
				authorName: "Linh Chí",
				authorAvatarSource:
					"https://styles.redditmedia.com/t5_50b2l8/styles/profileIcon_snoo53df77a4-ae3a-449f-af3a-01fddcb3a0f7-headshot.png",
				dateCreated: new Date(2069, 3, 19, 9, 4, 23),
				content: "Ê nói bậy à nha, đấm giờ :3",
			},
		],
	};
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
	display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}
</style>
