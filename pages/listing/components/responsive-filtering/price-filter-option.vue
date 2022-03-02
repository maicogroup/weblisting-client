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
        <p class="font-semibold px-6 py-2  mr-auto ml-auto ">
          Chọn giá
        </p>
        <div
          @click="open = false"
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

      <div class="flex justify-center items-center px-6 mt-3">
        <label class="flex items-center">
          <input :value="customRange.from" :class="`w-14 px-2 py-1 text-center text-sm border rounded-md outline-none ${borderRedIfInvalid}`" @input="handleCustomRangeFromChanged">
          <span class="ml-1">{{ priceUnit }}</span>
        </label>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 12H4" />
        </svg>
        <label class="flex items-center">
          <input :value="customRange.to" :class="`w-14 px-2 py-1 text-center text-sm border rounded-md outline-none ${borderRedIfInvalid}`" @input="handleCustomRangeToChanged">
          <span class="ml-1">{{ priceUnit }}</span>
        </label>
      </div>

      <p :class="`mt-1 px-4 text-xs text-red-700 ${showIfInvalid}`">
        *Khoảng giá không hợp lệ
      </p>

      <div class="flex justify-between h-11 border-b items-center mx-3">
        <p>Tất cả mức giá</p>
        <input type="radio" checked="checked" @click="handleSelectAllPrices">
      </div>
      <div
        v-for="range in priceRanges"
        :key="`${range.from}-${range.to}`"
        class="flex justify-between h-11 border-b items-center mx-3"
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
        <input type="radio" @click="handleSelectPriceRange(range)">
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
      customRange: { from: 0, to: 0 },
      prevCustomRange: { from: 0, to: 0 },
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
        return [{ from: 0, to: 3 }, { from: 3, to: 5 }, { from: 5, to: 7 }, { from: 7, to: 10 }, { from: 19, to: 15 }, { from: 15, to: 20 }, { from: 25, to: 30 }, { from: 30, to: null }];
      }
    },

    customRangeIsInvalid () {
      return (this.customRange.from > this.customRange.to);
    },
    showIfInvalid () {
      return this.customRangeIsInvalid ? '' : 'hidden';
    },

    borderRedIfInvalid () {
      return this.customRangeIsInvalid ? 'border-red-700' : '';
    },

    disabilityClasses () {
      return this.customRangeIsInvalid ? 'text-gray-400 cursor-not-allowed' : 'hover:text-white hover:bg-gray-700';
    }
  },

  watch: {
    selectedOption: {
      handler (option) {
        if (option) {
          this.displaySelected = this.formatRange(option);
          this.setCustomRange(option);
        } else {
          this.displaySelected = 'Giá';
          this.setCustomRange({ from: 0, to: 0 });
        }
      },
      immediate: true
    },

    demand () {
      this.$emit('optionchanged', null);
    }
  },

  methods: {

    resetCustomRange () {
      this.customRange = { from: 0, to: 0 };
    },

    applyCustomRange () {
      this.prevCustomRange = { ...this.customRange };

      if (this.customRange.from === 0 && this.customRange.to === 0) {
        // chọn tất cả
        this.$emit('optionchanged', null);
      } else {
        this.$emit('optionchanged', { ...this.customRange });
      }
    },

    handleCustomRangeFromChanged (e) {
      if (e.target.value.trim() === '') {
        this.customRange = { ...this.customRange, from: 0 };
        return;
      }

      const value = parseInt(e.target.value);
      if (!isNaN(value)) {
        this.customRange = { ...this.customRange, from: (value > this.MAX_VALUE) ? this.MAX_VALUE : value };
      } else {
        this.customRange = { ...this.customRange };
      }
    },

    handleCustomRangeToChanged (e) {
      if (e.target.value.trim() === '') {
        this.customRange = { ...this.customRange, to: 0 };
        return;
      }

      const value = parseInt(e.target.value);
      if (!isNaN(value)) {
        this.customRange = { ...this.customRange, to: (value > this.MAX_VALUE) ? this.MAX_VALUE : value };
      } else {
        this.customRange = { ...this.customRange };
      }
    },

    formatRange (range) {
      const unit = this.demand === 'Bán' ? 'tỷ' : 'triệu';

      if (!range.from || range.from === 0) {
        return range.to === 0 ? 'Tất cả' : `Dưới ${range.to} ${unit}`;
      } else if (!range.to) {
        return `Trên ${range.from} ${unit}`;
      } else {
        return `${range.from} - ${range.to} ${unit}`;
      }
    },

    handleSelectPriceRange (range) {
      this.open = false;
      this.setCustomRange(range);
      this.$emit('optionchanged', { ...range });
    },

    setCustomRange (range) {
      if (range.to) {
        this.prevCustomRange = { ...range };
        this.customRange = { ...range };
      } else {
        this.prevCustomRange = { from: 0, to: 0 };
        this.customRange = { from: 0, to: 0 };
      }
    },

    handleSelectAllPrices () {
      this.open = false;
      this.prevCustomRange = { from: 0, to: 0 };
      this.customRange = { from: 0, to: 0 };
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
