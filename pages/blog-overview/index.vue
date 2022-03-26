<template>
  <div class="w-full">
    <post-filter-bar :filter="filter" @search="handleFilterButtonPressed" @filterchanged="handleFilterChanged" />
    <post-filter-modal
      :filter="filter"
      :visible="filterMobileVisible"
      @close="filterMobileVisible = false"
      @filterchanged="handleFilterChanged"
      @search="handleFilterButtonPressed"
    />
    <div class="Page-content mt-10 ">
      <div class="page-container">
        <div class="relative banner items-center w-full  h-[239px] md:h-[366px] ">
          <img class="w-full h-full object-cover absolute" src="~/static/images/home/home-page-bg.jpg">
          <div class="absolute  w-[343px] h-[80px] top-[75px] left-[10%] md:left-[30%] md:top-[40%]  md:center md:h-[150px] md:w-[643px]">
            <h1 class="text-[32px] leading-[40px] md:text-[60px] md:h-[150px] md:leading-[75px] font-bold font-source-serif-pro text-slate-50"> Thông tin nhanh về thị trường bất động sản </h1>
          </div>
        </div>
        <div class=" left-[10%] blog-wrap md:ml-[13%]">
          <div class="trending-blog pt-5 pb-8 pl-[21px] pr-[23px] h-[940px] overflow-hidden">
            <div class="title font-bold text-[24px] font-source-serif-pro">
              Bài viết mới nhất
            </div>
            <div class="blog-card mb-[15px] bg-white rounded-md md:w-[740px] w-[370px] drop-shadow-lg border-[2px]" v-for="t in ['Hai thanh niên réc sìn boi ở vạn phúc','Chuyện tình Khiêm và anh Leader','Hell Team Production','Minh Nhật on the Mic','Khiêm: kẻ thu thập đá quý']" :key="t">
              <img src="~/static/images/home/home-page-bg.jpg" class=" h-[220px] w-[370px] rounded-md md:w-[180px] md:h-[153px] blog-card-image" />
              <div class="blog-card-content">
                <div class="blog-title mr-[9px] ml-[10px] font-source-serif-pro font-bold text-[24px] md:w-[560px] md:h-[60px]">
                  {{t}}
                </div>
                <div class="blog-infor  mr-[9px] ml-[10px]  flex justify-start">
                  <div class="blog-user  font-normal text-slate-500 text-[14px]">
                    Chí Linh
                  </div>
                  <div class="font-normal text-slate-500 text-[14px] pl-2 pr-2 pb-2">
                    .
                  </div>
                  <div class="blog-upDate  font-normal text-slate-500 text-[14px]">
                    03/24/2022
                  </div>
                </div>
                <div class="blog-content mr-[9px] ml-[10px] text-[14px] font-normal font-source-roboto md:w-[533px]">
                  Theo thống kê của các nhà sinh vật học, gần 90% dân công nghệ ở đây toàn mấy đứa lầy với dơ. Tuy nhiên, các nhà khoa học vẫn không hiểu tại sao tụi nó có thể tồn tại lâu và lây lan một cách nhanh chóng và mất kiểm soát...
                </div>
              </div>
            </div>
          </div>
          <div class="blog-pagination w-[310px] h-[39px] ml-[12%] mr-[28px] drop-shadow-md bottom-[100px] rounded-md flex md:ml-[30%]">
            <div class="back-to-first flex justify-start border-[1px]  w-[37px] h-[39px] items-center ">
              <svg
                width="5"
                height="10"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ml-[10px]">
                <path d="M6 1L1 6L6 11" stroke="#1C1917" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg
                width="5"
                height="10"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1L1 6L6 11" stroke="#1C1917" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="back-to-previous flex justify-start border-[1px] w-[37px] h-[39px] items-center ">
              <svg
                width="5"
                height="10"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ml-[12px]">
                <path d="M6 1L1 6L6 11" stroke="#1C1917" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="number-page flex justify-start border-[1px] w-[37px] h-[39px] items-center text-center" v-for="num in ['1','2','3','4']" :key="num">
              <div class="ml-[10px]" v-show="num <4">{{num}}</div>
              <div class="ml-[10px]" v-show="num==4"> ... </div>
            </div>
            <div class="foward-to-next flex justify-start border-[1px] w-[37px] h-[39px] items-center ">
              <svg
                width="6"
                height="10"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ml-[10px]">
                <path d="M1 1L7 6L1 11" stroke="#1C1917" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="foward-to-end flex justify-start border-[1px] w-[40px] h-[39px] items-center ">
              <svg
                width="6"
                height="10"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ml-[10px]">
                <path d="M1 1L7 6L1 11" stroke="#1C1917" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg
                width="6"
                height="10"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L7 6L1 11" stroke="#1C1917" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="top-blog  pb-[5px]  pr-[23px] md:h-[580px] ml-[5px] h-[340px] overflow-hidden">
            <div class=" title font-bold text-[24px] font-source-serif-pro">
              Bài viết nổi bật
            </div>
            <div class="top-blog-content pl-[5px] pr-[23px]">
              <div class="top-blog-card grid grid-cols-[112px_233px] gap-[15px] h-[95px]  drop-shadow-md mb-[10px] border-[1px] md:w-[380px]" v-for="(top,index) in ['Bỗng nhiên thành linh vật','Bỗng nhiên thành linh vật','Bỗng nhiên thành linh vật','Bỗng nhiên thành linh vật','Bỗng nhiên thành linh vật']" :key="top" v-show="index<5" style="grid-template-areas:'image content'">
                <div class="top-blog-cover h-[75px] w-[103px] rounded-md mt-[10px] ml-[10px] mb-[10px]" style="grid-area:image">
                  <img src="~/static/images/home/home-page-bg.jpg" class=" h-[75px] w-[103px] rounded-md" />
                </div>
                <div class="top-blog-content w-[233px] h-[40px] mt-[10px] mb-[10px]" style="grid-area:content">
                  <div class="top-blog-title font-bold text-[16px] font-source-serif-pro">
                    {{top}}
                  </div>
                  <div class="top-blog-infor font-normal text-[12px] font-source-serif-pro w-[51px] h-[14px] text-[#A3A3A3] mt-[30px]">
                    20/10/2020
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostFilterBar from '../components/post-filter-bar.vue';
import PostFilterModal from '../components/post-filter-modal.vue';

export default {
  name: 'HomePage',
  components: { PostFilterBar, PostFilterModal },
  layout: 'no-fixed-contact',
  data () {
    return {
      filter: {},
      filterMobileVisible: false,
      startPage: 1,
      endPage: 0,
      currentPage: 1
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
    handleFilterChanged (newFilter) {
      this.filter = newFilter;
    },

    handleFilterButtonPressed () {
      let path = '/danh-sach-can-ho';
      if (this.filter.project) {
        path = path + '/' + this.filter.project.pageInfor.slug;
      }
      const query = {};
      if (this.filter.demand) {
        query.demand = this.filter.demand;
      }
      if (this.filter.type) {
        query.type = this.filter.type;
      }
      if (this.filter.location) {
        const location = this.filter.location;
        query.city = location.city;
        query.district = location.district;
      }
      if (this.filter.priceRange) {
        const { from, to } = this.swapRangeValueIfInvalid(this.filter.priceRange);
        if (from) {
          query.priceFrom = from;
        }
        if (to) {
          query.priceTo = to;
        }
      }
      if (this.filter.acreageRange) {
        const { from, to } = this.swapRangeValueIfInvalid(this.filter.acreageRange);
        if (from) {
          query.acreageFrom = from;
        }
        if (to) {
          query.acreageTo = to;
        }
      }
      if (this.filter.directions) {
        query.directions = this.filter.directions;
      }
      if (this.filter.bedroomOptions) {
        query.bedroomOptions = this.filter.bedroomOptions;
      }
      this.$router.push({ path, query });
    },

    /** trường hợp người dùng bấm tìm kiếm trước khi range được swap bởi filter dropdown */
    swapRangeValueIfInvalid (range) {
      const bothAreNumber = range.from !== null && range.to !== null;

      if (bothAreNumber && range.to - range.from < 0) {
        return { from: range.to, to: range.from };
      }

      return range;
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
  @media only screen and (min-width: 768px) {
  .blog-wrap
  {
    display: grid;
    grid-template-columns: 780px 400px;
    grid-template-areas: "trend high";
  }
  .trending-blog
  {
    grid-area: trend;
  }
  .top-blog
  {
    grid-area: high;
  }
  .blog-card
  {
    display: grid;
    grid-template-columns: 180px 540px;
    grid-template-areas: "image content";
  }
  .blog-card-image
  {
    grid-area: image;
  }
  .blog-card-content
  {
    grid-area: content;
  }
}
</style>
