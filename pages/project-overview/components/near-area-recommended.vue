<template>
	<div>
		<div class="lg:mx-0 sm:mx-5 mx-0 flex justify-between items-end">
			<h3 class="font-bold text-lg mt-7 sm:mt-8">Dự án gần khu vực</h3>
			<div class="hidden md:block">
				<button
					class="text-grat-400 px-3 py-2 border rounded-md"
					@click="scrollLeft"
				>
					<svg
						width="11"
						height="16"
						viewBox="0 0 11 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.3692 14.8582L0.726562 7.80924L10.3692 0.760254"
							stroke="#C4C4C4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<button
					class="text-grat-400 px-3 py-2 border rounded-md"
					@click="scrollRight"
				>
					<svg
						width="12"
						height="16"
						viewBox="0 0 12 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M1.44968 14.8582L11.0923 7.80924L1.44968 0.760254"
							stroke="#C4C4C4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
		</div>

		<div
			ref="recommendedPostsContainer"
			class="mx-0 sm:mx-5 lg:mx-0 mt-2 sm:mt-3 no-scrollbar p-2.5 md:px-4 md:py-6 border flex space-x-3 md:space-x-6 overflow-auto"
		>
			<nuxt-link
				v-for="project in formatedProjects"
				:key="project.id"
				:to="`/danh-sach-can-ho/${project.slug}`"
			>
				<div class="post border border-stone-200 rounded-md overflow-hidden">
					<img
						:src="project.srcimage"
						:alt="`Dự án ${project.projectName}`"
						class="post-img object-cover"
					/>
					<div class="mx-2 my-2">
						<h3 class="font-bold truncate ...">
							{{ project.projectName }}
						</h3>
						<div
							class="mt-1 flex items-center justify-start text-neutral-400 text-xs"
						>
							<p>{{ project.price }} triệu/m²</p>
							<p>· {{ project.acreage }} ha</p>
						</div>
						<div
							class="mt-1 flex items-center justify-between color-A3A3A3 text-xs"
						>
							<h4>
								{{ project.address }}
							</h4>
						</div>
					</div>
				</div>
			</nuxt-link>
		</div>
	</div>
</template>

<script>
export default {
	name: "NearAreaRecommended",
	props: {
		projects: { type: Array, require: true, default: null },
	},
	computed: {
		formatedProjects() {
			return this.projects.map(p => {
				return {
					srcimage: p.images[0],
					projectName: p.projectName,
					address: p.address.district + ", " + p.address.city,
					slug: p.pageInfors[0].slug,
					id: p.id,
				};
			});
		},
	},
	methods: {
		scrollLeft() {
			const container = this.$refs.recommendedPostsContainer;
			container.scroll({
				left: container.scrollLeft - 400,
				behavior: "smooth",
			});
		},
		scrollRight() {
			const container = this.$refs.recommendedPostsContainer;
			container.scroll({
				left: container.scrollLeft + 400,
				behavior: "smooth",
			});
		},
		formatPrice(price, demand) {
			if (demand === "Cho Thuê") {
				return `${price / 1e6} triệu/tháng`;
			} else {
				return `${parseFloat((price / 1e9).toFixed(2))} tỷ`;
			}
		},
	},
};
</script>

<style scoped>
.post-img {
	width: 100%;
	height: 116px;
}
.post {
	width: 205px;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
	display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}
.color-A3A3A3 {
	color: #a3a3a3;
}
</style>
