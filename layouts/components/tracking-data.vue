<template>
  <div />
</template>

<script>
export default {
  name: 'TrackingData',
  created () {
    if (process.client) {
      window.addEventListener('beforeunload', this.setCookies);
    }
  },
  methods: {
    setCookies (e) {
      e.preventDefault();
      const trackingState = this.$cookies.get('trackingState');
      if (trackingState == 'disabled') { return; }

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

      fetch('http://localhost:54261/graphql/', requestOptions)
        .then(response => response.text())
        .catch(error => console.log('error', error));
    }
  }
};
</script>

<style>

</style>
