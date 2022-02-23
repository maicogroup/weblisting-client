<template>
  <div
    class="inline relative"
  >
    <button
      class="text-sm relative bg-white text-gray-800 px-2 hover:bg-gray-100 h-full"
      @click="open = !open"
    >
      <div class="inline-flex justify-between items-end">
        <span class="mr-1">Loại nhà đất</span>
        <svg class="inline h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
      <p class="text-center w-28 truncate ... relative text-gray-600">
        {{ displaySelected }}
      </p>
    </button>
    <div
      v-if="open"
      ref="dropdownContent"
      tabindex="0"
      class="text-sm absolute right-0 py-2 bg-white top-16 w-60 rounded-none shadow-xl"
      @mouseenter="entered = true"
      @mouseleave="entered = false"
    >
      <p class="font-semibold pb-2 px-4">
        Chọn loại nhà đất
      </p>

      <divider />

      <filter-dropdown-item @click="handleSelectAllTypes">
        Tất cả nhà đất
      </filter-dropdown-item>
      <filter-dropdown-item @click="handleSelecType('Căn hộ chung cư')">
        Căn hộ chung cư
      </filter-dropdown-item>
      <filter-dropdown-item @click="handleSelecType('Duplex')">
        Duplex
      </filter-dropdown-item>
      <filter-dropdown-item @click="handleSelecType('Officetel')">
        Officetel
      </filter-dropdown-item>
      <filter-dropdown-item @click="handleSelecType('Penthouse')">
        Penthouse
      </filter-dropdown-item>
      <filter-dropdown-item @click="handleSelecType('ShopHouse')">
        ShopHouse
      </filter-dropdown-item>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';
import FilterDropdownItem from './filter-dropdown-item.vue';
export default {
  name: 'ProjectFilterDropdown',
  components: { FilterDropdownItem },

  apollo: {
    projects: gql`
        query GetProjects {
          projects {
            projectName
            id
          }
        }
    `
  },
  data () {
    return {
      open: false,
      entered: false,
      displaySelected: 'Tất cả',
      searchInput: ''
    };
  },

  computed: {
    filteredProjects () {
      const query = this.searchInput.trim().toLowerCase();
      return this.projects.filter(p => p.projectName.toLowerCase().includes(query));
    }
  },

  watch: {
    open (value) {
      if (value === true) {
        // khi mở dropdown thì chuột chưa chạm vào nội dung nên biến entered phải mặc định bằng false
        this.entered = false;

        // setTimeout để tránh listen các click event hiện tại
        setTimeout(() => document.addEventListener('click', this.closeIfOutsideOfDropdown), 0);
      } else {
        document.removeEventListener('click', this.closeIfOutsideOfDropdown);
      }
    }
  },

  methods: {
    closeIfOutsideOfDropdown () {
      this.open = this.entered;
    },

    handleSelecType (option) {
      this.displaySelected = option;
      this.open = false;
      this.$emit('optionchanged', option);
    },

    handleSelectAllTypes () {
      this.displaySelected = 'Tất cả';
      this.open = false;
      this.$emit('optionchanged', null);
    }
  }
};
</script>
