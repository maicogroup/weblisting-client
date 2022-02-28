<template>
  <div class="w-full max-w-screen-xl px-4">
    <div class="z-10 w-full fixed left-0 top-after-header flex space-x-4 bg-white shadow-sm px-4">
      <div class="double-button my-4 flex">
        <button :class="`text-base py-2 px-4 border rounded-l-md ${sellButtonClasses}`" @click="setSellButtonActiveState(true)">
          Bán
        </button>
        <button :class="`text-base whitespace-nowrap py-2 px-4 border rounded-r-md ${rentButtonClasses}`" @click="setSellButtonActiveState(false)">
          Cho thuê
        </button>
      </div>

      <div class="relative my-4">
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
        <input type="search" class="border py-2 pl-10 pr-2 h-full rounded-md bg-white focus:text-gray-900 focus:outline-none" placeholder="Tìm kiếm...">
      </div>

      <div class="flex justify-between grow">
        <type-filter-dropdown :selected-option="inputFilter.type" @optionchanged="handleTypeFilterChanged" />
        <location-ftiler-dropdown :selected-option="inputFilter.location" @optionchanged="handleLocationFilterChanged" />
        <project-filter-dropdown :selected-option="inputFilter.project" @optionchanged="handleProjectFilterChanged" />
        <price-filter-dropdown :selected-option="inputFilter.priceRange" @optionchanged="handlePriceFilterChanged" />
        <acreage-filter-dropdown :selected-option="inputFilter.acreageRange" @optionchanged="handleAcreageFilterChanged" />
        <direction-filter-dropdown :selected-option="inputFilter.directions" @optionchanged="handleDirectionFilterChanged" />
        <bedroom-filter-dropdown :selected-option="inputFilter.bedroomOptions" @optionchanged="handleBedroomFilterChanged" />
      </div>

      <button class="whitespace-nowrap ml-12 rounded-md px-6 bg-red-600 hover:bg-red-700 font-semibold text-white my-4" @click="handleFilterButtonPressed">
        Tìm kiếm
      </button>
    </div>
    <div class="filter-bar-blank-space" />
    <ProjectHeader v-if="showIfPostsOfOneProject" :project="project" />
    <Divider v-if="showIfPostsOfOneProject" class="mt-7 mb-1.5" />
    <div class="flex justify-between w-full">
      <ListPost v-if="waitTillProjectIsDetermined" class="left-0" :filter="filter" />
      <div class="ml-9 mt-14 hidden lg:block">
        <ContactInfor />
        <div class="border mt-4 p-4">
          <p class="font-bold mb-2">
            Xem theo giá
          </p>
          <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: undefined, gtln: 3})">
            Dưới 3 triệu
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 3, gtln: 5})">
            Từ 3 - 5 triệu
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 5, gtln: 7})">
            Từ 5 - 7 triệu
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 7, gtln: 10})">
            Từ 7 - 10 triệu
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 10, gtln: 15})">
            Từ 10 - 15 triệu
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 15, gtln: 20})">
            Từ 15 - 20 triệu
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 20, gtln: 30})">
            Từ 20 - 30 triệu
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 30, gtln: undefined})">
            Trên 30 triệu
          </quick-filter-button>
        </div>

        <div class="border mt-4 p-4">
          <p class="font-bold mb-2">
            Xem theo diện tích
          </p>
          <quick-filter-button @click="updateUrlQueryAndNavigate({dtnn: undefined, dtln: 30})">
            Dưới 30 m²
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({dtnn: 30, dtln: 50})">
            Từ 30 - 50 m²
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({dtnn: 50, dtln: 70})">
            Từ 50 - 70 m²
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({dtnn: 70, dtln: 100})">
            Từ 70 - 100 m²
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({dtnn: 100, dtln: undefined})">
            Trên 100 m²
          </quick-filter-button>
        </div>

        <div class="border mt-4 p-4">
          <p class="font-bold mb-2">
            Xem theo phòng ngủ
          </p>
          <quick-filter-button @click="updateUrlQueryAndNavigate({slpn: ['1']})">
            1 phòng ngủ
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({slpn: ['2']})">
            2 phòng ngủ
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({slpn: ['3']})">
            3 phòng ngủ
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({slpn: ['4']})">
            4 phòng ngủ
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({slpn: ['5+']})">
            5+ phòng ngủ
          </quick-filter-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';

import ProjectHeader from './components/ProjectHeader.vue';
import ListPost from './components/ListPost.vue';
import ContactInfor from './components/ContactInfor.vue';
import LocationFtilerDropdown from './components/filtering/location-filter-dropdown.vue';
import ProjectFilterDropdown from './components/filtering/project-filter-dropdown.vue';
import DirectionFilterDropdown from './components/filtering/direction-filter-dropdown.vue';
import TypeFilterDropdown from './components/filtering/type-filter-dropdown.vue';
import PriceFilterDropdown from './components/filtering/price-filter-dropdown.vue';
import AcreageFilterDropdown from './components/filtering/acreage-filter-dropdown.vue';
import BedroomFilterDropdown from './components/filtering/bedroom-filter-dropdown.vue';
import QuickFilterButton from './components/quick-filter-button.vue';
import Divider from '~/components/Divider.vue';

export default {
  name: 'PostList',
  components: { ProjectHeader, ListPost, ContactInfor, Divider, LocationFtilerDropdown, ProjectFilterDropdown, DirectionFilterDropdown, TypeFilterDropdown, PriceFilterDropdown, AcreageFilterDropdown, BedroomFilterDropdown, QuickFilterButton },
  data () {
    return {
      // filter dùng để lọc
      filter: null,
      sellButtonIsActive: false,
      // filter đang được người dùng chỉnh sửa, chuẩn bị dùng để lọc
      inputFilter: {},
      searchButtonPressed: false
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

  computed: {
    waitTillProjectIsDetermined () {
      if (this.$route.params.slug) {
        return this.filter && this.filter.project?.id;
      }

      return this.filter;
    },

    showIfPostsOfOneProject () {
      return this.$route.params.slug !== null && this.project !== null;
    },

    sellButtonClasses () {
      return this.sellButtonIsActive ? 'bg-gray-200' : 'hover:bg-gray-100';
    },

    rentButtonClasses () {
      return !this.sellButtonIsActive ? 'bg-gray-200' : 'hover:bg-gray-100';
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

    if (this.$route.query.demand === 'Bán') {
      this.setSellButtonActiveState(true);
    } else {
      this.setSellButtonActiveState(false);
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

        if (this.$route.query.demand === 'Bán') {
          this.setSellButtonActiveState(true);
        } else {
          this.setSellButtonActiveState(false);
        }
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
                pageInfors{
                  title
                  slug
                  metaDescription
                }
              }
          }`;
      },

      update (data) {
        const project = data.projects[0];

        this.filter = { ...this.filter, project: { pageInfor: { slug: this.$route.params.slug }, id: project.id, projectName: project.projectName } };
        this.inputFilter = { ...this.filter };

        return project;
      },

      skip () {
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
    setSellButtonActiveState (state) {
      this.sellButtonIsActive = state;
      this.inputFilter.demand = this.sellButtonIsActive ? 'Bán' : 'Cho Thuê';
    },

    createFilterFromUrl () {
      const filter = {};
      const query = this.$route.query;

      filter.demand = query.demand;
      filter.type = query.loai;

      if (query.tp || query.quan) {
        filter.location = {
          city: query.tp,
          district: query.quan
        };
      }

      if (query.gtnn || query.gtln) {
        const parsedPriceFrom = parseInt(query.gtnn);
        const parsedPriceTo = parseInt(query.gtln);

        filter.priceRange = {
          from: isNaN(parsedPriceFrom) ? null : parsedPriceFrom,
          to: isNaN(parsedPriceTo) ? null : parsedPriceTo
        };
      }

      if (query.dtnn || query.dtln) {
        const parsedAcreageFrom = parseInt(query.dtnn);
        const parsedAcreageTo = parseInt(query.dtln);

        filter.acreageRange = {
          from: isNaN(parsedAcreageFrom) ? null : parsedAcreageFrom,
          to: isNaN(parsedAcreageTo) ? null : parsedAcreageTo
        };
      }

      if (query.huong) {
        filter.directions = Array.isArray(query.huong) ? query.huong : [query.huong];
      }

      if (query.slpn) {
        filter.bedroomOptions = Array.isArray(query.slpn) ? query.slpn : [query.slpn];
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

      let path = '/danh-sach-can-ho';
      if (this.filter.project) {
        path = path + '/' + this.filter.project.pageInfor.slug;
      }

      const query = {};

      if (this.filter.demand) {
        query.demand = this.filter.demand;
      }

      if (this.filter.type) {
        query.loai = this.filter.type;
      }

      if (this.filter.location) {
        const location = this.filter.location;
        query.tp = location.city;
        query.quan = location.district;
      }

      if (this.filter.priceRange) {
        const { from, to } = this.filter.priceRange;

        if (from) {
          query.gtnn = from;
        }

        if (to) {
          query.gtln = to;
        }
      }

      if (this.filter.acreageRange) {
        const { from, to } = this.filter.acreageRange;

        if (from) {
          query.dtnn = from;
        }

        if (to) {
          query.dtln = to;
        }
      }

      if (this.filter.directions) {
        query.huong = this.filter.directions;
      }

      if (this.filter.bedroomOptions) {
        query.slpn = this.filter.bedroomOptions;
      }

      this.$router.push({ path, query });
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
.grow {
  flex-grow: 1;
}

.filter-bar-blank-space {
  height: 42px;
}

.top-after-header {
  top: 73px;
}

.double-button {
  font-size: 0;
}
</style>
