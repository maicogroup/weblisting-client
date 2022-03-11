<template>
  <div v-if="project != null" class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <img class="w-full h-60 object-cover lg:h-80" :src="project.images[0]">
      <h4 class="uppercase mt-4 text-xl font-bold lg:mt-2">
        Căn hộ chung cư {{ project.projectName }}
      </h4>
      <p class="text-gray-500">
        {{ projectAddress }}
      </p>
      <nuxt-link to="/" class="hover:text-green-500">
        Xem chi tiết về chung cư {{ project.projectName }} >>
      </nuxt-link>
    </div>
    <iframe :src="project.address.googleMapLocation" class="w-full h-60 md:h-full" loading="lazy" />
  </div>
</template>

<script>
export default {
  name: 'ProjectHeader',

  props: {
    project: { type: Object, require: true, default: null }
  },

  computed: {
    projectAddress () {
      const address = this.project.address;
      return `${address.street}, ${address.district}, ${address.city}`;
    }
  }
};
</script>

<style>

</style>
