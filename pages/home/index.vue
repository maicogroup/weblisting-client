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

    <div class="relative h-80 md:h-[617px]">
      <img class="w-full h-full object-cover absolute" src="~/static/images/home/home-page-bg.jpg">
      <div class="relative w-full h-full flex flex-col items-center pt-40 md:pt-0 md:justify-center">
        <h1 class="text-[28px] md:text-5xl font-bold font-source-serif-pro text-slate-50">
          Lựa chọn tổ ấm ưng ý của bạn
        </h1>
        <p class="text-sm md:text-2xl md:mt-1 font-bold text-slate-50">
          An tâm với căn hộ xác thực tại MaicoGroup
        </p>

        <div class="search-bar md:hidden font-size-0 mt-7 flex mx-4 box-border rounded-md overflow-hidden">
          <input class="h-10 grow pl-3 text-sm outline-none" type="text" placeholder="Tìm căn hộ" @click="filterMobileVisible = true">
          <button class="font-bold text-sm py-2 px-3 bg-green-600 hover:bg-green-700 text-slate-50" @click="handleFilterButtonPressed">
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>

    <div class="mt-10 md:mt-16 grid grid-cols-2 md:grid-cols-4 max-w-[1000px] mx-auto">
      <div class>
        <img src="~/static/images/home/img1.png" class="h-[111px] md:h-[157px] object-cover mx-auto">
        <div class="text-center text-xs md:text-lg leading-tight">
          Minh bạch
        </div>
      </div>
      <div>
        <img src="~/static/images/home/img2.png" class="h-[111px] md:h-[157px] object-cover mx-auto">
        <div class="text-center text-xs md:text-lg leading-tight">
          Thông tin chính xác
        </div>
      </div>
      <div>
        <img src="~/static/images/home/img3.png" class="h-[111px] md:h-[157px] object-cover mx-auto">
        <div class="text-center text-xs md:text-lg leading-tight">
          Không ngừng phát triển
        </div>
      </div>
      <div>
        <img src="~/static/images/home/img4.png" class="h-[111px] md:h-[157px] object-cover mx-auto">
        <div class="text-center text-xs md:text-lg leading-tight">
          Tử tế là cốt lõi
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <divider class="mt-24 border-neutral-400 mx-10 max-w-[1163px]" />
    </div>

    <div class="flex justify-center mt-10 mb-5 md:mb-10">
      <div class="relative w-full h-96 md:w-[1000px] md:h-[1000px] mx-4">
        <img class="absolute w-full h-full object-cover" src="~/static/images/home/wip.jpg">
        <div class="relative h-full flex flex-col justify-center items-center text-slate-50">
          <svg
            class="md:hidden"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="150"
            height="150"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 72 72"
          ><defs><path id="svgIDa" d="M58 25.833L12 27v-7l46 1.167z" /></defs><path fill="#FCEA2B" d="M58 25.833L12 27v-7l46 1.167z" /><path fill="#FCEA2B" d="M28 59H18l2-46h6z" /><path fill="#D0CFCE" d="M40.5 37h19v4h-19z" /><g
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
          ><use xlink:href="#svgIDa" /><path d="M28 59H18l2-46h6zm-9-9h8m-8-9h8m-7.5-7h7m7.5-8v-5m8 5v-5m8 16V21m-9.5 16h19v4h-19z" /><use xlink:href="#svgIDa" /></g></svg>
          <svg
            class="hidden md:inline"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="300"
            height="300"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 72 72"
          ><defs><path id="svgIDa" d="M58 25.833L12 27v-7l46 1.167z" /></defs><path fill="#FCEA2B" d="M58 25.833L12 27v-7l46 1.167z" /><path fill="#FCEA2B" d="M28 59H18l2-46h6z" /><path fill="#D0CFCE" d="M40.5 37h19v4h-19z" /><g
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
          ><use xlink:href="#svgIDa" /><path d="M28 59H18l2-46h6zm-9-9h8m-8-9h8m-7.5-7h7m7.5-8v-5m8 5v-5m8 16V21m-9.5 16h19v4h-19z" /><use xlink:href="#svgIDa" /></g></svg>

          <div class="w-[171px] md:w-[297px] text-center">
            <p class="text-[38px] md:text-[66px] font-bold leading-tight">
              Tính năng
            </p>
            <p class="text-[23px] md:text-[40px] font-bold">
              Đang hoàn thiện
            </p>
            <p class="text-sm md:text-[25px] font-bold">
              chúng tôi sẽ thông báo lại
              cho quý khách
            </p>
          </div>
          <p class="w-[210px] md:w-full mt-2 md:mt-4 text-2xl md:text-5xl font-bold text-center">
            Chúc quý khách có một ngày tốt lành
          </p>
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
      filter: {demand: "Cho Thuê"},
      filterMobileVisible: false
    };
  },
   head () {
    return{
      title: 'MaicoGroup - Căn hộ xác thực',
       meta: [
        {
          property: 'og:image',
          content: "https://weblisting.hn.ss.bfcplatform.vn/og_image.jpg"
        },
        {
          name: 'robots',
          content: 'noindex'
        }
      ]
    };
  },
  methods: {
    handleFilterChanged (newFilter) {
      this.filter = newFilter;
    },

    handleFilterButtonPressed () {
      let path = '';
      if (this.filter.project) {
        path = path + '/' + this.filter.project.pageInfor.slug;
      }
      const query = {};
      // if (this.filter.demand) {
      //   query.demand = this.filter.demand;
      // }
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
    width: 100%;
  }
</style>
