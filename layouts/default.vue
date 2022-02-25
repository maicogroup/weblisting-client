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
  components: { MainHeader, MainFooter },
  created(){
    if(process.client){
      window.addEventListener('beforeunload', this.setCookies)
    }
  },
  methods: {
    setCookies(e){
      e.preventDefault();
      const trackingData = app.$cookies.get('behavior-tracking');
      const userId = app.$cookies.get('browserId');
      if(trackingData != null) {
          let msDiff = new Date() - new Date(trackingData.timeIn);
          let trackingDataReq = {
              site: trackingData.site,
              timeOnSite: (msDiff - msDiff % 1000) / 1000,
              userId: userId
          }
          sendTrackingData(trackingDataReq);
      }
        this.$cookies.remove('behavior-tracking');
    },
    sendTrackingData(data){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var graphql = JSON.stringify({
      query: "mutation AddTracking($input: AddTrackingInput!){\r\n  addTracking(input: $input){\r\n    string\r\n  }\r\n}",
      variables: {"input": data}
      })
      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow'
      };

      fetch("https://localhost:7247/graphql/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    }
  }
};
</script>

<style>

</style>
