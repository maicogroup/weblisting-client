<template>
  <div class="w-full max-w-screen-xl px-4">
    <div class="z-10 w-full fixed left-0 top-after-header hidden md:flex space-x-4 bg-white shadow-sm px-4">
      <div class="double-button my-4 flex">
        <button :class="`text-base py-2 px-4 border rounded-l-md ${sellButtonClasses}`" @click="setFilterDemandOption('Bán')">
          Bán
        </button>
        <button :class="`text-base whitespace-nowrap py-2 px-4 border rounded-r-md ${rentButtonClasses}`" @click="setFilterDemandOption('Cho Thuê')">
          Cho thuê
        </button>
      </div>

      <div class="hidden xl:block filter-search-bar relative my-4">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button class="p-1 text-gray-400 focus:outline-none focus:shadow-outline">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </span>
        <input type="search" class="w-full border py-2 pl-10 pr-2 h-full rounded-md bg-white focus:text-gray-900 focus:outline-none" placeholder="Tìm kiếm...">
      </div>

      <div class="flex justify-between grow">
        <type-filter-dropdown :selected-option="inputFilter.type" @optionchanged="handleTypeFilterChanged" />
        <location-ftiler-dropdown :selected-option="inputFilter.location" @optionchanged="handleLocationFilterChanged" />
        <project-filter-dropdown :selected-option="inputFilter.project" @optionchanged="handleProjectFilterChanged" />
        <price-filter-dropdown :selected-option="inputFilter.priceRange" :demand="inputFilter.demand" @optionchanged="handlePriceFilterChanged" />
        <acreage-filter-dropdown :selected-option="inputFilter.acreageRange" @optionchanged="handleAcreageFilterChanged" />
        <direction-filter-dropdown :selected-option="inputFilter.directions" @optionchanged="handleDirectionFilterChanged" />
        <bedroom-filter-dropdown :selected-option="inputFilter.bedroomOptions" @optionchanged="handleBedroomFilterChanged" />
      </div>

      <button class="my-auto text-gray-600 hover:text-gray-800 px-2 h-fit" @click="resetFilter">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      <button class="whitespace-nowrap ml-12 rounded-md px-6 bg-green-600 hover:bg-green-700 font-semibold text-white my-4" @click="handleFilterButtonPressed">
        Tìm kiếm
      </button>
    </div>
    <div class="relative my-4">
      <div class="w-full block md:hidden" @click="openCloseMobileFilter">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button class="p-1 text-gray-400 focus:outline-none focus:shadow-outline">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <h4 class="focus:text-gray-900 focus:outline-none text-gray-400">Tìm kiếm</h4>
        </span>
        <input type="button" class="w-full border py-2 pl-10 pr-2 h-full rounded-md" placeholder="Tìm kiếm...">
      </div>
    </div>
    <!-- <div class="filter-bar-blank-space hidden md:block" /> -->
    <!-- <ProjectHeader v-if="showIfPostsOfOneProject" :project="project" /> -->
    <Divider v-if="showIfPostsOfOneProject" class="mt-7 mb-1.5" />
    <div class="flex justify-between w-full">
      <ListPost v-if="waitTillProjectIsDetermined" class="left-0" :filter="filter" :heading="this.heading" />
      <div class="ml-9 mt-14 hidden lg:block">
        <ContactInfor />
        <div class="border mt-4 p-4 rounded">
          <p class="font-bold mb-2">
            Xem theo giá
          </p>
          <div v-if="filter.demand === 'Cho Thuê'">
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: undefined, priceTo: 3})">
              Dưới 3 triệu
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: 3, priceTo: 5})">
              Từ 3 - 5 triệu
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: 5, priceTo: 7})">
              Từ 5 - 7 triệu
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: 7, priceTo: 10})">
              Từ 7 - 10 triệu
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: 10, priceTo: 15})">
              Từ 10 - 15 triệu
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: 15, priceTo: 20})">
              Từ 15 - 20 triệu
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: 20, priceTo: 30})">
              Từ 20 - 30 triệu
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: 30, priceTo: undefined})">
              Trên 30 triệu
            </quick-filter-button>
          </div>
          <div v-else>
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: undefined, priceTo: 1})">
              Dưới 1 tỷ
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: 1, priceTo: 2})">
              Từ 1 tỷ - đến 2 tỷ
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: 2, priceTo: 3})">
              Từ 2 tỷ - đến 3 tỷ
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: 3, priceTo: 5})">
              Từ 3 tỷ - đến 5 tỷ
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: 5, priceTo: 7})">
              Từ 5 tỷ - đến 7 tỷ
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: 7, priceTo: 10})">
              Từ 7 tỷ - đến 10 tỷ
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: 10, priceTo: 20})">
              Từ 10 tỷ - đến 20 tỷ
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({priceFrom: 20, priceTo: undefined})">
              Trên 20 tỷ
            </quick-filter-button>
          </div>
        </div>

        <div class="border mt-4 p-4 rounded">
          <p class="font-bold mb-2">
            Xem theo diện tích
          </p>
          <quick-filter-button @click="updateUrlQueryAndNavigate({acreageFrom: undefined, acreageTo: 30})">
            Dưới 30 m²
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({acreageFrom: 30, acreageTo: 50})">
            Từ 30 - 50 m²
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({acreageFrom: 50, acreageTo: 70})">
            Từ 50 - 70 m²
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({acreageFrom: 70, acreageTo: 100})">
            Từ 70 - 100 m²
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({acreageFrom: 100, acreageTo: undefined})">
            Trên 100 m²
          </quick-filter-button>
        </div>

        <div class="border mt-4 p-4 rounded">
          <p class="font-bold mb-2">
            Xem theo phòng ngủ
          </p>
          <quick-filter-button @click="updateUrlQueryAndNavigate({bedroomOptions: ['1']})">
            1 phòng ngủ
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({bedroomOptions: ['2']})">
            2 phòng ngủ
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({bedroomOptions: ['3']})">
            3 phòng ngủ
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({bedroomOptions: ['4']})">
            4 phòng ngủ
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({bedroomOptions: ['5+']})">
            5+ phòng ngủ
          </quick-filter-button>
        </div>
      </div>
    </div>
    <div v-if="project && showIfPostsOfOneProject && project.sEOContent" class="rounded-lg border mr-auto w-4/5 ml-auto mt-9 mb-5 px-6 h-fit delay-3000">
      <div
        :class="`overflow-hidden text-ellipsis mt-5 mx-2   ${sEOContentClasses}` "
        v-html="project.sEOContent"
      />
      <p class="text-center font-bold read-more my-4" @click="setSEOContentActiveState()">
        {{ readMoreContent }}
      </p>
    </div>
    <div
      v-if="filterResponsive == true"
      class="no-scrollbar overflow-auto fixed inset-0 h-full w-full z-30 bg-white opacity-100"
    >
      <div class="flex justify-between mt-5 items-center mb-4">
        <h4 class="mr-auto ml-auto text-base">
          Tìm kiếm bất động sản
        </h4>
        <div class="absolute right-3" @click="openCloseMobileFilter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f71e1e"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
        </div>
      </div>
      <div class="relative mx-2.5">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button class="p-1 text-gray-400 focus:outline-none focus:shadow-outline">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </span>
        <input type="search" class="w-full border py-2 pl-10 pr-2 h-11 rounded-md bg-white focus:text-gray-900 focus:outline-none" placeholder="Tìm kiếm...">
      </div>
      <div class="double-button my-4 flex mx-2.5">
        <button :class="`w-1/2 grow text-base py-2 px-4 border rounded-l-md ${sellButtonClasses}`" @click="setFilterDemandOption('Bán')">
          Bán
        </button>
        <button :class="`w-1/2 grow text-base whitespace-nowrap py-2 px-4 border rounded-r-md ${rentButtonClasses}`" @click="setFilterDemandOption('Cho Thuê')">
          Cho thuê
        </button>
      </div>
      <div class="mx-2.5">
        <type-filter-option :selected-option="inputFilter.type" @optionchanged="handleTypeFilterChanged" />

        <location-filter-option :selected-option="inputFilter.location" @optionchanged="handleLocationFilterChanged" />

        <price-filter-option :selected-option="inputFilter.priceRange" :demand="inputFilter.demand" @optionchanged="handlePriceFilterChanged" />

        <acreage-filter-option :selected-option="inputFilter.acreageRange" @optionchanged="handleAcreageFilterChanged" />

        <project-filter-option :selected-option="inputFilter.project" @optionchanged="handleProjectFilterChanged" />

        <direction-filter-options :selected-option="inputFilter.directions" @optionchanged="handleDirectionFilterChanged" />

        <bedroom-filter-options :selected-option="inputFilter.bedroomOptions" @optionchanged="handleBedroomFilterChanged" />
      </div>
      <div class="mx-2.5 flex space-x-2">
        <button class="px-6 py-2 shrink-0 border rounded-md my-4 hover:bg-gray-100" @click="resetFilter">
          Đặt lại
        </button>
        <button class="grow whitespace-nowrap rounded-md px-6 py-2 bg-green-500 hover:bg-green-700 text-white my-4" @click="handleFilterButtonPressed">
          Tìm kiếm
        </button>
      </div>

      <!-- <p class="mb-4">
        Bạn phải chọn <span><p class="text-sky-500">Khu vực</p></span> trước
      </p> -->
    </div>

    <!-- chon khu vuc mobile -->
    
  </div>
</template>

<script>
import { gql } from 'graphql-tag';

import { marked } from 'marked';
import ProjectHeader from './components/project-header.vue';
import ProjectThumbnail from './components/project-thumbnail.vue';
import ListPost from './components/list-post.vue';
import ContactInfor from './components/contract-infor.vue';
import LocationFtilerDropdown from './components/filtering/location-filter-dropdown.vue';
import ProjectFilterDropdown from './components/filtering/project-filter-dropdown.vue';
import DirectionFilterDropdown from './components/filtering/direction-filter-dropdown.vue';
import TypeFilterDropdown from './components/filtering/type-filter-dropdown.vue';
import PriceFilterDropdown from './components/filtering/price-filter-dropdown.vue';
import AcreageFilterDropdown from './components/filtering/acreage-filter-dropdown.vue';
import BedroomFilterDropdown from './components/filtering/bedroom-filter-dropdown.vue';
import QuickFilterButton from './components/quick-filter-button.vue';
import TypeFilterOption from './components/responsive-filtering/type-filter-option.vue';
import LocationFilterOption from './components/responsive-filtering/location-filter-option.vue';
import PriceFilterOption from './components/responsive-filtering/price-filter-option.vue';
import AcreageFilterOption from './components/responsive-filtering/acreage-filter-option.vue';
import DirectionFilterOptions from './components/responsive-filtering/direction-filter-options.vue';
import ProjectFilterOption from './components/responsive-filtering/project-filter-option.vue';
import BedroomFilterOptions from './components/responsive-filtering/bedroom-filter-options.vue';
import Divider from '~/components/Divider.vue';

export default {
  name: 'PostList',
  components: {
    ProjectHeader,
    ListPost,
    ContactInfor,
    Divider,
    LocationFtilerDropdown,
    ProjectFilterDropdown,
    DirectionFilterDropdown,
    TypeFilterDropdown,
    PriceFilterDropdown,
    AcreageFilterDropdown,
    BedroomFilterDropdown,
    QuickFilterButton,
    TypeFilterOption,
    LocationFilterOption,
    PriceFilterOption,
    AcreageFilterOption,
    ProjectFilterOption,
    DirectionFilterOptions,
    BedroomFilterOptions
  },
  data () {
    return {
      // filter dùng để lọc
      filter: null,
      heading: null,
      readMoreButtonIsActive: false,
      // filter đang được người dùng chỉnh sửa, chuẩn bị dùng để lọc
      inputFilter: {},
      searchButtonPressed: false,
      tempSEOContent: '**Hello World**',
      readMoreContent: 'Xem thêm',
      filterResponsive: false,
      isShowApartmentType: false,
      isShowArea: false,
      isShowDistrict: false,
      isShowPriceRange: false,
      isShowAcreage: false,
      isShowProject: false,
      isShowDirection: false,
      isShowRoomOption: false
    };
  },

  head () {
    let title;
    if (this.$route.params.slug) {
      title = this.project?.pageInfors.find(c => c.slug.includes(this.$route.params.slug)).title;
    } else {
      const type = this.filter.type ?? 'căn hộ';
      const demand = this.filter.demand;

      let price = '';
      if (this.filter.priceRange) {
        const unit = demand === 'Bán' ? 'tỷ' : 'triệu';
        const { from, to } = this.filter.priceRange;
        if (from && to) {
          price = `, giá từ ${from} ${unit} đến ${to} ${unit}`;
        } else if (from) {
          price = `, giá trên ${from} ${unit}`;
        } else {
          price = `, giá dưới ${to} ${unit}`;
        }
      }

      let acreage = '';
      if (this.filter.acreageRange) {
        const { from, to } = this.filter.acreageRange;
        if (from && to) {
          acreage = `, diện tích từ ${from} m² đến ${to} m²`;
        } else if (from) {
          acreage = `, diện tích trên ${from} m²`;
        } else {
          acreage = `, diện tích dưới ${to} m²`;
        }
      }

      title = `${demand} sản phẩm ${type}${price}${acreage}`;
    }
    this.heading = title;

    return {
      title,
      meta: [{
        hid: 'description',
        name: 'description',
        content: this.project?.pageInfors.find(c => c.slug.includes(this.$route.params.slug)).metaDescription
      }]
    };
  },

  computed: {
    waitTillProjectIsDetermined () {
      if (this.$route.params.slug) {
        return this.filter?.project?.id !== null;
      }

      return this.filter !== null;
    },
    // eslint-disable-next-line vue/return-in-computed-property
    markdownToHtml () {
      return marked(this.tempSEOContent);
    },
    showIfPostsOfOneProject () {
      return this.$route.params.slug !== undefined;
    },

    sellButtonClasses () {
      return this.inputFilter.demand === 'Bán' ? 'bg-gray-200' : 'hover:bg-gray-100';
    },

    rentButtonClasses () {
      return this.inputFilter.demand !== 'Bán' ? 'bg-gray-200' : 'hover:bg-gray-100';
    },

    sEOContentClasses () {
      return this.readMoreButtonIsActive ? 'h-fit opacity-100 ql-editor' : 'h-60 opacity-60';
    }
  },

  created () {
    if (process.server) {
      // không rõ tại sao nhưng server created sẽ đc gọi trước apollo
      this.filter = this.createFilterFromUrl();
      this.inputFilter = { ...this.filter };
    } else {
      // còn bên client thì ngược lại: apollo đc gọi trước created
      this.filter = { ...this.createFilterFromUrl(), ...this.filter };
      this.inputFilter = { ...this.filter };
    }

    this.$watch(
      () => this.$route.params,
      (param, prevParam) => {
        if (param.slug !== prevParam.slug && param.slug !== null) {
          this.$apollo.queries.project.refetch({ slug: param.slug });
        }

        const newFilter = this.createFilterFromUrl();
        if (param.slug === prevParam.slug && param.slug !== null) {
          // do thông tin project sẽ không bị load lại nên lấy thông tin project cũ
          newFilter.project = this.filter.project;
        }

        this.filter = newFilter;
        this.inputFilter = { ...newFilter };
      }
    );
  },

  apollo: {
    project: {
      query () {
        return gql`
              query GetProjects($slug: String!) {
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
                  sEOContent
                  pageInfors{
                    title
                    slug
                    metaDescription
                  }
                }
            }`;
      },

      update (data) {
        if (data.projects.length === 0) {
          this.$router.push({ path: '/' }).catch(() => {});
          return;
        }

        const project = data.projects[0];

        this.filter = { ...this.filter, project: { pageInfor: { slug: this.$route.params.slug }, id: project.id, projectName: project.projectName } };
        this.inputFilter = { ...this.filter };

        return project;
      },

      skip () {
        // return this.filter === null || this.$route.params.slug === null;
        return this.$route.params.slug === undefined;
      },

      variables () {
        return {
          slug: this.$route.params.slug
        };
      }
    }
  },

  methods: {

    setSEOContentActiveState () {
      this.readMoreButtonIsActive = !this.readMoreButtonIsActive;
      if (this.readMoreButtonIsActive === true) {
        this.readMoreContent = 'Thu gọn';
      } else {
        this.readMoreContent = 'Xem thêm';
      }
    },

    setFilterDemandOption (option) {
      this.inputFilter.demand = option;
    },

    resetFilter () {
      this.inputFilter = { demand: 'Cho Thuê' };
    },

    openCloseMobileFilter () {
      this.filterResponsive = !this.filterResponsive;
    },

    createFilterFromUrl () {
      const filter = {};
      const query = this.$route.query;
      filter.demand = query.demand ?? 'Cho Thuê';
      filter.type = query.type;
      if (query.city || query.district) {
        filter.location = {
          city: query.city,
          district: query.district
        };
      }
      if (query.priceFrom || query.priceTo) {
        const parsedPriceFrom = parseInt(query.priceFrom);
        const parsedPriceTo = parseInt(query.priceTo);
        filter.priceRange = {
          from: isNaN(parsedPriceFrom) ? null : parsedPriceFrom,
          to: isNaN(parsedPriceTo) ? null : parsedPriceTo
        };
      }
      if (query.acreageFrom || query.acreageTo) {
        const parsedAcreageFrom = parseInt(query.acreageFrom);
        const parsedAcreageTo = parseInt(query.acreageTo);
        filter.acreageRange = {
          from: isNaN(parsedAcreageFrom) ? null : parsedAcreageFrom,
          to: isNaN(parsedAcreageTo) ? null : parsedAcreageTo
        };
      }
      if (query.directions) {
        filter.directions = Array.isArray(query.directions) ? query.directions : [query.directions];
      }
      if (query.bedroomOptions) {
        filter.bedroomOptions = Array.isArray(query.bedroomOptions) ? query.bedroomOptions : [query.bedroomOptions];
      }
      return filter;
    },

    handleTypeFilterChanged (type) {
      this.inputFilter = { ...this.inputFilter, type };
    },

    handleLocationFilterChanged (location) {
      this.inputFilter = { ...this.inputFilter, location };
    },

    handleProjectFilterChanged (project) {
      this.inputFilter = { ...this.inputFilter, project };
    },

    handlePriceFilterChanged (priceRange) {
      this.inputFilter = { ...this.inputFilter, priceRange };
    },

    handleAcreageFilterChanged (acreageRange) {
      this.inputFilter = { ...this.inputFilter, acreageRange };
    },

    handleDirectionFilterChanged (directions) {
      this.inputFilter = { ...this.inputFilter, directions };
    },

    handleBedroomFilterChanged (bedroomOptions) {
      this.inputFilter = { ...this.inputFilter, bedroomOptions };
    },

    handleFilterButtonPressed () {
      this.searchButtonPressed = true;
      this.filter = { ...this.inputFilter };
      this.filterResponsive = false;
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
    },

    /** các query được đưa vào sẽ dùng để sửa giá trị của các query hiện tại hoặc thêm query mới cho url */
    updateUrlQueryAndNavigate (query) {
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, ...query } })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.filter-bar-blank-space {
  height: 42px;
}

.filter-search-bar {
  min-width: 8rem;
  max-width: 12rem;
}

.top-after-header {
  top: 73px;
}

.double-button {
  font-size: 0;
}

.read-more {
  color: #408b54f2;
  cursor: pointer;
  transition: all 0.5;
}

.read-more:hover {
  color: #a1e7b4f2;
  text-decoration: underline;
}

.delay-3000 {
  transition-delay: 3s;
}

.bg-black-73{
  background: #000000BA;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>
