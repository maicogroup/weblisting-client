<template>
  <div>
    <MainHeader />
    <div class="relative z-0 mt-32 flex justify-center max-w-full mb-10">
      <Nuxt />
    </div>
    <!-- <TheFooter /> -->
    <MainFooter/>
  </div>
</template>

<script>
import MainHeader from './components/mainHeader/MainHeader.vue';
import MainFooter from './components/mainFooter.vue';
import { gql} from 'graphql-tag';


export default {
  name: 'DefaultLayout',
  components: { MainHeader, MainFooter },
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
