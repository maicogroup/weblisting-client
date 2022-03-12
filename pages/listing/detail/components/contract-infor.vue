<template>
  <div>
    <div class="shadow border-stone-200 border w-72 rounded-md px-6 py-4 flex flex-col items-center">
      <img
        class="inline-block object-cover h-14 w-14 rounded-full border border-stone-200"
        src="~/assets/maico-contact-infor.png"
        alt="maico"
      >
      <p class="mt-1 text-green-600 font-bold leading-4">
        MAICO
      </p>
      <a href="tel:0903324045" class="mt-3 rounded-md w-56 h-10 border bg-green-600 hover:bg-green-700 text-white text-sm font-bold flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 3h5m0 0v5m0-5l-6 6M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
        </svg>
        <p>0903 324 045</p>
      </a>
      <button class="mt-2 text-sm text-green-600 rounded-md w-56 h-10 border border-green-600 text-sm font-bold hover:text-green-700 hover:border-green-700 hover:bg-gray-100" @click="featureNotSupported">
        Yêu cầu tư vấn
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactInfor',
  methods: {
    featureNotSupported () {
      this.$toast.show('Tính năng này đang được hoàn thiện, cảm ơn bạn đã nhấn', {
        type: 'success',
        theme: 'bubble',
        duration: 4000,
        position: 'top-center'
      });
    }
  }
};
</script>

<style scoped>
  .shadow {
    box-shadow: 0px 2px 20px #ebebeb;
  }
</style>
