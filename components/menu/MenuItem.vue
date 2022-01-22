<template>
  <a class="py-2 px-12 block text-sm text-gray-600 hover:bg-blue-500 hover:text-white cursor-pointer" @click="$emit('click')">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'MenuItem'
};
</script>

<style>

</style>
