<template>
  <button
    @click="handleClick"
    class="bg-green-600 text-slate-50 px-[120px] rounded-md"
    :class="{
      'py-2': size === 'md',
      'uy-4': size === 'lg',
    }"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    size: { type: String, default: "lg" },
    text: { type: String, default: "Button" },
    handleClick: {
      type: Function,
      default: (e) => {
        console.log(`Handle event of btn`);
      },
    },
  },
};
</script>
