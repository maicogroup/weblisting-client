<template>
  <div
    class="inline relative"
  >
    <button
      class="text-sm relative bg-white text-gray-800 px-2 hover:bg-gray-100 h-full"
      @click="open = !open"
    >
      <div class="inline-flex justify-between items-end">
        <span class="mr-1">Giá</span>
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
      <p class="font-semibold px-6 py-2">
        Chọn giá
      </p>

      <div class="flex justify-between items-center px-6 mt-3">
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

      <divider class="mt-2" />

      <filter-dropdown-item class="text-dark-red" @click="handleSelectAllPrices">
        Tất cả mức giá
      </filter-dropdown-item>
      <filter-dropdown-item v-for="range in priceRanges" :key="`${range.from}-${range.to}`" class="flex justify-between" @click="handleSelectPriceRange(range)">
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
      </filter-dropdown-item>

      <divider />

      <div class="flex space-x-2 justify-center mt-3 mb-1">
        <button class="px-2 py-1 hover:text-red-700" @click="resetCustomRange">
          Đặt lại
        </button>
        <button class="border rounded-md px-2 py-1 hover:text-white hover:bg-gray-700" @click="open = false">
          Hủy
        </button>
        <button :class="`border font-semibold rounded-md px-2 py-1 ${disabilityClasses}`" :disabled="customRangeIsInvalid" @click="applyCustomRange">
          Áp dụng
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FilterDropdownItem from './filter-dropdown-item.vue';
export default {
  name: 'PriceFilterDropdown',
  components: { FilterDropdownItem },

  props: {
    selectedOption: { type: Object, default: null },
    demand: { type: String, optional: false, default: null }
  },

  data () {
    return {
      open: false,
      entered: false,
      displaySelected: 'Tất cả',
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
    open (value) {
      if (value === true) {
        // khi mở dropdown thì chuột chưa chạm vào nội dung nên biến entered phải mặc định bằng false
        this.entered = false;

        // setTimeout để tránh listen các click event hiện tại
        setTimeout(() => document.addEventListener('click', this.closeIfOutsideOfDropdown), 0);
      } else {
        this.customRange = { ...this.prevCustomRange };
        document.removeEventListener('click', this.closeIfOutsideOfDropdown);
      }
    },

    selectedOption: {
      handler (option) {
        if (option) {
          this.displaySelected = this.formatRange(option);
          this.setCustomRange(option);
        } else {
          this.displaySelected = 'Tất cả';
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
    closeIfOutsideOfDropdown () {
      this.open = this.entered;
    },

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
.range-text {
  width: 77px;
}

.text-dark-red {
  color: #961B12;
}
</style>
