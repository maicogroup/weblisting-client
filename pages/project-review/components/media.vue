<template>
    <div v-if="mediaSource.includes('mp4')" class="relative">
    <video
    :class="classes"

              @click="handleClick"
            >
              <source :src="mediaSource" type="video/mp4" />
    </video>
    <div @click="handleClick">
    <div class="absolute top-0 left-0 w-full h-full bg-black/20"></div>
    <button class="absolute top-[44%] mx-auto right-0 left-0 w-[80px]">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
      </svg>
    </button>
    </div>
    </div>
    <img
              v-else
              :src="mediaSource"
              @click="handleClick"
    />
</template>

<script>
export default {
props: ['mediaSource', 'classes'],
methods:{
  handleClick(){
    console.log(this.classes);
    this.$emit('media-clicked');
  }
}
}
</script>

<style>
</style>
