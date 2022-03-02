<template>
  <div>
    <div class="w-full flex justify-between border rounded h-11 items-center px-3 mb-4" @click="open = !open">
      <p> {{ displaySelected }} </p>
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 13L7 7L1 1" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div
      v-if="open"
      ref="dropdownContent"
      class="fixed inset-0 mt-12 w-full z-30 bg-white opacity-100 overflow-auto"
    >
      <div
        class="flex justify-between border-b rounded"
      >
        <p class="font-semibold px-6 py-2  mr-auto ml-auto ">
          Chọn dự án
        </p>
        <div
          @click="open = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 relative"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div
        v-if="searchInput.trim() === ''"
        class="flex justify-between h-11 border-b items-center mx-3"
      >
        <p>Tất cả dự án</p>
        <input type="radio" checked="checked" @click="handleSelectAllProjectOption">
      </div>
      <template v-if="projects !== null">
        <div v-for="project in filteredProjects" :key="project.id" class="flex justify-between h-11 border-b items-center mx-3" @click="handleSelectProject(project)">
          <p>{{ project.projectName }}</p>
          <input type="radio" @click="handleSelectProject(project)">
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';
export default {
  name: 'ProjectFilterOption',

  apollo: {
    projects: gql`
          query GetProjects {
            projects {
              projectName
              id
              pageInfors {
                slug
              }
            }
          }
      `
  },

  props: {
    selectedOption: { type: Object, default: null }
  },

  data () {
    return {
      open: false,
      entered: false,
      displaySelected: 'Dự án',
      searchInput: ''
    };
  },

  computed: {
    filteredProjects () {
      const query = this.searchInput.trim().toLowerCase();
      return this.projects.filter(p => p.projectName.toLowerCase().includes(query));
    }
  },

  watch: {

    selectedOption: {
      handler (option) {
        if (option) {
          this.displaySelected = option.projectName;
        } else {
          this.displaySelected = 'Tất cả';
        }
      },
      immediate: true
    }
  },

  methods: {
    handleSelectProject (project) {
      this.open = false;
      this.$emit('optionchanged', {
        projectName: project.projectName,
        id: project.id,
        pageInfor: project.pageInfors[0]
      });
    },

    handleSelectAllProjectOption () {
      this.open = false;
      this.$emit('optionchanged', null);
    }
  }
};
</script>

<style scoped>
.text-dark-red {
  color: #961B12;
}
</style>
