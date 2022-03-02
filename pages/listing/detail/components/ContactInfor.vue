<template>
  <div>
    <div class="bd-color-c4c4c4 grid grid-rows-4 grid-flow-col flex gap-4 border w-64 h-72 rounded-md px-3.5 pb-3 justify-center">
      <div class="items-center flex flex-col mt-9">
        <img
          class="inline-block h-14 w-14 rounded-full ring-2 ring-white mb-6"
          src="http://crm.maicogroup.net/assets/images/logo.png"
          alt="maico"
        >
        <h3 class="text-sm color-707070 leading-4 font-bold">
          Maico
        </h3>
      </div>
      <div class="mt-20">
        <button @click="featureNotSupported" class="bd-color-858585 color-707070 rounded w-56 h-10 border text-sm font-bold mb-4 hover:text-white hover:bg-gray-700">
          Yêu cầu liên hệ lại
        </button>
        <button class="rounded w-56 h-10 border bg-green-600 hover:bg-green-700 text-white text-sm font-bold flex items-center justify-center">
          <a href="tel:0903324045">0903 324 045</a>
        </button>
      </div>
    </div>
    <div class="w-full border-b bd-color-858585 mt-6 mb-3" />
    <button @click="featureNotSupported" class="bd-color-858585 color-707070 rounded w-64 h-10 border text-sm font-bold mb-3 hover:text-white hover:bg-gray-700">
      Xem review dự án
    </button>
    <button @click="featureNotSupported" class="bd-color-858585 color-707070 rounded w-64 h-10 border text-sm font-bold flex items-center justify-center hover:text-white hover:bg-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      Báo cáo
    </button>
  </div>
</template>

<script>
export default { 
  name: 'ContactInfor',
  methods: { 
    featureNotSupported() {
      this.$toast.show("Tính năng này đang được hoàn thiện, cảm ơn bạn đã nhấn", {
        type: "success",
        theme: "bubble",
        duration: 4000,
        position: "top-center"
      });
    }
  } 
};
</script>

<style scoped>
.color-707070{
  color: #707070;
}

.bd-color-c4c4c4
{
  border-color: #C4C4C4;
}

.bd-color-858585
{
  border-color: #858585;
}
</style>
