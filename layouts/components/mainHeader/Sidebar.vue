//modified from:
https://tailwindcomponents.com/component/app-sidebar-with-sub-navigation

<template>
	<div class="no-scrollbar absolute right-0 top-0 overflow-auto bg-white">
		<nav class="w-64 h-screen">
			<div
				v-if="guestUser"
				class="w-full flex items-center py-3 px-6 text-gray-600 space-x-2"
				@click="$emit('open-authen', true)"
			>
				<guest-user-avatar :name="guestUser.name" />
				<p class="text-sm">
					{{ guestUser.name }}
				</p>
			</div>

			<Menu title="Thuê">
				<MenuItem @click="handleSelectAllTypes('Cho Thuê')">
					Tất cả nhà đất
				</MenuItem>
				<MenuItem @click="handleSelecType('Căn hộ', 'Cho Thuê')">
					Căn hộ
				</MenuItem>
				<MenuItem @click="handleSelecType('Duplex', 'Cho Thuê')">
					Duplex
				</MenuItem>
				<MenuItem @click="handleSelecType('Officetel', 'Cho Thuê')">
					Officetel
				</MenuItem>
				<MenuItem @click="handleSelecType('Penthouse', 'Cho Thuê')">
					Penthouse
				</MenuItem>
				<MenuItem @click="handleSelecType('ShopHouse', 'Cho Thuê')">
					ShopHouse
				</MenuItem>
			</Menu>

			<Menu title="Mua">
				<MenuItem @click="handleSelectAllTypes('Bán')">
					Tất cả nhà đất
				</MenuItem>
				<MenuItem @click="handleSelecType('Căn hộ', 'Bán')"> Căn hộ </MenuItem>
				<MenuItem @click="handleSelecType('Duplex', 'Bán')"> Duplex </MenuItem>
				<MenuItem @click="handleSelecType('Officetel', 'Bán')">
					Officetel
				</MenuItem>
				<MenuItem @click="handleSelecType('Penthouse', 'Bán')">
					Penthouse
				</MenuItem>
				<MenuItem @click="handleSelecType('ShopHouse', 'Bán')">
					ShopHouse
				</MenuItem>
			</Menu>

			<Menu title="Dự án">
				<div
					class="max-h-96 overflow-y-auto overflow-x-hidden"
					@click="$emit('closeSidebar')"
				>
					<nuxt-link
						to="/danh-sach-can-ho"
						class="py-2 px-12 block text-sm text-gray-600 hover:bg-blue-500 hover:text-white cursor-pointer"
					>
						Tất cả dự án
					</nuxt-link>
					<nuxt-link
						v-for="project in projects"
						:key="project.id"
						class="py-2 px-12 block text-sm text-gray-600 hover:bg-blue-500 hover:text-white cursor-pointer"
						:to="`/danh-sach-can-ho/${project.pageInfors[0].slug}`"
					>
						{{ project.projectName }}
					</nuxt-link>
				</div>
			</Menu>

			<Menu title="Về chúng tôi">
				<MenuItem>Web Review</MenuItem>
				<MenuItem>Page MaicoGroup</MenuItem>
			</Menu>

			<button
				v-if="!guestUser"
				class="w-full flex justify-between items-center py-3 px-6 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
				@click="$emit('open-authen', true)"
			>
				<span class="mx-4 font-medium"> Đăng ký</span>
			</button>

			<button
				v-if="!guestUser"
				class="w-full flex justify-between items-center py-3 px-6 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
				@click="$emit('open-authen', false)"
			>
				<span class="mx-4 font-medium"> Đăng nhập</span>
			</button>

			<button
				v-if="guestUser"
				class="w-full flex justify-between items-center py-3 px-6 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
				@click="$emit('log-out')"
			>
				<span class="mx-4 font-medium"> Đăng xuất</span>
			</button>

			<button
				class="w-full flex justify-between items-center py-3 px-6 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
			>
				<span class="mx-4 font-medium"> Ký gửi</span>
			</button>
		</nav>
	</div>
</template>

<script>
import guestUserAvatar from "~/pages/components/guest-user-avatar.vue";
export default {
	name: "MainHeaderSidebar",
	components: { guestUserAvatar },
	props: {
		projects: { type: Array, optional: false, default: null },
		guestUser: { type: Object, optional: false, default: null },
	},

	methods: {
		handleSelecType(type, demand) {
			const path = "/danh-sach-can-ho";
			const query = {
				loai: type,
				demand,
			};

			this.$router.push({ path, query });
			this.$emit("closeSidebar");
		},

		handleSelectAllTypes(demand) {
			const path = "/danh-sach-can-ho";
			const query = { demand };

			this.$router.push({ path, query });
			this.$emit("closeSidebar");
		},
	},
};
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
