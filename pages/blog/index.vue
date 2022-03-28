<template>
  <div class="w-full">
    <div class="relative items-center w-full h-[239px] md:h-[366px] object-cover">
      <img class="w-full h-full object-cover absolute" src="~/static/images/home/home-page-bg.jpg">
      <div class="relative mx-auto h-full text-[32px] md:text-[60px] md:leading-[75px] flex flex-col items-center justify-center font-bold font-source-serif-pro">
        <h1 class="text-slate-50 text-center">
          Thông tin nhanh về
        </h1>
        <h1 class="text-slate-50 text-center">
          thị trường bất động sản
        </h1>
      </div>
    </div>
    <div class="object-cover center relative flex flex-col items-center md:justify-center">
      <div class=" pt-2.5 md:pt-10 pb-8 px-[21px] overflow-hidden">
        <div class="title font-bold text-2xl font-source-serif-pro">
          Bài viết mới nhất
        </div>
        <div class="flex space-x-6">
          <div class="min-w-0 md:max-w-[745px] max-w-[370px]">
            <div
              v-for="t in ['Hai thanh niên réc sìn boi ở vạn phúc phúc phúc phúc phúc phúc','Chuyện tình Khiêm và anh Leader','Hell Team Production','Minh Nhật on the Mic','Khiêm: kẻ thu thập đá quý']"
              :key="t"
              class="flex flex-col md:flex-row mb-[15px] bg-white rounded-md border border-stone-200 overflow-hidden"
            >
              <img src="~/static/images/home/home-page-bg.jpg" class=" h-[220px] w-[370px] md:w-[180px] md:h-[160px] blog-card-image">
              <div class="py-2 pr-2 pl-3">
                <div class="font-source-serif-pro font-bold text-xl leading-[30px]">
                  {{ t }}
                </div>
                <div class="text-sm text-neutral-400 flex justify-start">
                  <div>
                    Chí Linh
                  </div>
                  <div class="ml-2 mr-2">
                    ·
                  </div>
                  <div>
                    03/24/2022
                  </div>
                </div>
                <div class="mt-1 line-clamp-3 text-sm">
                  Theo thống kê của các nhà sinh vật học, gần 90% dân công nghệ ở đây toàn mấy đứa lầy với dơ. Tuy nhiên, các nhà khoa học vẫn không hiểu tại sao tụi nó có thể tồn tại lâu và lây lan một cách nhanh chóng và mất kiểm soát...
                </div>
              </div>
            </div>
            <pagination
              :total="20"
              :per-page="10"
              :current-page="1"
              @pagechanged="handlePageChanged"
            />
            <featured-posts class="mt-7 lg:hidden" />
          </div>
          <featured-posts class="hidden lg:block" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeaturedPosts from './components/featured-posts.vue';
import Pagination from '~/components/pagination.vue';

export default {
  name: 'HomePage',
  components: { Pagination, FeaturedPosts },
  layout: 'no-fixed-contact',
  data () {
    return {
    };
  },
  head () {
    return {
      title: 'MaicoGroup - Căn hộ xác thực',
      meta: [{
        property: 'og:image',
        content: 'https://weblisting.hn.ss.bfcplatform.vn/og_image.jpg'
      }]
    };
  },
  methods: {
    handlePageChanged () {

    }
  }
};
</script>

<style scoped>
  .font-size-0 {
    font-size: 0;
  }

  .search-bar {
    max-width: 384px;
    /*width: 100%;*/
  }
</style>
