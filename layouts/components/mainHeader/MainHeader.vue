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
      <img id="logo" onclick="void(0)" class="h-12" src="~/assets/maico.png">
    </NuxtLink>

    <div class="hidden md:flex justify-between items-center space-x-10">
      <a class="font-bold hidden xl:block" href="tel:0938140024">
        0938 140 024
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
            :to="`/du-an/${project.pageInfors[0].slug}`"
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

      <div v-if="!guestUser" class="flex items-center">
        <button @click="openAuthenModal(false)">
          Đăng nhập
        </button>

        <Divider class="ml-6 h-5" :vertical="true" />

        <button class="ml-6" @click="openAuthenModal(true)">
          Đăng ký
        </button>
      </div>
      <div v-else class="flex items-center">
        <nuxt-link class="flex space-x-2 items-center" to="#">
          <guest-user-avatar :name="guestUser.name" />
          <p class="text-sm">
            {{ guestUser.name }}
          </p>
        </nuxt-link>

        <Divider class="ml-6 h-5" :vertical="true" />

        <button class="ml-6" @click="logout">
          Đăng xuất
        </button>
      </div>

      <button class="ml-10 border rounded-md py-2 px-8 hover:text-white hover:bg-gray-700">
        Ký gửi
      </button>
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
      :class="`fixed inset-0 h-full w-full z-10 bg-black opacity-20 ${
        showSidebar ? 'visible' : 'hide-side-bar-parent'
      }`"
      @click="showSidebar = false"
    />

    <Sidebar
      v-show="showSidebar != false"
      :projects="projects"
      :guest-user="guestUser"
      :class="`z-20 ${(showSidebar)? 'show-side-bar' : 'hide-side-bar'}`"
      @open-authen="openAuthenModal"
      @log-out="logout"
    />

    <guest-user-authentication-modal :open="showAuthenModal" :sign-up="signUp" @success="checkUser" @close="showAuthenModal = false" />
  </div>
</template>

<script>
import { gql } from 'graphql-tag';
import Sidebar from './Sidebar.vue';
import DropdownItem from '~/components/dropdown/DropdownItem.vue';
import GuestUserAuthenticationModal from '~/pages/components/guest-user-authentication-modal.vue';
import GuestUserAvatar from '~/pages/components/guest-user-avatar.vue';

export default {
  name: 'MainHeader',
  components: { Sidebar, DropdownItem, GuestUserAuthenticationModal, GuestUserAvatar },

  apollo: {
    projects: {
      query() {
        return gql`
          query GetProjects {
            projects {
              projectName
              pageInfors {
                slug
              }
            }
          }
        `;
      },
      update(data) {
        data.projects.forEach((element) => {
          element.pageInfors = element.pageInfors.filter(
            (c) => !c.slug.includes("ban") && !c.slug.includes("cho-thue")
          );
        });
        return data.projects;
      },
    },
  },
  data() {
    return {
      showSidebar: false,
      showAuthenModal: false,
      signUp: false,
      guestUser: null,
    };
  },

  created() {
    this.guestUser = this.$cookies.get("GuestUser") ?? null;
    this.$nuxt.$on("userLogin", () => {
      this.guestUser = this.$cookies.get("GuestUser") ?? null;
    });
  },


  mounted () {
    // eslint-disable-next-line nuxt/no-env-in-hooks
    if (process.client) {
      const logoEle = document.getElementById('logo');

      logoEle.addEventListener('click', this.disableCookies);
    }
  },

  methods: {
    checkUser () {
      this.guestUser = this.$cookies.get('GuestUser') ?? null;
      this.showAuthenModal = false;
      console.log(this.guestUser);
    },

    logout () {
      this.$cookies.remove('GuestUser');
      this.guestUser = null;
      this.$nuxt.$emit("userLogout");
      location.reload();
    },

    openAuthenModal (signUp) {
      this.showAuthenModal = true;
      this.signUp = signUp;
    },

    handleSelecType (type, demand) {
      const path = '/danh-sach-can-ho';
      const query = {
        loai: type,
        demand
      };

      this.$router.push({ path, query });
    },
    disableCookies (evt) {
      if (evt.detail === 3) {
        this.$cookies.set('trackingState', 'disabled', {
          path: '/',
          maxAge: 60 * 60 * 24 * 365
        });
        alert('Đã tắt tracking');
      }
    },
    handleSelectAllTypes (demand) {
      const path = '/danh-sach-can-ho';
      const query = { demand };

      this.$router.push({ path, query });
    }
  }
};
</script>

<style scoped>
.show-side-bar {
  animation: slide-in 0.25s ease;
}

.hide-side-bar-parent {
  visibility: hidden;
}

.hide-side-bar {
  animation: slide-out 0.25s ease;
  width: 0;
}

@keyframes slide-in {
  from {
    width: 0;
  }
  to {
    /*width: 0.25 * 64 ~~ w-64 in tailwind */
    width: calc(0.25rem * 64);
  }
}

@keyframes slide-out {
  from {
    /*width: 0.25 * 64 ~~ w-64 in tailwind */
    width: calc(0.25rem * 64);
  }
  to {
    width: 0;
  }
}
</style>
