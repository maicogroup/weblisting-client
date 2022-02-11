<template>
  <div class="w-full max-w-screen-xl px-4">
    <div class="z-10 w-full fixed left-0 top-after-header hidden 2xl:flex space-x-4 bg-white shadow-sm px-4">
      <div class="double-button my-4 flex">
        <button :class="`text-base py-2 px-4 border rounded-l-md hover:text-white hover:bg-gray-700 ${sellButtonClasses}`" @click="setSellButtonActiveState(true)">
          Bán
        </button>
        <button :class="`text-base py-2 px-4 border rounded-r-md hover:text-white hover:bg-gray-700 ${rentButtonClasses}`" @click="setSellButtonActiveState(false)">
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
        <location-ftiler-dropdown />
        <project-filter-dropdown @optionchanged="handleProjectFilterChanged" />
        <price-filter-dropdown @optionchanged="handlePriceFilterChanged" />
        <acreage-filter-dropdown @optionchanged="handleAcreageFilterChanged" />
        <direction-filter-dropdown @optionchanged="handleDirectionFilterChanged" />
        <bedroom-filter-dropdown />
      </div>

      <button class="ml-12 rounded-md px-6 bg-red-600 hover:bg-red-700 font-semibold text-white my-4" @click="handleFilterButtonPressed">
        Tìm kiếm
      </button>
    </div>
    <ProjectHeader v-if="project != null || (filter && filter.projectId === null)" :project="project" />
    <Divider class="mt-7 mb-1.5" />
    <div class="flex justify-between w-full">
      <ListPost v-if="project != null" class="left-0" :project-id="project.id" :filter="filter" />
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
      inputFilter: {}
    };
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

      update: data => data.projects[0],

      variables () {
        return {
          slug: this.$route.params.slug
        };
      }
    }
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
    sellButtonClasses () {
      return this.sellButtonIsActive ? 'hover:bg-gray-300' : '';
    },

    rentButtonClasses () {
      return !this.sellButtonIsActive ? 'hover:bg-gray-300' : '';
    }
  },

  methods: {
    setSellButtonActiveState (state) {
      this.sellButtonIsActive = state;
      this.inputFilter.demand = this.sellButtonIsActive ? 'Bán' : 'Cho Thuê';
    },

    handlePriceFilterChanged (priceRange) {
      this.inputFilter.priceRange = priceRange;
    },

    handleProjectFilterChanged (project) {
      if (project) {
        this.inputFilter.projectId = project.id;
      } else {
        this.inputFilter.projectId = null;
      }
    },

    handleAcreageFilterChanged (acreageRange) {
      this.inputFilter.acreageRange = acreageRange;
    },

    handleDirectionFilterChanged (directions) {
      this.inputFilter.directions = directions;
    },

    handleTypeFilterChanged (type) {
      this.inputFilter.type = type;
    },

    handleFilterButtonPressed () {
      this.filter = { ...this.inputFilter };
    }
  }
};
</script>

<style scoped>
.grow {
  flex-grow: 1;
}

.top-after-header {
  top: 73px;
}

.double-button {
  font-size: 0;
}
</style>
