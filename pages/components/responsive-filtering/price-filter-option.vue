<template>
  <div>
    <div class="w-full flex justify-between border rounded h-11 items-center px-3 mb-4" @click="open = !open">
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
        <p class="font-semibold px-6 py-2  mr-auto ml-auto ">
          Chọn giá
        </p>
      </div>

      <div class="flex justify-between h-11 border-b items-center mx-3" @click="handleSelectAllPrices">
        <p class="text-dark-red">
          Tất cả mức giá
        </p>
        <input type="radio" :checked="isSelected(null)">
      </div>
      <div
        v-for="range in priceRanges"
        :key="`${range.from}-${range.to}`"
        class="flex justify-between h-11 border-b items-center mx-3"
        @click="handleSelectPriceRange(range)"
      >
        <div class="flex justify-start">
          <template v-if="range.from === 0">
            Dưới {{ range.to }} {{ priceUnit }}
          </template>
          <template v-else-if="range.to === null">
            Trên {{ range.from }} {{ priceUnit }}
          </template>
          <template v-else>
            <span class="range-text">
              Từ {{ range.from }} {{ priceUnit }}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 12H4" />
            </svg>
            <span class="range-text text-right">
              đến {{ range.to }} {{ priceUnit }}
            </span>
          </template>
        </div>
        <input type="radio" :checked="isSelected(range)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PriceFilterOption',

  props: {
    selectedOption: { type: Object, default: null },
    demand: { type: String, optional: false, default: null }
  },

  data () {
    return {
      open: false,
      entered: false,
      displaySelected: 'Giá',
      MAX_VALUE: 999999
    };
  },

  computed: {
    priceUnit () {
      return this.demand === 'Bán' ? 'tỷ' : 'triệu';
    },

    priceRanges () {
      if (this.demand === 'Bán') {
        return [{ from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 5 }, { from: 5, to: 7 }, { from: 7, to: 10 }, { from: 10, to: 20 }, { from: 20, to: null }];
      } else {
        return [{ from: 0, to: 3 }, { from: 3, to: 5 }, { from: 5, to: 7 }, { from: 7, to: 10 }, { from: 10, to: 15 }, { from: 15, to: 20 }, { from: 25, to: 30 }, { from: 30, to: null }];
      }
    }
  },

  watch: {
    selectedOption: {
      handler (option) {
        if (option) {
          this.displaySelected = 'Giá: ' + this.formatRange(option);
        } else {
          this.displaySelected = 'Giá';
        }
      },
      immediate: true
    }
  },

  methods: {
    isSelected (range) {
      return range?.from === this.selectedOption?.from && range?.to === this.selectedOption?.to;
    },

    resetCustomRange () {
      this.customRange = { from: 0, to: 0 };
    },

    formatRange (range) {
      const unit = this.demand === 'Bán' ? 'tỷ' : 'triệu';

      if (range.from === null || range.from === 0) {
        return (range.to === null || range.to === 0) ? 'Tất cả' : `Dưới ${range.to} ${unit}`;
      }

      if (range.to === null) {
        return `Trên ${range.from} ${unit}`;
      }

      return `${range.from} - ${range.to} ${unit}`;
    },

    handleSelectPriceRange (range) {
      this.open = false;
      this.$emit('optionchanged', { ...range });
    },

    handleSelectAllPrices () {
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
