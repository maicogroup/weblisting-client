<template>
  <div>
    <MainHeader />
    <div class="relative mt-20 md:mt-32 flex justify-center max-w-full">
      <Nuxt />
    </div>
    <MainFooter />
      <div id="fb-root"> </div>

      <!-- Your Plugin chat code -->
      <div id="fb-customer-chat" class="fb-customerchat">
    </div>
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
      

      //Facebook chat configuration
      var chatbox = document.getElementById('fb-customer-chat');
      chatbox.setAttribute("page_id", "2352735844786718");
      chatbox.setAttribute("attribution", "biz_inbox");
      window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v13.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      
    }
  },
  methods: {
    setCookies(e){
      e.preventDefault();
      const trackingState = this.$cookies.get('trackingState');
      if(trackingState == 'disabled') return;

      const trackingData = this.$cookies.get(this.$route.fullPath);
      const userId = this.$cookies.get('browserId');
      if(trackingData != null) {
          let msDiff = new Date() - new Date(trackingData.timeArrival);
          let trackingDataReq = {
              site: trackingData.site,
              timeOnSite: (msDiff - msDiff % 1000) / 1000,
              userId: userId,
              timeArrival: trackingData.timeArrival
            }
          this.sendTrackingData(trackingDataReq)
        }
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

      fetch("http://localhost:54261/graphql/", requestOptions)
      .then(response => response.text())
      .catch(error => console.log('error', error));
    }
  }
};
</script>

<style>

</style>
