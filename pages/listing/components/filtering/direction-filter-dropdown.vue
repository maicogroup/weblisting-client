<template>
  <div
    class="inline relative"
  >
    <button
      class="text-sm relative bg-white text-gray-800 px-2 hover:bg-gray-100 h-full"
      @click="open = !open"
    >
      <div class="inline-flex justify-between items-end">
        <span class="mr-1">Hướng</span>
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
      <p class="font-semibold pb-2 px-4">
        Chọn hướng
      </p>

      <divider />

      <div class="flex space-x-4 px-4 my-2">
        <div class="flex-col space-y-1">
          <label v-for="direction in directions.filter((_, index) => index % 2 === 0)" :key="direction" :for="direction" class="flex items-center">
            <input :id="direction" v-model="selectedOptions" :value="direction" type="checkbox" class="form-checkbox h-4 w-4 text-gray-600">
            <span :for="direction" class="whitespace-nowrap ml-2 text-gray-700">{{ direction }}</span>
          </label>
        </div>
        <div class="flex-col space-y-1">
          <label v-for="direction in directions.filter((_, index) => index % 2 !== 0)" :key="direction" :for="direction" class="flex items-center">
            <input :id="direction" v-model="selectedOptions" :value="direction" type="checkbox" class="form-checkbox h-4 w-4 text-gray-600">
            <span class="whitespace-nowrap ml-2 text-gray-700">{{ direction }}</span>
          </label>
        </div>
      </div>

      <divider />

      <div class="flex space-x-2 justify-center mt-3 mb-1">
        <button class="px-2 py-1 hover:text-red-700" @click="clearSelectedOptions">
          Đặt lại
        </button>
        <button class="border rounded-md px-2 py-1 hover:text-white hover:bg-gray-700" @click="open = false">
          Hủy
        </button>
        <button :class="`border font-semibold rounded-md px-2 py-1 hover:text-white hover:bg-gray-700`" @click="applyOptions">
          Áp dụng
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DirectionFilterDropdown',

  data () {
    return {
      open: false,
      entered: false,
      displaySelected: 'Tất cả',
      directions: ['Đông', 'Tây', 'Nam', 'Bắc', 'Đông Nam', 'Tây Nam', 'Đông Bắc', 'Tây Bắc'],
      prevSelectedOptions: [],
      selectedOptions: []
    };
  },

  watch: {
    open (value) {
      if (value === true) {
        // khi mở dropdown thì chuột chưa chạm vào nội dung nên biến entered phải mặc định bằng false
        this.entered = false;

        // setTimeout để tránh listen các click event hiện tại
        setTimeout(() => document.addEventListener('click', this.closeIfOutsideOfDropdown), 0);
      } else {
        this.selectedOptions = [...this.prevSelectedOptions];
        document.removeEventListener('click', this.closeIfOutsideOfDropdown);
      }
    }
  },

  methods: {
    closeIfOutsideOfDropdown () {
      this.open = this.entered;
    },

    clearSelectedOptions () {
      this.selectedOptions = [];
    },

    applyOptions () {
      this.displaySelected = this.selectedOptions.length > 0 ? this.selectedOptions.join(', ') : 'Tất cả';
      this.prevSelectedOptions = [...this.selectedOptions];
      this.$emit('optionchanged', [...this.selectedOptions]);
    }
  }
};
</script>
