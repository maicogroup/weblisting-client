<template>
  <div class="max-w-[400px] min-w-[200px] overflow-hidden top-0">
    <div class=" title font-bold text-2xl md:text-lg font-source-serif-pro">
      Bài viết nổi bật
    </div>
    <div
      v-for="(top,index) in ['Bỗng nhiên thành linh vật tam giác là tác giam tác là đánh giam là nhốt','Bỗng nhiên thành linh vật','Bỗng nhiên thành linh vật','Bỗng nhiên thành linh vật','Bỗng nhiên thành linh vật']"
      v-show="index<5"
      :key="top"
      class="mt-1 md:mt-0 flex space-x-2.5 rounded-md overflow-hidden mb-[10px] border-[1px] pr-2"
    >
      <img src="~/static/images/home/home-page-bg.jpg" class="shrink-0 h-[75px] w-[103px] md:w[115px] md:h-[80px]">
      <div class="flex flex-col justify-between py-1.5">
        <div class="line-clamp-2 leading-5 font-bold font-source-serif-pro">
          {{ top }}
        </div>
        <div class="text-sm text-neutral-400">
          <span>
            Chí Linh
          </span>
          <span>
            ·
          </span>
          <span>
            20/10/2020
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style>

</style>
