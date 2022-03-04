<template>
  <div>
    <div class="w-full flex justify-between border rounded h-11 items-center px-3 mb-4" @click="open = !open">
      <p> {{ displaySelected }} </p>
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 13L7 7L1 1" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div
      v-if="open"
      ref="dropdownContent"
      class="fixed inset-0 mt-12 w-full z-30 bg-white opacity-100 overflow-auto"
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
        <p class="font-semibold px-6 py-2  mr-auto ml-auto">
          Chọn khu vực
        </p>
      </div>

      <div class="relative my-4 w-full">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button class="p-1 text-gray-400 focus:outline-none focus:shadow-outline">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </span>
        <input v-model="searchInput" type="search" class="w-full border py-2 pl-10 pr-2 h-full rounded-md bg-white focus:text-gray-900 focus:outline-none" placeholder="Tìm kiếm Tỉnh/Thành phố">
      </div>

      <div
        v-if="searchInput.trim() === ''"
        class="flex justify-between h-11 border-b items-center mx-3"
        @click="handleSelectAllLocation "
      >
        <p>Tất cả khu vực</p>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 13L7 7L1 1" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div
        v-for="city in filteredCities"
        :key="city"
        class="flex justify-between h-11 border-b items-center mx-3"
        @click="handleSelectFirstOption(city)"
      >
        <p> {{ city.name }} </p>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 13L7 7L1 1" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <div
        v-if="isShowDistrict"
        class="fixed inset-0 mt-12 w-full z-30 bg-white opacity-100 overflow-auto"
      >
        <div
          class="flex justify-between h-11 border-b items-center mx-3"
        >
          <p class="px-4 py-2 bg-green-100 ml-auto mr-auto">
            {{ firstOption }}
          </p>
          <div
            @click="isShowDistrict = false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 relative"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <div
          v-for="district in filteredDistricts"
          :key="district"
          class="flex justify-between h-11 border-b items-center mx-3 mt-5"
        >
          <p>
            {{ district }}
          </p>
          <input
            type="radio"
            @click="handleSelectSecondOption(district)"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';
export default {
  name: 'LocationFilterOption',

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
      displaySelected: 'Khu vực',
      selectedCity: null,
      firstOption: null,
      secondOption: null,
      searchInput: '',
      isShowDistrict: false,
      cities: [
        {
          name: 'Hồ Chí Minh',
          districts: ['Q9', 'Q2', 'Thủ Đức']
        }
      ]
    };
  },

  computed: {
    filteredCities () {
      const query = this.searchInput.trim().toLowerCase();
      return this.cities.filter(c => c.name.toLowerCase().includes(query));
    },

    filteredDistricts () {
      const query = this.searchInput.trim().toLowerCase();
      return this.selectedCity.districts.filter(d => d.toLowerCase().includes(query));
    }
  },

  watch: {
    selectedOption: {
      handler (option) {
        if (option) {
          this.displaySelected = option.city;

          if (option.district) {
            this.displaySelected += ', ' + option.district;
          }
        } else {
          this.displaySelected = 'Khu vực';
        }
      },
      immediate: true
    }
  },

  methods: {
    handleSelectFirstOption (city) {
      this.isShowDistrict = true;
      this.selectedCity = city;
      this.firstOption = city.name;
      this.searchInput = '';
    },

    handleSelectAllLocation () {
      this.displaySelected = 'Tất cả';
      this.$emit('optionchanged', null);
      this.open = false;
    },

    handleSelectSecondOption (option) {
      this.secondOption = option;
      this.$emit('optionchanged', { city: this.firstOption, district: this.secondOption });
      this.isShowDistrict = false;
      this.open = false;
    },

    handleGoBack () {
      this.selectedCity = null;
      this.firstOption = null;
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
