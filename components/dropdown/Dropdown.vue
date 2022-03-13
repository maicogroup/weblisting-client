//Modified from: https://tailwindcomponents.com/component/simple-dropdown

<template>
  <div
    class="inline relative"
  >
    <button
      class="relative inline-flex justify-between items-end rounded-md bg-white text-gray-800 p-2 border border-stone-200"
      :style="customStyle"
      @click="open = !open"
      @blur="closeIfOutsideOfDropdown"
    >
      <span class="mr-1">{{ title }}</span>
      <svg class="inline h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    <div
      v-if="open"
      ref="test"
      :style="itemCustomStyle"
      :class="`absolute right-0 py-2 bg-white ${bodyClass}`"
      @click="open = false"
      @mouseenter="entered = true"
      @mouseleave="entered = false"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownComponent',

  props: {
    title: { type: String, default: 'Mặc định' },

    /** width của dropdown (tính cả tiêu đề và mũi tên) */
    width: { type: String, default: 'auto' },

    /** width của các item trong dropdown */
    itemWidth: { type: String, default: 'auto' },

    /** thêm class cho nội dung dropdown. Lưu ý: dùng thuộc tính này sẽ làm mất đi một số class mặc định của nội dung dropdown */
    bodyClass: { type: String, default: 'rounded-md shadow-xl' }
  },

  data () {
    return {
      open: false,
      blurred: false,
      entered: false
    };
  },

  computed: {
    customStyle () {
      return `width: ${this.width}`;
    },

    itemCustomStyle () {
      return `width: ${this.itemWidth}`;
    }
  },

  methods: {
    closeIfOutsideOfDropdown () {
      this.open = this.entered;
      this.entered = false;
    }
  }
};
</script>

<style>

</style>
