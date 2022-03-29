<template>
  <div class="max-w-[400px] min-w-[300px] overflow-hidden top-0">
    <div class=" title font-bold text-2xl md:text-lg font-source-serif-pro">
      Bài viết nổi bật
    </div>
    <div
      v-for="blog in blogs"
      :key="blog.id"
      class="mt-1 md:mt-0 flex space-x-2.5 rounded-md overflow-hidden mb-[10px] border-[1px] pr-2"
    >
      <nuxt-link class="shrink-0" :to="blog.slug">
        <img src="~/static/images/home/home-page-bg.jpg" class="h-[75px] w-[103px] md:w[115px] md:h-[80px]">
      </nuxt-link>
      <div class="flex flex-col justify-evenly py-1.5">
        <nuxt-link :to="blog.slug" class="line-clamp-2 leading-5 font-bold font-source-serif-pro">
          {{ blog.title }}
        </nuxt-link>
        <div class="text-sm text-neutral-400">
          <span>
            {{ blog.authorName }}
          </span>
          <span>
            ·
          </span>
          <span>
            {{ blog.createdAt }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturedBlogs',
  props: {
    blogs: { type: Array, required: true, default: null }
  }
};
</script>

<style>

</style>
