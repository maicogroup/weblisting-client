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
        <button class="bd-color-858585 color-707070 rounded w-56 h-10 border text-sm font-bold mb-4 hover:text-white hover:bg-gray-700" @click="featureNotSupported">
          Yêu cầu liên hệ lại
        </button>
        <button class="rounded w-56 h-10 border bg-green-600 hover:bg-green-700 text-white text-sm font-bold flex items-center justify-center">
          <a href="tel:0903324045">0903 324 045</a>
        </button>
      </div>
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
