<template>
  <div :class="`${vertical ? 'border-l' : 'w-full border-b'} border-gray-300`" />
</template>

<script>
export default {
  name: 'SectionDivider',
  props: {
    vertical: { type: Boolean, default: false }
  }
};
</script>

<style>

</style>
