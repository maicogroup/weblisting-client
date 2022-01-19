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
      <NuxtLink to="/">
        Xem chi tiết về chung cư {{ project.projectName }} >>
      </NuxtLink>
    </div>
    <iframe :src="project.address.googleMapLocation" width="100%" class="h-60 mt-4 lg:mt-0 lg:h-full" loading="lazy" />
  </div>
</template>

<script>
export default {
  name: 'ProjectHeader',
  props: {
    project: { type: Object, require: true, default: null }
  }
};
</script>

<style>

</style>
