<template>
    <video
              controls
              v-if="mediaSource.includes('mp4')"
              @click="handleClick"
            >
              <source :src="mediaSource" type="video/mp4" />
            </video>
    <img
              v-else
              :src="mediaSource"
              @click="handleClick"
    />
</template>

<script>
export default {
props: ['mediaSource'],
methods:{
  handleClick(){
    console.log("clicked");
    this.$emit('media-clicked');
  }
}
}
</script>

<style>

</style>
