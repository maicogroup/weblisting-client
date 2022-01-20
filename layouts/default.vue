<template>
  <div>
    <MainHeader />
    <div class="mt-32 flex justify-center max-w-full" style="height:2000px">
      <Nuxt />
    </div>
    <!-- <TheFooter /> -->
  </div>
</template>

<script>
import MainHeader from './components/MainHeader.vue';
export default {
  name: 'DefaultLayout',
  components: { MainHeader }
};
</script>

<style>

</style>
