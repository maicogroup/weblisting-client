<template>
  <div>
    <MainHeader />
    <div class="relative mt-20 md:mt-32 flex justify-center max-w-full min-h-screen">
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
 jsonld() {
    return {
      "@context": "http://schema.org",
      "@type": "Organization",
      "url": "https://maico.vn",
      "logo": "https://maico.vn/images/logo.png",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "0938 140 024",
          "contactType": "customer service"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/maicogroup",
        "https://www.linkedin.com/company/maicogroup/",
      ]
    };
  }
};
</script>