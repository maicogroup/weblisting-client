<template>
  <div v-if="project" class="w-full sm:px-36 px-5 color-stone-900">
    <div class="sm:block hidden">
      <div class="text-sm font-medium sm:font-normal color-999999 mt-2.5 sm:mt-0 mb-1.5 sm:mb-2.5">
        <a href="#">Dự án</a>
        /
        <a href="">TP HCM</a>
        /
        <a class="font-bold color-stone-900" href="#">{{ project.projectName }}</a>
      </div>
      <h1 class="font-bold font-size-project-name mb-1 mt-2 color-stone-900" @click="HandleScroll()">
        {{ project.projectName }}
      </h1>
      <p class="mb-4 text-sm font-normal mt-1 color-stone-900">
        Đường {{ project.address.street }}, Quận {{ project.address.district }}, TP {{ project.address.city }}
      </p>
    </div>
    <div>
      <gallery class="inline h-72 w-full" :items="gallery" />
    </div>
    <div class="sm:hidden block">
      <div class="text-sm font-medium sm:font-normal color-999999 mt-2.5 sm:mt-0 mb-1.5 sm:mb-2.5">
        <a href="#">Dự án</a>
        /
        <a href="">TP HCM</a>
        /
        <a class="font-bold color-stone-900" href="#">{{ project.projectName }}</a>
      </div>
      <h1 class="font-bold font-size-project-name mb-1 mt-2 color-stone-900" @click="HandleScroll()">
        {{ project.projectName }}
      </h1>
      <p class="mb-4 text-sm font-normal mt-1 color-stone-900">
        Đường {{ project.address.street }}, Quận {{ project.address.district }}, TP {{ project.address.city }}
      </p>
    </div>
    <div class="mt-1 sm:mt-5 sm:mx-44">
      <div class="flex justify-between sm:justify-start sticky-table-of-content z-10 sm:pt-0 pt-3 color-stone-900">
        <button :class="isTargetingTableOfContents.isTargetingOverview ? activeTableContent : tableContentStyles" @click="ScrollToOverview()">
          <h2 class="font-size-table-of-contents font-bold">
            Tổng quan
          </h2>
          <p class="text-sm font-medium sm:block hidden">
            Tổng quan dự án
          </p>
        </button>
        <button :class="isTargetingTableOfContents.isTargetingGround ? activeTableContent : tableContentStyles" @click="ScrollToGround()">
          <h2 class="font-size-table-of-contents font-bold ">
            Mặt bằng
          </h2>
          <p class="text-sm font-medium sm:block hidden">
            Tổng thể về dự án
          </p>
        </button>
        <button :class="isTargetingTableOfContents.isTargetingLocation ? activeTableContent : tableContentStyles" @click="ScrollToLocation()">
          <h2 class="font-size-table-of-contents font-bold">
            Vị trí
          </h2>
          <p class="text-sm font-medium sm:block hidden">
            Bản đồ dự án
          </p>
        </button>
        <button :class="isTargetingTableOfContents.isTargetingRentAndSell ? activeTableContent : tableContentStyles" @click="ScrollToSellAndRent()">
          <h2 class="font-size-table-of-contents font-bold">
            Bán và cho thuê
          </h2>
          <p class="text-sm font-medium sm:block hidden">
            Giá bán và cho thuê
          </p>
        </button>
      </div>
      <div ref="Overview" class="color-stone-900" style="scroll-margin-top: 135px" v-on:="ScrollToOverviewHandle()">
        <h1 class="font-medium font-size-overview sm:my-6 my-2.5">
          Tổng quan
        </h1>
        <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-6 h-auto">
          <div class="block">
            <p class="re-properties-frame">
              <span class="re-properties flex w-7/12">Giá</span>
              <span class="re-properties-content max-w-40"> {{ project.price }} triệu/m2 </span>
            </p>
            <p class="re-properties-frame">
              <span class="re-properties flex w-7/12">Diện tích</span>
              <span class="re-properties-content max-w-40"> {{ project.acreage }} ha </span>
            </p>
            <p class="re-properties-frame">
              <span class="re-properties flex w-7/12">Chủ đầu tư</span>
              <span class="re-properties-content max-w-40"> {{ project.investor.investorName }} </span>
            </p>
          </div>
          <div class="block">
            <p class="re-properties-frame">
              <span class="re-properties flex w-7/12">Số căn hộ</span>
              <span class="re-properties-content max-w-40"> {{ project.numberOfApartments }}  căn </span>
            </p>
            <p class="re-properties-frame">
              <span class="re-properties flex w-7/12">Số tòa</span>
              <span class="re-properties-content max-w-40"> {{ project.numberOfBuildings }}</span>
            </p>
            <p class="re-properties-frame">
              <span class="re-properties flex w-7/12">Pháp lý</span>
              <span class="re-properties-content max-w-40"> {{ project.juridical }}</span>
            </p>
          </div>
        </div>
        <div :class="showReadMoreStyles" v-html="project.projectPost" />
      </div>
      <button class="flex items-center ml-auto mr-auto mt-6 mb-8" @click="setReadMoreActiveState()">
        <p class="text-center text-lg read-more mr-2">
          {{ readMoreContent }}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :class="readMoreArrowStyle"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <expand-panel title="Thông tin chi tiết" class="mt-2.5 sm:mt-9">
        <div class="grid md:grid-cols-2 grid-cols-1 md:gap-6 h-auto" style="column-gap: 20px">
          <p v-for="(item, index) in detailInfors" :key="index" class="re-properties-frame-panel">
            <span class="re-properties-panel flex w-1/2">{{ item.name }}</span>
            <span class="re-properties-content max-w-50 ">{{ item.content }}</span>
          </p>
        </div>
      </expand-panel>
      <expand-panel title="Tiện ích nội khu" class="sm:mt-9 mt-3.5">
        <div>
          <ul class="list-none grid grid-cols-2 gap-2 text-sm font-medium color-stone-900">
            <li v-for="utility in project.utilities.listOfUtilities" :key="utility" class="mb-2.5">
              <p>{{ utility }}</p>
            </li>
          </ul>
        </div>
      </expand-panel>
      <expand-panel title="Chủ đầu tư" class="mt-3.5 sm:mt-9">
        <div class="flex sm:flex-row flex-col">
          <div class="flex justify-start">
            <div class="sm:w-full w-2/5">
              <img class="sm:w-40 sm:h-40 w-24 h-24" :src="project.investor.image" alt="hinh anh chu dau tu">
            </div>
            <h3 class="text-lg font-bold sm:hidden block max-w-60">
              {{ project.investor.investorName }}
            </h3>
          </div>
          <div class="sm:ml-12 grow">
            <h3 class="text-lg font-bold sm:block hidden">
              {{ project.investor.investorName }}
            </h3>
            <div class="">
              <div class="text-lg flex justify-start mt-3">
                <p class="font-medium w-2/5">
                  Số dự án
                </p>
                <P class="max-w-60">
                  {{ project.investor.numberOfProjects }} sắp mở - {{ project.investor.numberOfProjects }} đang mở bán - {{ project.investor.numberOfProjects }} đã bàn giao
                </P>
              </div>
              <div class="text-lg flex justify-start mt-1.5">
                <p class="font-medium w-2/5">
                  Thành lập
                </p>
                <P class="max-w-60">
                  {{ project.investor.foundedTime }}
                </P>
              </div>
              <div class="text-lg flex justify-start mt-3">
                <p class="font-medium w-2/5">
                  Số điện thoại
                </p>
                <P class="max-w-60">
                  {{ project.investor.phoneNumber }}
                </P>
              </div>
            </div>
          </div>
        </div>
      </expand-panel>
      <h1 ref="Ground" class="font-size-project-ground mt-12 sm:mt-6 mb-1.5 sm:mb-4" style="scroll-margin-top: 135px">
        Mặt bằng dự án
      </h1>
      <img class="h-48 sm:h-96 w-full" :src="project.masterPlan" alt="cay xoai">
      <h1 ref="Location" style="scroll-margin-top: 135px" class="font-medium text-2xl sm:text-3xl mt-6 mb-1.5 sm:mb-4">
        Vị trí dự án The Sun Avenue
      </h1>
      <iframe
        :src="project.address.googleMapLocation"
        style="border:0;"
        class="h-52 sm:h-64 w-full"
        allowfullscreen=""
        loading="lazy"
      />
    </div>
    <div ref="SellAndRent" style="scroll-margin-top: 10px" class="divide-y w-full border-b-2 mt-8 mb-12 hidden sm:block" />
    <recommended-posts
      v-if="recommendedPosts !== undefined && recommendedPosts.length > 0 && !$apollo.loading"
      title="Bán và Thuê"
      class="mb-4"
      :posts="recommendedPosts"
    />
    <near-area-recommended v-if="areaProjects !== undefined && areaProjects.length > 0 && !$apollo.loading" class="mb-4" :projects="areaProjects" />
  </div>
</template>

<script>
// eslint-disable-next-line vue/component-tags-order
import { expandPanel } from 'vue-expand-panel';
import { gql } from 'graphql-tag';
import NearAreaRecommended from './components/near-area-recommended.vue';
// import styles
import '~/assets/css/vue-expander.css';

const getRecommendedPosts = gql`
  query GetRecommendedPosts($filter: PostCollectionFilterInput!) {
  postsWithPagination(take:10, where: $filter, order: { lastUpdatedAt: DESC }){
    items {
      demand
      id
      price
      totalBedRoom
      totalWC
      acreage
      gallery
      pageInfor {
        title
        slug
      }
      project {
        id
        address {
          street,
          district,
          city
        }
      },
      lastUpdatedAt
    }
  }
}`;
const getAreaProjects = gql`
  query GetAreaProjects($condition: ProjectCollectionFilterInput) {
  projects(where: $condition){
    id,
    images,
    projectName,
    address{
      district,
      city
    },
    pageInfors{
      slug
    }
  }
}`;
export default {

  name: 'ProjectOverview',
  components: { expandPanel, NearAreaRecommended },
  data () {
    return {
      // dữ liệt trang tổng quan dự án
      isDroppingContent: false,
      readMoreContent: 'Xem thêm',
      showReadMoreStyles: 'mt-1.5 text-lg overflow-hidden max-h-6',
      hideReadMoreStyles: 'hidden delay-1000',
      tableContentStyles: 'text-center sm:mr-6 table-of-content color-A3A3A3 transition-02s-all',
      activeTableContent: 'active-table-contents text-center sm:mr-6 transition-02s-all',
      readMoreArrowStyle: 'rotate-arrow-down h-6 w-6',
      isTargetingTableOfContents: {
        isTargetingOverview: true,
        isTargetingGround: false,
        isTargetingLocation: false,
        isTargetingRentAndSell: false
      },
      readMoreButtonIsActive: false
    };
  },
  head () {
    return {
      title: this.project?.pageInfors.find(c => c.slug.includes(this.$route.params.slug)).title,
      meta: [{
        hid: 'description',
        name: 'description',
        content: this.project?.pageInfors.find(c => c.slug.includes(this.$route.params.slug)).metaDescription
      }]
    };
  },
  apollo: {

    project: {
      query () {
        return gql`
              query GetProjectOverview($slug: String!) {
                projects(where: { pageInfors: { some: { slug: { eq: $slug }}} }) {
                  id
                  projectName
                  address {
                    street
                    district
                    city
                    googleMapLocation
                  }
                  images
                  pageInfors{
                    title
                    slug
                    metaDescription
                  }
                  price
                  acreage
                  numberOfApartments
                  numberOfBuildings
                  juridical
                  investor{
                    investorName
                    image
                    numberOfProjects
                    foundedTime
                    phoneNumber
                  }
                  projectPost
                  masterPlan
                  utilities{
                    locationUtilities
                    internalUtilities
                    listOfUtilities
                  }
                  tempProjectInfors{
                    inforName
                    inforContent
                  }
                }
            }`;
      },
      update (data) {
        const project = data.projects[0];
        return project;
      },
      variables () {
        return {
          slug: this.$route.params.slug
        };
      }
    },

    recommendedPosts: {
      query: getRecommendedPosts,
      update: data => data.postsWithPagination.items,
      skip () {
        // return this.filter === null || this.$route.params.slug === null;
        return this.project === undefined;
      },
      variables () {
        return {
          filter: {
            projectId: { eq: this.project.id }
          }
        };
      }
    },
    areaProjects: {
      query: getAreaProjects,
      update: data => data.projects,
      variables () {
        if (this.project) {
          return {
            condition: {
              address: {
                district: { eq: this.project.address.district },
                city: { eq: this.project.address.city }
              }
            }
          };
        };
      }
    }
  },
  computed: {
    gallery () {
      const items = this.project.images;
      return items.sort(function (x, y) {
        return x.includes('mp4') ? 1 : y.includes('mp4') ? -1 : 0;
      });
    },
    detailInfors () {
      const items = [{ name: 'Giá', content: (this.project.price + ' triệu/m²') }, { name: 'Diện tích', content: (this.project.acreage + ' m²') }, { name: 'Chủ đầu tư', content: this.project.investor.investorName },
        { name: 'Số căn hộ', content: this.project.numberOfApartments }, { name: 'Số tòa', content: this.project.numberOfBuildings }, { name: 'Pháp lý', content: this.project.juridical }];
      this.project.tempProjectInfors.forEach((element) => {
        const tempInfor = { name: element.inforName, content: element.inforContent };
        items.push(tempInfor);
      });
      return items;
    },
    readMoreClasses () {
      return this.readMoreButtonIsActive ? 'h-fit opacity-100 ql-editor' : 'h-60 opacity-60';
    }
  },
  mounted () {
    window.addEventListener('scroll', this.HandleScroll);
  },
  methods: {
    HandleScroll () {
      if (this.$refs.Overview.getBoundingClientRect().y >= 120 && this.$refs.Overview.getBoundingClientRect().y <= 500) {
        this.setFalseTableOfContents();
        this.isTargetingTableOfContents.isTargetingOverview = true;
      } else if (this.$refs.Ground.getBoundingClientRect().y >= 120 && this.$refs.Ground.getBoundingClientRect().y <= 500) {
        this.setFalseTableOfContents();
        this.isTargetingTableOfContents.isTargetingGround = true;
      } else if (this.$refs.Location.getBoundingClientRect().y >= 120 && this.$refs.Location.getBoundingClientRect().y <= 500) {
        this.setFalseTableOfContents();
        this.isTargetingTableOfContents.isTargetingLocation = true;
      } else if (this.$refs.SellAndRent.getBoundingClientRect().y >= 120 && this.$refs.SellAndRent.getBoundingClientRect().y <= 500) {
        this.setFalseTableOfContents();
        this.isTargetingTableOfContents.isTargetingRentAndSell = true;
      }
    },
    setFalseTableOfContents () {
      this.isTargetingTableOfContents.isTargetingOverview = false;
      this.isTargetingTableOfContents.isTargetingGround = false;
      this.isTargetingTableOfContents.isTargetingLocation = false;
      this.isTargetingTableOfContents.isTargetingRentAndSell = false;
    },
    HandleShowDropDownContent () {
      this.isDroppingContent = !this.isDroppingContent;
    },
    ScrollToOverview () {
      const el = this.$refs.Overview;

      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    ScrollToGround () {
      const el = this.$refs.Ground;

      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    ScrollToLocation () {
      const el = this.$refs.Location;

      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    ScrollToSellAndRent () {
      const el = this.$refs.SellAndRent;

      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    setReadMoreActiveState () {
      this.readMoreButtonIsActive = !this.readMoreButtonIsActive;
      if (this.readMoreButtonIsActive === true) {
        this.readMoreContent = 'Thu gọn';
        this.readMoreArrowStyle = 'rotate-arrow-up h-6 w-6';
        this.showReadMoreStyles = 'mt-1.5 text-lg';
        this.hideReadMoreStyles = 'delay-1000';
      } else {
        this.readMoreContent = 'Xem thêm';
        this.readMoreArrowStyle = 'rotate-arrow-down h-6 w-6';
        this.showReadMoreStyles = 'max-h-80 overflow-hidden mt-1.5 text-lg';
        this.hideReadMoreStyles = 'hidden delay-1000';
      }
    }
  }
};
</script>

<style>
.re-properties-frame {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #E5E5E5;
    padding-bottom: 7px;
    margin-bottom:10px;
  }
.re-properties-frame-panel {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid #E5E5E5;
    padding-bottom: 7px;
  }
  .re-properties {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #A3A3A3;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .re-properties-panel {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #A3A3A3;
  }
  .max-w-50 {
    max-width: 50%;
  }
  .re-properties-content {
    font-family: Roboto;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #1C1917;
  }
  .color-505050{
    color: #505050;
  }
  .color-A3A3A3{
    color: #A3A3A3;
  }
  .table-of-content:hover h2{
    color: #1C1917;;
  }
  .table-of-content:hover p{
    color: #1C1917;;
  }
  .sticky-table-of-content{
    position: sticky;
    top: 72px;
    padding-bottom: 8px;
    background-color: white;
  }
  .max-w-60 {
    max-width: 60%;
  }
  .max-w-40 {
    max-width: 40%;
  }
  .active-table-contents{
    color: #1C1917;;
    padding-bottom: 5px;
    border-bottom: 2px solid #16A34A;
  }
  .transition-02s-all{
    transition: all 0.2s;
  }
  .read-more {
  color: #C2410C;
  cursor: pointer;
  transition: all 0.5;
}
.rotate-arrow-up{
  transform: rotate(-180deg);
  transition: all 0.5s;
  color: #C2410C;
}
.rotate-arrow-down{
  transform: rotate(0deg);
  transition: all 0.5s;
  color: #C2410C;
}
.color-999999{
  color: #999999;
}
.color-stone-900{
  color: #1C1917;
}
.font-size-table-of-contents{
  font-size: 16px;
}
.font-size-overview{
  font-size: 18px
}
.font-size-project-ground{
  font-size: 24px
}
.font-size-project-name{
  font-size: 21px;
}

@media only screen and (min-width: 602px) {
  .font-size-table-of-contents{
  font-size: 21px;
}
  .font-size-overview{
  font-size: 28px
}
  .font-size-project-ground{
  font-size: 28px
}
  .font-size-project-name{
  font-size: 32px;
}

}
</style>
