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
        <p class="font-semibold px-6 py-2  mr-auto ml-auto ">
          Chọn diện tích
        </p>
      </div>

      <div class="flex justify-between h-11 border-b items-center mx-3">
        <p>Tất cả diện tích</p>
        <input type="radio" checked="checked" @click="handleSelectAcreageRange(range)">
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
      MAX_VALUE: 999999
    };
  },

  watch: {
    selectedOption: {
      handler (option) {
        if (option) {
          this.displaySelected = 'Diện tích: ' + this.formatRange(option);
        } else {
          this.displaySelected = 'Diện tích';
        }
      },
      immediate: true
    }
  },

  methods: {
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
      this.open = false;
      this.$emit('optionchanged', range);
    },

    handleSelectAllSize () {
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
