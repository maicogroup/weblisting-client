<template>
  <div>
    <MainHeader />
    <div class="relative z-0 mt-32 flex justify-center max-w-full">
      <Nuxt />
    </div>
    <!-- <TheFooter /> -->
  </div>
</template>

<script>
import MainHeader from './components/mainHeader/MainHeader.vue';
import { gql} from 'graphql-tag';


export default {
  name: 'DefaultLayout',
  components: { MainHeader },
  // apollo:{
  //   projects:{
  //     query(){
  //       return getProjectsQuery;
  //     }
  //   }
  // }
};
</script>

<style>

</style>
