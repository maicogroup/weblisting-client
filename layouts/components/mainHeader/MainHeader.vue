<template>
  <div
    class="fixed z-10 top-0 left-0 right-0 bg-white flex justify-between items-center px-5 py-3 border-b"
  >
    <img class="h-12" src="~/assets/maico.png">

    <div class="hidden md:flex flex justify-between items-center space-x-10">
      <p class="font-bold hidden xl:block">
        096 167 71 67
      </p>

      <Dropdown item-width="200px" title="Thuê">
        <DropdownItem> Tất cả nhà đất </DropdownItem>
        <DropdownItem> Căn hộ </DropdownItem>
        <DropdownItem> Duplex </DropdownItem>
        <DropdownItem> Officetel </DropdownItem>
        <DropdownItem> Penthouse </DropdownItem>
        <DropdownItem> ShopHouse </DropdownItem>
      </Dropdown>

      <Dropdown item-width="200px" title="Mua">
        <DropdownItem> Tất cả nhà đất </DropdownItem>
        <DropdownItem> Căn hộ </DropdownItem>
        <DropdownItem> Duplex </DropdownItem>
        <DropdownItem> Officetel </DropdownItem>
        <DropdownItem> Penthouse </DropdownItem>
        <DropdownItem> ShopHouse </DropdownItem>
      </Dropdown>

      <Dropdown class="hidden lg:inline" item-width="200px" title="Dự án">
        <DropdownItem> Tất cả dự án </DropdownItem>
        <DropdownItem> Lavita Charm </DropdownItem>
        <DropdownItem> River Panorama </DropdownItem>
        <DropdownItem> Emerald Percinct Celadon City </DropdownItem>
        <DropdownItem> Topaz Elite </DropdownItem>
        <DropdownItem> Đạt Gia Residence </DropdownItem>
        <DropdownItem> Sunview Town </DropdownItem>
        <DropdownItem> 4S Linh Đông </DropdownItem>
        <DropdownItem> 9 View </DropdownItem>
        <DropdownItem> Botanica Premier </DropdownItem>
        <DropdownItem> Centum Wealth </DropdownItem>
      </Dropdown>

      <Dropdown
        class="hidden xl:inline"
        item-width="200px"
        title="Về chúng tôi"
      >
        <DropdownItem>Web Review</DropdownItem>
        <DropdownItem>Page MaicoGroup</DropdownItem>
      </Dropdown>

      <div class="flex items-center">
        <a href="#"> Đăng nhập </a>

        <Divider class="ml-6 h-5" :vertical="true" />

        <a href="#" class="ml-6"> Đăng ký </a>

        <button class="ml-10 border rounded-md py-2 px-8">
          Ký gửi
        </button>
      </div>
    </div>
    <button class="md:hidden" @click="showSidebar = true">
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
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <div
      v-if="showSidebar"
      class="fixed inset-0 h-full w-full z-10 bg-black opacity-20"
      @click="showSidebar = false"
    />

    <Sidebar v-if="showSidebar" class="z-20" />
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';

export default {
  name: 'MainHeader',
  components: { Sidebar },
  data () {
    return { showSidebar: false };
  }
};
</script>
