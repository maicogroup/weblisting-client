<template>
  <div>
    <MainHeader />
    <div class="relative mt-20 md:mt-32 flex justify-center max-w-full">
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
  created () {
    if (process.client) {
      window.addEventListener('beforeunload', this.setCookies);
    }
  },
  methods: {
    setCookies (e) {
      e.preventDefault();
      const trackingData = this.$cookies.get(this.$route.fullPath);
      const userId = this.$cookies.get('browserId');
      if (trackingData != null) {
        const msDiff = new Date() - new Date(trackingData.timeArrival);
        const trackingDataReq = {
          site: trackingData.site,
          timeOnSite: (msDiff - msDiff % 1000) / 1000,
          userId,
          timeArrival: trackingData.timeArrival
        };
        this.sendTrackingData(trackingDataReq);
      }
    },
    sendTrackingData (data) {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const graphql = JSON.stringify({
        query: 'mutation AddTracking($input: AddTrackingInput!){\r\n  addTracking(input: $input){\r\n    string\r\n  }\r\n}',
        variables: { input: data }
      });
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
      };

      fetch('http://maicogroup.net:3001/graphql/', requestOptions)
        .then(response => response.text())
        .then(result => console.log('result: ', result))
        .catch(error => console.log('error', error));
    }
  }
};
</script>

<style>

</style>
