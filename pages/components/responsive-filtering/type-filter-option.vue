<template>
  <div>
    <div class="w-full flex justify-between border rounded  h-11 items-center px-3 mb-4" @click="open = !open">
      <p class="truncate ...">
        {{ displaySelected }}
      </p>
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
        <div class="absolute top-1.5 left-2" @click="open = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#32c82b"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ><path d="M19 12H6M12 5l-7 7 7 7" /></svg>
        </div>
        <p class="font-semibold px-6 py-2  mr-auto ml-auto ">
          Chọn loại căn hộ
        </p>
      </div>
      <div class="flex justify-between h-11 border-b items-center mx-3" @click="handleSelectAllTypes">
        <p class="text-dark-red">
          Tất cả nhà đất
        </p>
        <input type="radio" :checked="isSelected(null)">
      </div>
      <div class="flex justify-between h-11 border-b items-center mx-3" @click="handleSelectType('Căn hộ chung cư')">
        <p>Căn hộ chung cư</p>
        <input type="radio" :checked="isSelected('Căn hộ chung cư')">
      </div>
      <div class="flex justify-between h-11 border-b items-center mx-3" @click="handleSelectType('Duplex')">
        <p>Duplex</p>
        <input type="radio" :checked="isSelected('Duplex')">
      </div>
      <div class="flex justify-between h-11 border-b items-center mx-3" @click="handleSelectType('Officetel')">
        <p>Officetel</p>
        <input type="radio" :checked="isSelected('Officetel')">
      </div>
      <div class="flex justify-between h-11 border-b items-center mx-3" @click="handleSelectType('Penthouse')">
        <p>Penthouse</p>
        <input type="radio" :checked="isSelected('Penthouse')">
      </div>
      <div class="flex justify-between h-11 border-b items-center mx-3" @click="handleSelectType('ShopHouse')">
        <p>ShopHouse</p>
        <input type="radio" :checked="isSelected('ShopHouse')">
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
    selectedOption: {
      handler (option) {
        if (option) {
          this.displaySelected = 'Loại căn hộ: ' + option;
        } else {
          this.displaySelected = 'Loại căn hộ';
        }
      },
      immediate: true
    }
  },

  methods: {
    handleSelectType (option) {
      this.open = false;
      this.$emit('optionchanged', option);
    },

    isSelected (type) {
      return type === this.selectedOption;
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
