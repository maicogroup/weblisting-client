<template>
  <div
    class="
      fixed
      z-20
      top-0
      left-0
      right-0
      bg-white
      flex
      justify-between
      items-center
      px-5
      py-3
      border-b
    "
  >
    <NuxtLink to="/">
      <img onclick="void(0)" id="logo" class="h-12" src="~/assets/maico.png"/>
    </NuxtLink>
    <div class="hidden md:flex flex justify-between items-center space-x-10">
      <a class="font-bold hidden xl:block" href="tel:0903324045">
        0903 324 045
      </a>

      <Dropdown item-width="200px" title="Thuê">
        <DropdownItem @click="handleSelectAllTypes">
          Tất cả nhà đất
        </DropdownItem>
        <DropdownItem @click="handleSelecType('Căn hộ', 'Cho Thuê')">
          Căn hộ
        </DropdownItem>
        <DropdownItem @click="handleSelecType('Duplex', 'Cho Thuê')">
          Duplex
        </DropdownItem>
        <DropdownItem @click="handleSelecType('Officetel', 'Cho Thuê')">
          Officetel
        </DropdownItem>
        <DropdownItem @click="handleSelecType('Penthouse', 'Cho Thuê')">
          Penthouse
        </DropdownItem>
        <DropdownItem @click="handleSelecType('ShopHouse', 'Cho Thuê')">
          ShopHouse
        </DropdownItem>
      </Dropdown>

      <Dropdown item-width="200px" title="Mua">
        <DropdownItem @click="handleSelecType('Căn hộ', 'Bán')">
          Tất cả nhà đất
        </DropdownItem>
        <DropdownItem @click="handleSelecType('Căn hộ', 'Bán')">
          Căn hộ
        </DropdownItem>
        <DropdownItem @click="handleSelecType('Duplex', 'Bán')">
          Duplex
        </DropdownItem>
        <DropdownItem @click="handleSelecType('Officetel', 'Bán')">
          Officetel
        </DropdownItem>
        <DropdownItem @click="handleSelecType('Penthouse', 'Bán')">
          Penthouse
        </DropdownItem>
        <DropdownItem @click="handleSelecType('ShopHouse', 'Bán')">
          ShopHouse
        </DropdownItem>
      </Dropdown>

      <Dropdown class="hidden lg:inline" item-width="220px" title="Dự án">
        <div class="max-h-96 overflow-y-auto overflow-x-hidden">
          <DropdownItem> Tất cả dự án </DropdownItem>
          <nuxt-link
            v-for="project in projects"
            :key="project.id"
            class="
              block
              px-4
              py-2
              capitalize
              text-gray-700
              hover:bg-blue-500 hover:text-white
              cursor-pointer
            "
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

        <button
          class="
            ml-10
            border
            rounded-md
            py-2
            px-8
            hover:text-white hover:bg-gray-700
          "
        >
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
      v-show="showSidebar != null"
      :class="`fixed inset-0 h-full w-full z-10 bg-black opacity-20 ${(showSidebar)? 'visible' : 'hide-side-bar-parent'}`"
      @click="showSidebar = false"
    />

    <Sidebar v-show="showSidebar != null" :projects="projects" :class="`z-20 ${(showSidebar)? 'show-side-bar' : 'hide-side-bar'}`" />
  </div>
</template>

<script>
import { gql } from "graphql-tag";
import Sidebar from "./Sidebar.vue";
import DropdownItem from "~/components/dropdown/DropdownItem.vue";

export default {
  name: "MainHeader",
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
    `,
  },
  mounted() {
    if (process.client) {
      const logoEle = document.getElementById("logo");

      logoEle.addEventListener("click", this.disableCookies);
    }
  },
  data() {
    return { showSidebar: null };
  },

  methods: {
    handleSelecType(type, demand) {
      const path = "/danh-sach-can-ho";
      const query = {
        loai: type,
        demand,
      };

      this.$router.push({ path, query });
    },
    disableCookies(evt) {
      if (evt.detail === 3) {
        this.$cookies.set("trackingState", "disabled", {
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
        });
        alert("Đã tắt tracking");
      }
    },
    handleSelectAllTypes(demand) {
      const path = "/danh-sach-can-ho";
      const query = { demand };

      this.$router.push({ path, query });
    },
  },
};
</script>

<style scoped>
.show-side-bar{
  animation: slide-in 0.25s ease;
}

.hide-side-bar-parent{
  visibility: hidden;
}

.hide-side-bar{
  animation: slide-out 0.25s ease;
  width: 0;
}

@keyframes slide-in {
  from{
    width: 0;
  }
  to{
    /*width: 0.25 * 64 ~~ w-64 in tailwind */
    width: calc(0.25rem * 64);
  }
}

@keyframes slide-out {
  from{
    /*width: 0.25 * 64 ~~ w-64 in tailwind */
    width: calc(0.25rem * 64);  
  }
  to{
    width: 0;
  }
}
</style>
