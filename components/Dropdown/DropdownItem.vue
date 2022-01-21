<template>
  <a class="block px-4 py-2 capitalize text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer" @click="$emit('click')">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'DropdownItem',
  components: true
};
</script>

<style>

</style>
