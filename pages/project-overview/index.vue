<template>
  <div class="w-full sm:px-36 px-5 color-stone-900">
    <div>
      <gallery class="inline h-72 w-full sm:hidden" :items="gallery" />
    </div>
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
    <div>
      <gallery class="h-72 w-full sm:inline hidden" :items="gallery" />
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
            Ví trí dự án
          </p>
        </button>
        <button :class="isTargetingTableOfContents.isTargetingLocation ? activeTableContent : tableContentStyles" @click="ScrollToLocation()">
          <h2 class="font-size-table-of-contents font-bold">
            Vị trí
          </h2>
          <p class="text-sm font-medium sm:block hidden">
            Tổng thể về dự án
          </p>
        </button>
        <button :class="isTargetingTableOfContents.isTargetingRentAndSell ? activeTableContent : tableContentStyles" @click="ScrollToSellAndRent()">
          <h2 class="font-size-table-of-contents font-bold">
            Bán và cho thuê
          </h2>
          <p class="text-sm font-medium sm:block hidden">
            Chi tiết dự án
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
        <div class="mt-1.5 text-lg" v-html="project.projectPost.overview" />
      </div>
      <h1 class="font-medium text-lg sm:text-2xl mt-5 sm:mt-6 mb-1 sm:mb-4">
        Vị trí
      </h1>
      <div :class="showReadMoreStyles" v-html="project.projectPost.location" />
      <span :class="hideReadMoreStyles">
        <div class="text-lg" v-html="project.projectPost.location" />
        <h1 class="font-medium text-lg sm:text-2xl mt-5 sm:mt-6 mb-1 sm:mb-4">
          Thiết kế dự án
        </h1>
        <div class="text-sm" v-html="project.projectPost.projectDesign" />
        <h1 class="font-medium text-2xl sm:text-2xl mt-5 sm:mt-6 mb-1 sm:mb-4">
          Tiện ích
        </h1>
        <div class="text-lg" v-html="project.projectPost.utilitySection" />
        <h1 ref="SellAndRent" class="font-medium text-2xl sm:text-2xl mt-5 sm:mt-6 mb-1 sm:mb-4" style="scroll-margin-top: 135px">
          Giá bán và thuê
        </h1>
        <div class="text-lg" v-html="project.projectPost.rentAndSellPrice" />
      </span>
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
        <div class="grid md:grid-cols-2 grid-cols-1 md:gap-6 h-auto">
          <div class="block">
            <p class="re-properties-frame-panel">
              <span class="re-properties-panel flex w-1/2">Giá</span>
              <span class="re-properties-content max-w-50 "> {{ project.price }} triệu/m² </span>
            </p>
            <p class="re-properties-frame-panel">
              <span class="re-properties-panel flex w-1/2">Diện tích</span>
              <span class="re-properties-content max-w-50 "> {{ project.acreage }} ha </span>
            </p>
            <p class="re-properties-frame-panel">
              <span class="re-properties-panel flex w-1/2">Chủ đầu tư</span>
              <span class="re-properties-content max-w-50 "> {{ project.investor.investorName }}</span>
            </p>
            <p class="re-properties-frame-panel">
              <span class="re-properties-panel flex w-1/2">Thời điểm hoàn thành</span>
              <span class="re-properties-content max-w-50 "> {{ project.completionTime }}</span>
            </p>
            <p class="re-properties-frame-panel">
              <span class="re-properties-panel flex w-1/2">Diện tích xây dựng</span>
              <span class="re-properties-content max-w-50 "> {{ project.constructionAcreage }}m²</span>
            </p>
            <p class="re-properties-frame-panel">
              <span class="re-properties-panel flex w-1/2">Đơn vị phân phối</span>
              <span class="re-properties-content max-w-50"> {{ project.distributionUnit }}</span>
            </p>
          </div>
          <div class="block">
            <p class="re-properties-frame-panel">
              <span class="re-properties-panel flex w-1/2">Số căn hộ</span>
              <span class="re-properties-content max-w-50 "> {{ project.numberOfApartments }} căn </span>
            </p>
            <p class="re-properties-frame-panel">
              <span class="re-properties-panel flex w-1/2">Số tòa</span>
              <span class="re-properties-content max-w-50 max-w-50 "> {{ project.numberOfBuildings }}</span>
            </p>
            <p class="re-properties-frame-panel">
              <span class="re-properties-panel flex w-1/2">Pháp lý</span>
              <span class="re-properties-content max-w-50 "> {{ project.juridical }}</span>
            </p>
            <p class="re-properties-frame-panel">
              <span class="re-properties-panel flex w-1/2">Quy mô</span>
              <span class="re-properties-content max-w-50 "> {{ project.scale }}</span>
            </p>
            <p class="re-properties-frame-panel">
              <span class="re-properties-panel flex w-1/2">Mật độ xây dựng</span>
              <span class="re-properties-content max-w-50"> {{ project.densityOfConstruction }}% </span>
            </p>
          </div>
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
    <div class="divide-y w-full border-b-2 mt-8 mb-12 hidden sm:block" />
    <sell-and-rent-recommended v-if="recommendedPosts !== undefined && recommendedPosts.length > 0" class="mb-4" :posts="recommendedPosts" />
    <near-area-recommended v-if="areaProjects !== undefined && areaProjects.length > 0" class="mb-4" :projects="areaProjects" />
  </div>
</template>

<script>
// eslint-disable-next-line vue/component-tags-order
import { expandPanel } from 'vue-expand-panel';
import { gql } from 'graphql-tag';
import SellAndRentRecommended from './components/sell-and-rent-recommended.vue';
import NearAreaRecommended from './components/near-area-recommended.vue';
// import styles
import './css/vue-expander.css';

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
  components: { expandPanel, SellAndRentRecommended, NearAreaRecommended },
  apollo: {
    recommendedPosts: {
      query: getRecommendedPosts,
      update: data => data.postsWithPagination.items,
      variables () {
        return {
          filter: {
            projectId: { eq: '61c966dd6e47abd592a5c166' }
          }
        };
      }
    },

    areaProjects: {
      query: getAreaProjects,
      update: data => data.projects,
      variables () {
        return {
          condition: {
            address: {
              district: { eq: 'Thủ Đức' },
              city: { eq: 'Hồ Chí Minh' }
            }
          }
        };
      }
    },

    project: {
      query () {
        return gql`
              query GetProjectOverview {
                projects(where: { pageInfors: { some: { slug: { eq: "can-ho-trinh-quoc-phong" }}} }) {
                  id
                  projectName
                  address {
                    street
                    district
                    city
                    googleMapLocation
                  }
                  images
                  sEOContent
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
                  projectPost{
                    overview
                    location
                    projectDesign
                    utilitySection
                    rentAndSellPrice
                  }
                  completionTime
                  constructionAcreage
                  masterPlan
                  distributionUnit
                  scale
                  densityOfConstruction
                  utilities{
                    locationUtilities
                    internalUtilities
                    listOfUtilities
                  }
                }
            }`;
      },
      update (data) {
        const project = data.projects[0];
        return project;
      }
    }
  },
  data () {
    return {
      // dữ liệt trang tổng quan dự án
      post: {
        gallery: [
          'apartment-resource/4a29f3dc-afa2-4aee-aa91-cbce3bc49ee5/17-02-2022_0924/image/93a3b5f6ae3a62643b2b21.jpg'
        ]
      },
      isDroppingContent: false,
      readMoreContent: 'Xem thêm',
      showReadMoreStyles: 'opacity-90 overflow-hidden max-h-6 text-lg',
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
      readMoreButtonIsActive: false,
      tempContent: '<p>Ngoài tin đăng cho thuê căn hộ theo dự án thì tại Thuecanho123.com cũng sở hữu lượng tin đăng&nbsp;<strong>cho thuê chung cư mini</strong>&nbsp;khủng cả về số lượng và chất lượng, tha hồ để các bạn lựa chọn.&nbsp;</p><p>Giá cho thuê căn hộ chung cư mini giao động từ 5 triệu - 7 triệu, diện tích từ 25-40m2, thông thường sẽ được chủ nhà trang bị đầy đủ nội thất cơ bản đến cao cấp, bạn chỉ việc vào ở ngay. Đối tượng phù hợp loại hình này thường là các bạn đã đi làm vài năm có thu nhập ổn định hoặc các&nbsp;cặp vợ chồng trẻ mới cưới chưa có khả năng mua nhà thì việc thuê căn hộ mini này là một giải pháp tốt giúp tiết kiệm vừa đảm bảo cuộc sống tương đối thoải mái.</p><p><br></p><p><img src=\"https://tch123.cdn.static123.com/images/thumbs/900x600/fit/2021/12/01/cho-thue-chung-cu-mini_1638291849.jpg\" alt=\"cho thuê chung cư mini\">'
    };
  },
  computed: {
    gallery () {
      const items = this.post.gallery.map(i => 'https://maico-hub-record.ss-hn-1.bizflycloud.vn/' + i);
      return items.sort(function (x, y) {
        return x.includes('mp4') ? 1 : y.includes('mp4') ? -1 : 0;
      });
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
        this.showReadMoreStyles = 'hidden';
        this.hideReadMoreStyles = 'delay-1000';
      } else {
        this.readMoreContent = 'Xem thêm';
        this.readMoreArrowStyle = 'rotate-arrow-down h-6 w-6';
        this.showReadMoreStyles = 'opacity-90 overflow-hidden max-h-6 text-lg';
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
    align-items: center;
    border-bottom: 1px solid #E5E5E5;
    padding-bottom: 7px;
    margin-bottom:10px;
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
    margin-top: 5px;
    margin-bottom: 5px;
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
  .drop-down-content{

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
