<template>
  <div
    class="inline relative"
  >
    <button
      class="text-sm relative bg-white text-gray-800 px-2 hover:bg-gray-100 h-full"
      @click="open = !open"
    >
      <div class="inline-flex justify-between items-end">
        <span class="mr-1">Khu vực</span>
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
      class="text-sm absolute right-0 py-2 bg-white top-16 rounded-none shadow-xl"

      @mouseenter="entered = true"
      @mouseleave="entered = false"
    >
      <div class="flex justify-between pl-6 pr-4">
        <p class="font-semibold py-2">
          Chọn khu vực
        </p>
        <button v-if="firstOption !== null" class="hover:bg-gray-100 rounded-full my-1 px-1" @click="handleGoBack">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
        </button>
      </div>

      <divider />

      <div class="relative m-4">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button class="p-1 text-gray-400 focus:outline-none focus:shadow-outline">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-4 h-4"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </span>
        <input
          v-model="searchInput"
          type="search"
          class="border py-2 pl-10 pr-2 h-full rounded-md bg-white focus:text-gray-900 focus:outline-none"
          placeholder="Tìm kiếm..."
        >
      </div>
      <template v-if="firstOption === null">
        <filter-dropdown-item
          v-if="searchInput.trim() === ''"
          class="text-dark-red"
          @click="handleSelectAllLocation"
        >
          Tất cả khu vực
        </filter-dropdown-item>
        <filter-dropdown-item v-for="city in filteredCities" :key="city" @click="handleSelectFirstOption(city)">
          <div class="flex justify-between items-center">
            <p>{{ city.name }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </filter-dropdown-item>
      </template>
      <template v-else>
        <p class="px-4 py-2 bg-green-100">
          {{ firstOption }}
        </p>

        <filter-dropdown-item v-for="district in filteredDistricts" :key="district" @click="handleSelectSecondOption(district)">
          <div class="ml-2 flex justify-between items-center">
            <p>
              {{ district }}
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </filter-dropdown-item>
      </template>
    </div>
  </div>
</template>

<script>
import FilterDropdownItem from './filter-dropdown-item.vue';
export default {
  name: 'LocationFilterDropdown',
  components: { FilterDropdownItem },

  props: {
    selectedOption: { type: Object, default: null }
  },

  // TODO: Lấy dữ liệu về vị trí
  data () {
    return {
      open: false,
      entered: false,
      displaySelected: 'Tất cả',
      selectedCity: null,
      firstOption: null,
      secondOption: null,
      searchInput: '',
      cities: [
        {
          name: 'Hồ Chí Minh',
          districts: ['Thủ Đức', 'Quận 9', 'Quận 2']
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
    open (value) {
      if (value === true) {
        // khi mở dropdown thì chuột chưa chạm vào nội dung nên biến entered phải mặc định bằng false
        this.entered = false;

        // setTimeout để tránh listen các click event hiện tại
        setTimeout(() => document.addEventListener('click', this.closeIfOutsideOfDropdown), 0);
      } else {
        this.searchInput = '';
        this.firstOption = null;
        this.secondOption = null;
        document.removeEventListener('click', this.closeIfOutsideOfDropdown);
      }
    },

    selectedOption: {
      handler (option) {
        if (option) {
          this.displaySelected = option.city;

          if (option.district) {
            this.displaySelected += ', ' + option.district;
          }
        } else {
          this.displaySelected = 'Tất cả';
        }
      },
      immediate: true
    }
  },

  methods: {
    closeIfOutsideOfDropdown () {
      this.open = this.entered;
    },

    handleSelectFirstOption (city) {
      this.selectedCity = city;
      this.firstOption = city.name;
      this.searchInput = '';
      this.$emit('optionchanged', { city: this.firstOption });
    },

    handleSelectAllLocation () {
      this.$emit('optionchanged', null);
      this.open = false;
    },

    handleSelectSecondOption (option) {
      this.secondOption = option;
      this.$emit('optionchanged', { city: this.firstOption, district: this.secondOption });
      this.open = false;
    },

    handleGoBack () {
      this.selectedCity = null;
      this.firstOption = null;
      this.$emit('optionchanged', null);
    }
  }

  // TODO: truyền giá trị đã chọn ra ngoài
};
</script>

<style scoped>
.text-dark-red {
  color: #961B12;
}
</style>
