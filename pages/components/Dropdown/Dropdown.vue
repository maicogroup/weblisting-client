//Modified from: https://tailwindcomponents.com/component/simple-dropdown

<template>
  <div class="inline relative">
    <button class="relative z-10 rounded-md bg-white text-gray-800 p-2" @click="open = !open">
      Mặc định
      <svg class="inline h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>

    <div v-if="open" class="fixed inset-0 h-full w-full z-10" @click="open = false" />

    <div v-if="open" class="absolute right-0 py-2 w-48 bg-white rounded-md shadow-xl z-20">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownComponent',
  data () {
    return {
      open: false
    };
  }
};
</script>

<style>

</style>
