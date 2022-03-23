<template>
  <div v-if="project != null" class="w-full border border-[#C4C4C4] rounded-[5px]">
    <div class="w-full md:min-h-[158px] md:max-h-[158px] min-h-[387px] block md:flex overflow-hidden">
      <div class="md:min-w-[223px] md:max-w-[223px] w-full">
        <img class="w-full md:min-h-[158px] md:max-h-[158px] h-[186px] object-cover" :src="project.images[0]">
      </div>
      <div class="w-full md:px-10 md:py-2">
      <div class="flex">
      <h4 class="md:mt-3 text-[16px] font-bold lg:mt-2 p-5 pb-0 md:p-0">
        Căn hộ chung cư {{ project.projectName }}
      </h4>
      <nuxt-link :to="`/tong-quan-du-an/${projectUrl}`" class="mt-3 sm:mt-2 hover:text-green-500 ml-auto text-orange-700 hidden md:block">
        Tìm hiểu thêm >>
      </nuxt-link>
      </div>
      <p class="mt-0 sm:mt-1 text-stone-900 text-[14px] p-5 pt-0 md:p-0">
        {{ project.description }}
      </p>
      <nuxt-link :to="`/tong-quan-du-an/${projectUrl}`" class="hover:text-green-500 w-full text-center text-orange-700 md:hidden block w-full py-2 border border-[#E5E5E5]">
        Tìm hiểu thêm >>
      </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectHeader',

  props: {
    project: { type: Object, require: true, default: null },
    projectUrl: {type: String, require: true, default: null}
  },

  computed: {
    projectAddress () {
      const address = this.project.address;
      return `${address.street}, ${address.district}, ${address.city}`;
    },
  }
};
</script>

<style>
.color-A3A3A3{
  color: #A3A3A3;
}
</style>
