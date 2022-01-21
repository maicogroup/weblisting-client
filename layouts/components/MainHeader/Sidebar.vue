//modified from: https://tailwindcomponents.com/component/app-sidebar-with-sub-navigation

<template>
  <div class="no-scrollbar absolute right-0 top-0 overflow-auto bg-white">
    <nav class="w-64 h-screen">
      <Menu title="Thuê">
        <MenuItem>Tất cả nhà đất</MenuItem>
        <MenuItem>Căn hộ</MenuItem>
        <MenuItem>Duplex</MenuItem>
        <MenuItem>Officetel</MenuItem>
        <MenuItem>Penthouse</MenuItem>
        <MenuItem>ShopHouse</MenuItem>
      </Menu>

      <Menu title="Mua">
        <MenuItem>Tất cả nhà đất</MenuItem>
        <MenuItem>Căn hộ</MenuItem>
        <MenuItem>Duplex</MenuItem>
        <MenuItem>Officetel</MenuItem>
        <MenuItem>Penthouse</MenuItem>
        <MenuItem>ShopHouse</MenuItem>
      </Menu>

      <Menu title="Dự án">
        <MenuItem> Tất cả dự án </MenuItem>
        <MenuItem> Lavita Charm </MenuItem>
        <MenuItem> River Panorama </MenuItem>
        <MenuItem> Emerald Percinct Celadon City </MenuItem>
        <MenuItem> Topaz Elite </MenuItem>
        <MenuItem> Đạt Gia Residence </MenuItem>
        <MenuItem> Sunview Town </MenuItem>
        <MenuItem> 4S Linh Đông </MenuItem>
        <MenuItem> 9 View </MenuItem>
        <MenuItem> Botanica Premier </MenuItem>
        <MenuItem> Centum Wealth </MenuItem>
      </Menu>

      <Menu title="Về chúng tôi">
        <MenuItem>Web Review</MenuItem>
        <MenuItem>Page MaicoGroup</MenuItem>
      </Menu>

      <button
        class="w-full flex justify-between items-center py-3 px-6 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
      >
        <span class="mx-4 font-medium"> Đăng ký</span>
      </button>

      <button
        class="w-full flex justify-between items-center py-3 px-6 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
      >
        <span class="mx-4 font-medium"> Đăng nhập</span>
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
import MenuItem from '~/components/Menu/MenuItem.vue';
export default {
  name: 'MainHeaderSidebar',
  components: { MenuItem }
};
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>
