<template>
  <div class="w-full">
    <p class="mb-2 text-zinc-800 font-medium">{{ title }}</p>
    <input
      class="w-full border border-neutral-200 rounded-md p-2 text-zinc-700 text-base"
      :type="type"
      :value="value"
      :pattern="pattern"
      @input="$emit('input', $event.target.value)"
    />
    <p v-if="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    value: { type: String, default: "" },
    pattern: { type: String, default: "" },
    errorMessage: { type: String, default: "" },
    handleChange: { type: Function, default: () => {} },
    type: { type: String, default: "text" },
    error: { type: Boolean, default: false },
    name: { type: String, default: "" },
  },
};
</script>
