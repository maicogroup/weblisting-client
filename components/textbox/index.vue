<template>
  <div class="w-full">
    <p class="mb-2 text-zinc-800 font-medium">{{ title }}</p>
    <input
      class="w-full border border-neutral-200 rounded-md p-2 text-zinc-700 text-base"
      :type="type"
      v-model="value"
      :pattern="pattern"
    />
    <p v-if="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    value: { type: String, default: "" },
    parent: { type: String, default: "" },
    errorMessage: { type: String, default: "" },
    handleChange: { type: Object, default: () => {} },
    type: { type: String, default: "text" },
    error: { type: Boolean, default: false },
  },
};
</script>
