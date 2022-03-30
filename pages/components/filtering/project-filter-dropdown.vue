<template>
  <div
    class="inline relative"
  >
    <button
      class="text-sm relative bg-white text-gray-800 px-2 hover:bg-gray-100 h-full"
      @click="open = !open"
    >
      <div class="inline-flex justify-between items-end">
        <span class="mr-1">Dự án</span>
        <svg class="inline h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
      <p class="text-center w-28 truncate ... relative text-gray-600">
        {{ displaySelected }}
      </p>
    </button>
    <div
      v-if="open"
      ref="dropdownContent"
      tabindex="0"
      class="text-sm absolute right-0 py-2 bg-white top-16 w-60 rounded-none shadow-xl"

      @mouseenter="entered = true"
      @mouseleave="entered = false"
    >
      <p class="font-semibold px-6 py-2">
        Chọn dự án
      </p>

      <divider />

      <div class="relative m-4">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button class="p-1 text-gray-400 focus:outline-none focus:shadow-outline">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-4 h-4"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </span>
        <input
          v-model="searchInput"
          type="search"
          class="border py-2 pl-10 pr-2 w-full h-full rounded-md bg-white focus:text-gray-900 focus:outline-none"
          placeholder="Tìm kiếm..."
        >
      </div>

      <div class="max-h-96 overflow-y-auto overflow-x-hidden">
        <filter-dropdown-item
          v-if="searchInput.trim() === ''"
          class="text-dark-red"
          @click="handleSelectAllProjectOption"
        >
          Tất cả dự án
        </filter-dropdown-item>

        <template v-if="projects !== null">
          <filter-dropdown-item v-for="project in filteredProjects" :key="project.id" @click="handleSelectProject(project)">
            {{ project.projectName }}
          </filter-dropdown-item>
        </template>
        <p v-else class="text-gray-600 text-center">
          Đang tải...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';
import FilterDropdownItem from './filter-dropdown-item.vue';
export default {
  name: 'ProjectFilterDropdown',
  components: { FilterDropdownItem },

  apollo: {
    projects: gql`
        query GetProjects {
          projects {
            projectName
            id
            pageInfors {
              slug
              title
            }
          }
        }
    `
  },

  props: {
    selectedOption: { type: Object, default: null },
    demand: {type: String, default: null}
  },

  data () {
    return {
      open: false,
      entered: false,
      displaySelected: 'Tất cả',
      searchInput: '',
      count: 0
    };
  },

  computed: {
    filteredProjects () {
      const query = this.searchInput.trim().toLowerCase();
      return this.projects.filter(p => p.projectName.toLowerCase().includes(query));
    },
    project(){
      if(this.selectedOption)
        return this.projects.filter(p => p.projectName.toLowerCase().includes(this.selectedOption.projectName.toLowerCase()))[0];
      else
        return null;
    }
  },

  watch: {
    open (value) {
      if (value === true) {
        // khi mở dropdown thì chuột chưa chạm vào nội dung nên biến entered phải mặc định bằng false
        this.entered = false;

        // setTimeout để tránh listen các click event hiện tại
        setTimeout(() => document.addEventListener('click', this.closeIfOutsideOfDropdown), 0);
      } else {
        document.removeEventListener('click', this.closeIfOutsideOfDropdown);
      }
    },
    selectedOption: {
      handler (option) {
        if (option) {
          this.displaySelected = option.projectName;
        } else {
          this.displaySelected = 'Tất cả';
        }
      },
      immediate: true
    },
    demand: function(val){
      if(this.project)
        this.handleSelectProject(this.project);
    }
  },

  methods: {
    closeIfOutsideOfDropdown () {
      this.open = this.entered;
    },

    handleSelectProject (project) {
      this.open = false;
      const condition = this.demand.replace('Cho', '');
      this.$emit('optionchanged', {
        projectName: project.projectName,
        id: project.id,
        pageInfor: project.pageInfors.filter(c => c.title.toLowerCase().includes(condition.toLowerCase()))[0]
      });
    },

    handleSelectAllProjectOption () {
      this.open = false;
      this.$emit('optionchanged', null);
    }
  },
};
</script>

<style scoped>
.text-dark-red {
  color: #961B12;
}
</style>
