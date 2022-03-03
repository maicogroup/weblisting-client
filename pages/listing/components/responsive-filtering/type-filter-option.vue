<template>
  <div>
    <div class="w-full flex justify-between border rounded  h-11 items-center px-3 mb-4" @click="open = !open">
      <p> {{ displaySelected }} </p>
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 13L7 7L1 1" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div
      v-if="open"
      ref="dropdownContent"
      class="fixed inset-0 mt-14 w-full z-30 bg-white opacity-100 overflow-auto border rounded"
    >
      <div
        class="flex justify-between border-b rounded"
      >
        <div @click="open = false" class="absolute top-1.5 left-2" >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#32c82b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
        </div>
        <p class="font-semibold px-6 py-2  mr-auto ml-auto ">
          Chọn loại căn hộ
        </p>
       
      </div>
      <div class="flex justify-between h-11 border-b items-center mx-3">
        <p>Tất cả nhà đất</p>
        <input type="radio" checked="checked" @click="handleSelectAllTypes">
      </div>
      <div class="flex justify-between h-11 border-b items-center mx-3">
        <p>Căn hộ chung cư</p>
        <input type="radio" @click="handleSelecType('Căn hộ chung cư')">
      </div>
      <div class="flex justify-between h-11 border-b items-center mx-3">
        <p>Duplex</p>
        <input type="radio" @click="handleSelecType('Duplex')">
      </div>
      <div class="flex justify-between h-11 border-b items-center mx-3">
        <p>Officetel</p>
        <input type="radio" @click="handleSelecType('Officetel')">
      </div>
      <div class="flex justify-between h-11 border-b items-center mx-3">
        <p>Penthouse</p>
        <input type="radio" @click="handleSelecType('Penthouse')">
      </div>
      <div class="flex justify-between h-11 border-b items-center mx-3">
        <p>ShopHouse</p>
        <input type="radio" @click="handleSelecType('ShopHouse')">
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';
export default {
  name: 'TypeFilterOption',

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

  props: {
    selectedOption: { type: String, default: null }
  },

  data () {
    return {
      open: false,
      entered: false,
      displaySelected: 'Loại căn hộ',
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
    },

    selectedOption: {
      handler (option) {
        if (option) {
          this.displaySelected = option;
        } else {
          this.displaySelected = 'Loại căn hộ';
        }
      },
      immediate: true
    }
  },

  methods: {
    closeIfOutsideOfDropdown () {
      this.open = this.entered;
    },

    handleSelecType (option) {
      this.open = false;
      this.$emit('optionchanged', option);
    },

    handleSelectAllTypes () {
      this.open = false;
      this.$emit('optionchanged', null);
    }
  }
};
</script>

<style scoped>
.text-dark-red {
  color: #961B12;
}
</style>
