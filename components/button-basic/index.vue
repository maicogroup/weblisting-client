<template>
  <button
    @click="handleClick"
    class="bg-green-600 text-slate-50 px-[120px] py-4 rounded-md"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
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
