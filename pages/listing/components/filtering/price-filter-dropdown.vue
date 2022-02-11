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
      class="text-sm absolute right-0 py-2 bg-white top-16 w-60 rounded-none shadow-xl"
      @mouseenter="entered = true"
      @mouseleave="entered = false"
    >
      <p class="font-semibold pb-2 px-4">
        Chọn giá
      </p>

      <div class="flex justify-center">
        <div>
          <input :value="customRange.from" :class="`w-16 px-2 py-1 text-center text-sm border rounded-md outline-none ${borderRedIfInvalid}`" @input="handleCustomRangeFromChanged">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 mx-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <input :value="customRange.to" :class="`w-16 px-2 py-1 text-center text-sm border rounded-md outline-none ${borderRedIfInvalid}`" @input="handleCustomRangeToChanged">
        </div>
      </div>

      <p :class="`mt-1 px-4 text-xs text-red-700 ${showIfInvalid}`">
        *Khoảng giá không hợp lệ
      </p>

      <divider class="mt-2" />

      <filter-dropdown-item @click="handleSelectAllPrices">
        Tất cả mức giá
      </filter-dropdown-item>
      <filter-dropdown-item v-for="range in priceRanges" :key="`${range.from}-${range.to}`" @click="handleSelectPriceRange(range)">
        <template v-if="range.from === 0">
          Dưới {{ range.to }} triệu
        </template>
        <template v-else-if="range.to === Infinity">
          Trên {{ range.from }} triệu
        </template>
        <template v-else>
          Từ {{ range.from }} triệu
          <svg xmlns="http://www.w3.org/2000/svg" class="inline h-5 w-5 mx-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          {{ range.to }} triệu
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

  data () {
    return {
      open: false,
      entered: false,
      displaySelected: 'Tất cả',
      customRange: { from: 0, to: 0 },
      prevCustomRange: { from: 0, to: 0 },
      priceRanges: [{ from: 0, to: 3 }, { from: 3, to: 5 }, { from: 5, to: 10 }, { from: 10, to: 20 }, { from: 20, to: 30 }, { from: 30, to: 50 }, { from: 50, to: 100 }, { from: 100, to: Infinity }],
      MAX_VALUE: 999999
    };
  },

  computed: {
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
      this.displaySelected = this.formatRange(this.customRange);
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
      if (range.from === 0) {
        return range.to === 0 ? 'Tất cả' : `Dưới ${range.to} triệu`;
      } else if (range.to === Infinity) {
        return `Trên ${range.from} triệu`;
      } else {
        return `${range.from} - ${range.to} triệu`;
      }
    },

    handleSelectPriceRange (range) {
      this.displaySelected = this.formatRange(range);
      this.open = false;
      if (range.to !== Infinity) {
        this.prevCustomRange = { ...range };
        this.customRange = { ...range };
      } else {
        this.prevCustomRange = { from: 0, to: 0 };
        this.customRange = { from: 0, to: 0 };
      }
      this.$emit('optionchanged', { ...range });
    },

    handleSelectAllPrices () {
      this.displaySelected = 'Tất cả';
      this.open = false;
      this.prevCustomRange = { from: 0, to: 0 };
      this.customRange = { from: 0, to: 0 };
      this.$emit('optionchanged', null);
    }
  }
};
</script>
