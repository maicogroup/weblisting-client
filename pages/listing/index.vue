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
        <type-filter-dropdown @optionchanged="handleTypeFilterChanged" />
        <location-ftiler-dropdown @optionchanged="handleLocationFilterChanged" />

        <project-filter-dropdown v-if="filter.project" :selected-option="filter.project" @optionchanged="handleProjectFilterChanged" />
        <project-filter-dropdown v-else @optionchanged="handleProjectFilterChanged" />

        <price-filter-dropdown @optionchanged="handlePriceFilterChanged" />
        <acreage-filter-dropdown @optionchanged="handleAcreageFilterChanged" />
        <direction-filter-dropdown @optionchanged="handleDirectionFilterChanged" />
        <bedroom-filter-dropdown @optionchanged="handleBedroomFilterChanged" />
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
      <ContactInfor class="lg:ml-9 hidden lg:flex lg:flex-col mt-14" />
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
import Divider from '~/components/Divider.vue';

export default {
  name: 'PostList',
  components: { ProjectHeader, ListPost, ContactInfor, Divider, LocationFtilerDropdown, ProjectFilterDropdown, DirectionFilterDropdown, TypeFilterDropdown, PriceFilterDropdown, AcreageFilterDropdown, BedroomFilterDropdown },
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
        return this.filter?.project?.id !== null;
      }

      return this.filter !== null;
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
    this.filter = this.createFilterFromUrl();

    this.$watch(
      () => this.$route.params,
      (param, prevParam) => {
        if (param.slug !== prevParam.slug && param.slug !== null) {
          this.$apollo.queries.project.refetch({ slug: param.slug });
        }
        this.filter = this.createFilterFromUrl();
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

        this.filter = { ...this.filter, project: { slug: this.$route.params.slug, id: project.id, projectName: project.projectName } };
        return project;
      },

      skip () {
        return this.filter === null || this.$route.params.slug === null;
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

      if (query.demand === 'Bán') {
        filter.demand = query.demand;
        this.setSellButtonActiveState(true);
      } else {
        filter.demand = query.demand;
        this.setSellButtonActiveState(false);
      }

      if (query.type) {
        filter.type = query.type;
      }

      if (query.city || query.district) {
        filter.location = {};
        filter.location.city = query.city;
        filter.location.district = query.district;
      }

      if (query.gtnn || query.gtln) {
        filter.priceRange = {};

        if (query.gtnn) {
          filter.priceRange.from = parseInt(query.gtnn);
        }

        if (query.gtln) {
          filter.priceRange.to = parseInt(query.gtln);
        }
      }

      if (query.dtnn || query.dtln) {
        filter.acreageRange = { };

        if (query.dtnn) {
          filter.acreageRange.from = parseInt(query.dtnn);
        }

        if (query.dtln) {
          filter.acreageRange.to = parseInt(query.dtln);
        }
      }

      if (query.directions) {
        filter.directions = query.directions;
      }

      if (query.roomStructure) {
        filter.roomStructure = query.roomStructure;
      }

      return filter;
    },

    handleTypeFilterChanged (type) {
      this.inputFilter.type = type;
    },

    handleLocationFilterChanged (location) {
      this.inputFilter.location = location;
    },

    handleProjectFilterChanged (project) {
      this.inputFilter.project = project;
    },

    handlePriceFilterChanged (priceRange) {
      this.inputFilter.priceRange = priceRange;
    },

    handleAcreageFilterChanged (acreageRange) {
      this.inputFilter.acreageRange = acreageRange;
    },

    handleDirectionFilterChanged (directions) {
      this.inputFilter.directions = directions;
    },

    handleBedroomFilterChanged (bedroomOptions) {
      this.inputFilter.bedroomOptions = bedroomOptions;
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
        const tempDemand = this.filter.demand;

        if (tempDemand) {
          query.demand = tempDemand;
        }
      }

      if (this.filter.type) {
        const tempType = this.filter.type;

        if (tempType) {
          query.type = tempType;
        }
      }

      if (this.filter.location) {
        const tempLocation = this.filter.location;

        if (tempLocation) {
          query.city = tempLocation.city;
          query.district = tempLocation.district;
        }
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
        const tempDirections = this.filter.directions;

        if (tempDirections) {
          query.directions = tempDirections;
        }
      }

      if (this.filter.bedroomOptions) {
        const tempBedroomOptions = this.filter.bedroomOptions;

        if (tempBedroomOptions) {
          query.bedroomOptions = tempBedroomOptions;
        }
      }

      this.$router.push({ path, query });
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
