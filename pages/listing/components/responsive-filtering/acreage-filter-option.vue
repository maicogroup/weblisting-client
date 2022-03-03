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
        <div @click="open = false" class="absolute top-1.5 left-2" >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#32c82b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>
        </div>
        <p class="font-semibold px-6 py-2  mr-auto ml-auto ">
          Chọn diện tích
        </p>
       
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
        *Khoảng diện tích không hợp lệ
      </p>

      <div class="flex justify-between h-11 border-b items-center mx-3">
        <p>Tất cả diện tích</p>
        <input type="radio"  checked="checked" @click="handleSelectAcreageRange(range)">
      </div>
      <div
        v-for="range in acreageRanges"
        :key="`${range.from}-${range.to}`"
        class="flex justify-between h-11 border-b items-center mx-3"
      >
        <div class="flex justify-start">
          <template v-if="range.from === 0">
            Dưới {{ range.to }} m²
          </template>
          <template v-else-if="range.to === null">
            Trên {{ range.from }} m²
          </template>
          <template v-else>
            <span class="range-text">
              Từ {{ range.from }} m²
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 12H4" />
            </svg>
            <span class="range-text text-right">
              đến {{ range.to }} m²
            </span>
          </template>
        </div>
        <input type="radio" @click="handleSelectAcreageRange(range)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AcreageFilterDropdown',

  props: {
    selectedOption: { type: Object, default: null }
  },

  data () {
    return {
      open: false,
      entered: false,
      displaySelected: 'Diện tích',
      acreageRanges: [{ from: 0, to: 30 }, { from: 30, to: 50 }, { from: 50, to: 80 }, { from: 80, to: 100 }, { from: 100, to: 300 }, { from: 300, to: 500 }, { from: 500, to: null }],
      customRange: { from: 0, to: 0 },
      prevCustomRange: { from: 0, to: 0 },
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

  methods: {
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
      if (!range.from || range.from === 0) {
        return range.to === 0 ? 'Tất cả' : `Dưới ${range.to} m²`;
      } else if (!range.to) {
        return `Trên ${range.from} m²`;
      } else {
        return `${range.from} - ${range.to} m²`;
      }
    },

    handleSelectAcreageRange (range) {
      this.displaySelected = this.formatRange(range);
      this.open = false;
      if (range.to !== null) {
        this.prevCustomRange = { ...range };
        this.customRange = { ...range };
      } else {
        this.prevCustomRange = { from: 0, to: 0 };
        this.customRange = { from: 0, to: 0 };
      }
      this.$emit('optionchanged', range);
    },

    handleSelectAllSize () {
      this.displaySelected = 'Tất cả';
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
