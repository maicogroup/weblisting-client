<template>
  <div>
    <MainHeader />
    <div class="relative z-10 mt-32 flex justify-center max-w-full">
      <Nuxt />
    </div>
    <MainFooter />
  </div>
</template>

<script>
import MainHeader from './components/mainHeader/MainHeader.vue';
import MainFooter from './components/mainFooter.vue';

export default {
  name: 'DefaultLayout',
  components: { MainHeader, MainFooter }
};
</script>

<style>

</style>
