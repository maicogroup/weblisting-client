<<<<<<< HEAD
<template>
  <div>
    <MainHeader />
    <div class="relative mt-20 md:mt-32 flex justify-center max-w-full">
      <Nuxt />
    </div>
    <MainFooter />
    <div id="fb-root"></div>

    <!-- Your Plugin chat code -->
    <div id="fb-customer-chat" class="fb-customerchat"></div>
  </div>
</template>

<script>
import MainHeader from "./components/mainHeader/MainHeader.vue";
import MainFooter from "./components/mainFooter.vue";

export default {
  name: "DefaultLayout",
  components: { MainHeader, MainFooter },
  created() {
    if (process.client) {
      window.addEventListener("beforeunload", this.setCookies);

      //Facebook chat configuration
      var chatbox = document.getElementById("fb-customer-chat");
      chatbox.setAttribute("page_id", "2352735844786718");
      chatbox.setAttribute("attribution", "biz_inbox");
      window.fbAsyncInit = function () {
        FB.init({
          xfbml: true,
          version: "v13.0",
        });
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
  },
  mounted() {
    //display loading in 4s
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 4000);
    });
  },
  methods: {
    setCookies(e) {
      e.preventDefault();
      const trackingState = this.$cookies.get("trackingState");
      if (trackingState == "disabled") return;

      const trackingData = this.$cookies.get(this.$route.fullPath);
      const userId = this.$cookies.get("browserId");
      if (trackingData != null) {
        let msDiff = new Date() - new Date(trackingData.timeArrival);
        let trackingDataReq = {
          site: trackingData.site,
          timeOnSite: (msDiff - (msDiff % 1000)) / 1000,
          userId: userId,
          timeArrival: trackingData.timeArrival,
        };
        this.sendTrackingData(trackingDataReq);
      }
    },
    sendTrackingData(data) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var graphql = JSON.stringify({
        query:
          "mutation AddTracking($input: AddTrackingInput!){\r\n  addTracking(input: $input){\r\n    string\r\n  }\r\n}",
        variables: { input: data },
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow",
      };

      fetch("http://maicogroup.net:3001/graphql/", requestOptions)
        .then((response) => response.text())
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style>
</style>
=======
<template>
  <div>
    <MainHeader />
    <div class="relative mt-20 md:mt-32 flex justify-center max-w-full">
      <Nuxt />
    </div>
    <MainFooter />

    <div class="md:hidden bg-white fixed bottom-0 w-full flex">
      <button class="shrink-0 w-1/3 min-w-min whitespace-nowrap px-8 py-4 bg-white text-sm text-green-600 font-bold">
        Yêu cầu tư vấn
      </button>
      <a href="tel:0938140024" class="grow w-2/3 px-6 py-4 bg-green-600 hover:bg-green-700 text-white text-sm font-bold flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 3h5m0 0v5m0-5l-6 6M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
        </svg>
        0938 140 024
      </a>
    </div>

    <!-- khoảng trống để thanh yêu cầu tư vấn không che trang -->
    <div class="md:hidden" style="height:56px" />

    <tracking-data />
    <facebook-chat />
  </div>
</template>

<script>
import MainHeader from './components/mainHeader/MainHeader.vue';
import MainFooter from './components/mainFooter.vue';
import TrackingData from './components/tracking-data.vue';
import FacebookChat from './components/facebook-chat.vue';

export default {
  name: 'DefaultLayout',
  components: { MainHeader, MainFooter, TrackingData, FacebookChat },
  mounted() {
    //display loading in 4s
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 4000);
    });
  },
};
</script>
>>>>>>> master
