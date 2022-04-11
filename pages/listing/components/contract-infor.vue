<template>
  <div class="flex flex-col space-y-4 border w-60 h-40 rounded-md px-3.5 pt-6 pb-3">
    <a href="tel:0938140024" class="w-full rounded h-12 border bg-green-600 hover:bg-green-700 text-white text-sm font-bold flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 3h5m0 0v5m0-5l-6 6M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
      </svg>
      0938 140 024
    </a>
    <button @click="featureNotSupported" class="w-full rounded h-12 border border-green-600 text-green-600 text-sm font-bold hover:text-white hover:bg-green-700">
      Yêu cầu tư vấn
    </button>
  </div>
</template>

<script>
export default { 
  name: 'ContactInfor', 
  methods: {
    featureNotSupported() {
      console.log("click");
      this.$toast.show("Tính năng này đang được hoàn thiện, cảm ơn bạn đã nhấn",
      {
        type: "success",
        theme: "bubble",
        duration: 4000,
        position: "top-center"
      });
    }

    // tinh nang nay dang duoc hoan thien, cam on ban da nhan
  }

};
</script>

<style scoped>
</style>
