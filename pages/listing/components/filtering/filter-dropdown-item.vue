<template>
  <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" @click="$emit('click')">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'FilterDropdownItem'
};
</script>
