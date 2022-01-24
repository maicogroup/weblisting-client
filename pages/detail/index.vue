<template>
  <div class="flex justify-between lg:px-5 w-full max-w-screen-xl">
    <DetailPost :slug="this.$route.params.slug" class="lg:w-9/12 lg:mr-9 w-full" />
    <ContactInfor class="lg:block hidden" />
  </div>
</template>

<script>
import DetailPost from './components/DetailPost.vue';
import ContactInfor from './components/ContactInfor.vue';

export default {
  name: 'DetailApartmentPage',
  components: { ContactInfor, DetailPost }

};
</script>

<style>

</style>
