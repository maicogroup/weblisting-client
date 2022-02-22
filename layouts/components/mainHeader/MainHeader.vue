<template>
  <div
    class="fixed z-20 top-0 left-0 right-0 bg-white flex justify-between items-center px-5 py-3 border-b"
  >
    <img class="h-12" src="~/assets/maico.png">

    <div class="hidden md:flex flex justify-between items-center space-x-10">
      <p class="font-bold hidden xl:block">
        096 167 71 67
      </p>

      <Dropdown item-width="200px" title="Thuê">
        <DropdownItem @click="handleSelectAllTypes">
          Tất cả nhà đất
        </DropdownItem>
        <DropdownItem @click="handleSelecType('Căn hộ')">
          Căn hộ
        </DropdownItem>
        <DropdownItem @click="handleSelecType('Duplex')">
          Duplex
        </DropdownItem>
        <DropdownItem @click="handleSelecType('Officetel')">
          Officetel
        </DropdownItem>
        <DropdownItem @click="handleSelecType('Penthouse')">
          Penthouse
        </DropdownItem>
        <DropdownItem @click="handleSelecType('ShopHouse')">
          ShopHouse
        </DropdownItem>
      </Dropdown>

      <Dropdown item-width="200px" title="Mua">
        <DropdownItem> Tất cả nhà đất </DropdownItem>
        <DropdownItem> Căn hộ </DropdownItem>
        <DropdownItem> Duplex </DropdownItem>
        <DropdownItem> Officetel </DropdownItem>
        <DropdownItem> Penthouse </DropdownItem>
        <DropdownItem> ShopHouse </DropdownItem>
      </Dropdown>

      <Dropdown class="hidden lg:inline" item-width="220px" title="Dự án">
        <div class=" max-h-96 overflow-y-auto overflow-x-hidden">
          <DropdownItem> Tất cả dự án </DropdownItem>
          <nuxt-link
            v-for="project in projects"
            :key="project.id"
            class="block px-4 py-2 capitalize text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer"
            :to="`/danh-sach-can-ho/${project.pageInfors[0].slug}`"
          >
            {{ project.projectName }}
          </nuxt-link>
        </div>
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

        <button class="ml-10 border rounded-md py-2 px-8 hover:text-white hover:bg-gray-700">
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
import { gql } from 'graphql-tag';
import Sidebar from './Sidebar.vue';
import DropdownItem from '~/components/dropdown/DropdownItem.vue';

export default {
  name: 'MainHeader',
  components: { Sidebar, DropdownItem },

  apollo: {
    projects: gql`
        query GetProjects {
          projects {
            projectName
            pageInfors {
              slug
            }
          }
        }
    `
  },
  method: {
    handleSelecType (type) {
      let path = '/danh-sach-can-ho';
      path = path + '/';

      const query = {};

      if (type) {
        query.type = type;
      }
      query.demand = 'Cho thuê';

      this.$router.push({ path, query });
    },

    handleSelectAllTypes () {
      let path = '/danh-sach-can-ho';
      path = path + '/';

      const query = {};

      query.demand = 'Cho thuê';

      this.$router.push({ path, query });
    }
  },

  data () {
    return { showSidebar: false };
  }
};
</script>
