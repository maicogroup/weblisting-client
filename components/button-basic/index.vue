<template>
  <button
    @click="handleClick"
    class="bg-green-600 text-slate-50 px-[120px] rounded-md"
    :class="{
      'py-2': size === 'md',
      'uy-4': size === 'lg',
      'cursor-wait': isDisable,
      'opacity-80': isDisable,
    }"
    :disabled="isDisable"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    size: { type: String, default: "lg" },
    text: { type: String, default: "Button" },
    isDisable: { type: Boolean, default: false },
    handleClick: {
      type: Function,
      default: () => {
        console.log(`Handle event of btn`);
      },
    },
  },
  data() {
    return {};
  },
};
</script>
