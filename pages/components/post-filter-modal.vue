<template>
  <div
    v-if="visible == true"
    class="no-scrollbar overflow-auto fixed inset-0 h-full w-full z-30 bg-white opacity-100"
  >
    <div class="flex justify-between mt-5 items-center mb-4">
      <h4 class="mr-auto ml-auto text-base">
        Tìm kiếm bất động sản
      </h4>
      <div class="absolute right-3" @click="$emit('close')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f71e1e"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
      </div>
    </div>
    <div class="relative mx-2.5">
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
      <input type="search" class="w-full border py-2 pl-10 pr-2 h-11 rounded-md bg-white focus:text-gray-900 focus:outline-none" placeholder="Tìm kiếm...">
    </div>
    <div class="double-button my-4 flex mx-2.5">
      <button :class="`w-1/2 grow text-base py-2 px-4 border rounded-l-md ${sellButtonClasses}`" @click="setFilterDemandOption('Bán')">
        Bán
      </button>
      <button :class="`w-1/2 grow text-base whitespace-nowrap py-2 px-4 border rounded-r-md ${rentButtonClasses}`" @click="setFilterDemandOption('Cho Thuê')">
        Cho thuê
      </button>
    </div>
    <div class="mx-2.5">
      <type-filter-option :selected-option="filter.type" @optionchanged="handleTypeFilterChanged" />

      <location-filter-option :selected-option="filter.location" @optionchanged="handleLocationFilterChanged" />

      <price-filter-option :selected-option="filter.priceRange" :demand="filter.demand" @optionchanged="handlePriceFilterChanged" />

      <acreage-filter-option :selected-option="filter.acreageRange" @optionchanged="handleAcreageFilterChanged" />

      <project-filter-option :selected-option="filter.project" @optionchanged="handleProjectFilterChanged" />

      <direction-filter-options :selected-option="filter.directions" @optionchanged="handleDirectionFilterChanged" />

      <bedroom-filter-options :selected-option="filter.bedroomOptions" @optionchanged="handleBedroomFilterChanged" />
    </div>
    <div class="mx-2.5 flex space-x-2">
      <button class="px-6 py-2 shrink-0 border rounded-md my-4 hover:bg-gray-100" @click="resetFilter">
        Đặt lại
      </button>
      <button class="grow whitespace-nowrap rounded-md px-6 py-2 bg-green-500 hover:bg-green-700 text-white my-4" @click="$emit('search')">
        Tìm kiếm
      </button>
    </div>
  </div>
</template>

<script>
import TypeFilterOption from './responsive-filtering/type-filter-option.vue';
import LocationFilterOption from './responsive-filtering/location-filter-option.vue';
import PriceFilterOption from './responsive-filtering/price-filter-option.vue';
import AcreageFilterOption from './responsive-filtering/acreage-filter-option.vue';
import DirectionFilterOptions from './responsive-filtering/direction-filter-options.vue';
import ProjectFilterOption from './responsive-filtering/project-filter-option.vue';
import BedroomFilterOptions from './responsive-filtering/bedroom-filter-options.vue';

export default {
  name: 'PostFilterModal',

  components: {
    TypeFilterOption,
    LocationFilterOption,
    PriceFilterOption,
    AcreageFilterOption,
    ProjectFilterOption,
    DirectionFilterOptions,
    BedroomFilterOptions
  },

  props: {
    visible: { type: Boolean, default: false },
    filter: { type: Object, default () { return {}; } }
  },

  data () {
    return {
      heading: null,
      readMoreButtonIsActive: false
    };
  },

  computed: {
    sellButtonClasses () {
      return this.filter.demand === 'Bán' ? 'bg-gray-200' : 'hover:bg-gray-100';
    },

    rentButtonClasses () {
      return this.filter.demand !== 'Bán' ? 'bg-gray-200' : 'hover:bg-gray-100';
    }
  },

  methods: {
    setFilterDemandOption (option) {
      this.$set(this.filter, 'demand', option);
    },

    resetFilter () {
      this.$emit('filterchanged', { demand: 'Cho Thuê' });
    },

    createFilterFromUrl () {
      const filter = {};
      const query = this.$route.query;
      filter.demand = query.demand ?? 'Cho Thuê';
      filter.type = query.type;
      if (query.city || query.district) {
        filter.location = {
          city: query.city,
          district: query.district
        };
      }
      if (query.priceFrom || query.priceTo) {
        const parsedPriceFrom = parseInt(query.priceFrom);
        const parsedPriceTo = parseInt(query.priceTo);
        filter.priceRange = {
          from: isNaN(parsedPriceFrom) ? null : parsedPriceFrom,
          to: isNaN(parsedPriceTo) ? null : parsedPriceTo
        };
      }
      if (query.acreageFrom || query.acreageTo) {
        const parsedAcreageFrom = parseInt(query.acreageFrom);
        const parsedAcreageTo = parseInt(query.acreageTo);
        filter.acreageRange = {
          from: isNaN(parsedAcreageFrom) ? null : parsedAcreageFrom,
          to: isNaN(parsedAcreageTo) ? null : parsedAcreageTo
        };
      }
      if (query.directions) {
        filter.directions = Array.isArray(query.directions) ? query.directions : [query.directions];
      }
      if (query.bedroomOptions) {
        filter.bedroomOptions = Array.isArray(query.bedroomOptions) ? query.bedroomOptions : [query.bedroomOptions];
      }
      return filter;
    },

    handleTypeFilterChanged (type) {
      this.filter = { ...this.filter, type };
    },

    handleLocationFilterChanged (location) {
      this.$emit('filterchanged', { ...this.filter, location });
    },

    handleProjectFilterChanged (project) {
      this.$emit('filterchanged', { ...this.filter, project });
    },

    handlePriceFilterChanged (priceRange) {
      this.$emit('filterchanged', { ...this.filter, priceRange });
    },

    handleAcreageFilterChanged (acreageRange) {
      this.$emit('filterchanged', { ...this.filter, acreageRange });
    },

    handleDirectionFilterChanged (directions) {
      this.$emit('filterchanged', { ...this.filter, directions });
    },

    handleBedroomFilterChanged (bedroomOptions) {
      this.$emit('filterchanged', { ...this.filter, bedroomOptions });
    }
  }
};
</script>
