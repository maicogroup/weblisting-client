<template>
  <div
    class="inline relative"
  >
    <button
      class="text-sm text-sm relative bg-white text-gray-800 px-2 hover:bg-gray-100 h-full"
      @click="open = !open"
    >
      <div class="inline-flex justify-between items-end">
        <span class="mr-1">Diện tích</span>
        <svg class="inline h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
      <p class="text-center w-28 truncate ... relative text-gray-600">
        {{ displaySelected }}
      </p>
    </button>
    <div
      v-show="open"
      ref="dropdownContent"
      tabindex="0"
      :class="`text-sm absolute right-0 py-2 bg-white top-16 w-60 rounded-none shadow-xl ${(open)? 'show-drop-down' : 'hide-drop-down'}`"

      @mouseenter="entered = true"
      @mouseleave="entered = false"
    >
      <p class="font-semibold px-6 py-2">
        Chọn diện tích
      </p>

      <div class="flex justify-between items-center px-6 mt-3">
        <label class="flex items-center">
          <input :value="customRange.from" placeholder="Từ" class="w-14 px-2 py-1 text-center text-sm border rounded-md outline-none" @input="handleCustomRangeFromChanged">
          <span class="ml-1">m²</span>
        </label>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 12H4" />
        </svg>
        <label class="flex items-center">
          <input :value="customRange.to" placeholder="Đến" class="w-14 px-2 py-1 text-center text-sm border rounded-md outline-none" @input="handleCustomRangeToChanged">
          <span class="ml-1">m²</span>
        </label>
      </div>

      <divider class="mt-2" />

      <filter-dropdown-item class="text-dark-red" @click="handleSelectAllSize">
        Tất cả diện tích
      </filter-dropdown-item>
      <filter-dropdown-item v-for="range in acreageRanges" :key="`${range.from}-${range.to}`" class="flex justify-between" @click="handleSelectAcreageRange(range)">
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
      </filter-dropdown-item>
    </div>
  </div>
</template>

<script>
import FilterDropdownItem from './filter-dropdown-item.vue';
export default {
  name: 'AcreageFilterDropdown',
  components: { FilterDropdownItem },

  props: {
    selectedOption: { type: Object, default: null }
  },

  data () {
    return {
      open: false,
      entered: false,
      displaySelected: 'Tất cả',
      acreageRanges: [{ from: 0, to: 30 }, { from: 30, to: 50 }, { from: 50, to: 80 }, { from: 80, to: 100 }, { from: 100, to: 300 }, { from: 300, to: 500 }, { from: 500, to: null }],
      customRange: { from: 0, to: 0 },
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
        document.removeEventListener('click', this.closeIfOutsideOfDropdown);

        const { from, to } = this.customRange;

        const bothAreNumber = from !== null && to !== null;
        if (bothAreNumber && to - from < 0) {
          this.customRange = { from: to, to: from };
        } else if (bothAreNumber && to === 0 && from === 0) {
          this.customRange = { from: null, to: null };
        }

        this.$emit('optionchanged', { ...this.customRange });
      }
    },

    selectedOption: {
      handler (option) {
        if (option) {
          this.displaySelected = this.formatRange(option);
          this.setCustomRange(option);
        } else {
          this.displaySelected = 'Tất cả';
          this.setCustomRange({ from: null, to: null });
        }
      },
      immediate: true
    }
  },

  methods: {
    closeIfOutsideOfDropdown () {
      this.open = this.entered;
    },

    handleCustomRangeFromChanged (e) {
      if (e.target.value.trim() === '') {
        this.customRange.from = null;
      } else {
        const value = parseInt(e.target.value);
        if (isNaN(value)) {
          this.customRange = { ...this.customRange };
        } else {
          this.customRange.from = Math.min(this.MAX_VALUE, value);
        }
      }

      this.$emit('optionchanged', { ...this.customRange });
    },

    handleCustomRangeToChanged (e) {
      if (e.target.value.trim() === '') {
        this.customRange.to = null;
      } else {
        const value = parseInt(e.target.value);
        if (isNaN(value)) {
          this.customRange = { ...this.customRange };
        } else {
          this.customRange.to = Math.min(this.MAX_VALUE, value);
        }
      }

      this.$emit('optionchanged', { ...this.customRange });
    },

    formatRange (range) {
      if (range.from === null || range.from === 0) {
        return (range.to === null || range.to === 0) ? 'Tất cả' : `Dưới ${range.to} m²`;
      }

      if (range.to === null) {
        return `Trên ${range.from} m²`;
      }

      return `${range.from} - ${range.to} m²`;
    },

    setCustomRange (range) {
      this.customRange = { ...range };
    },

    handleSelectAcreageRange (range) {
      this.open = false;
      this.setCustomRange(range);
      this.$emit('optionchanged', { ...range });
    },

    handleSelectAllSize () {
      this.open = false;
      this.customRange = { from: null, to: null };
      this.$emit('optionchanged', null);
    }
  }
};
</script>

<style scoped>
.range-text {
  width: 85px;
}

.text-dark-red {
  color: #961B12;
}

.show-drop-down{
  animation: scroll-out-animation 0.1s ease;
}

.hide-drop-down{
  overflow: hidden;
  /* animation: scroll-in-animation 0.2s ease; */
  height: 0;
}

@keyframes scroll-out-animation {
  from{
    height: 0;
    opacity: 0;
  }
  to{
    height: 375px;
    opacity: 1;
  }
}

@keyframes scroll-in-animation {
  from{
    height: 375px;
    opacity: 1;
  }
  to{
    height: 0;
    opacity: 0;
  }
}
</style>
