<template>
  <div>
    <div class="w-full flex justify-between border rounded h-11 items-center px-3 mb-4" @click="open = !open">
      <p class="truncate ...">
        {{ displaySelected }}
      </p>
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
        <div class="absolute top-1.5 left-2" @click="open = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#32c82b"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ><path d="M19 12H6M12 5l-7 7 7 7" /></svg>
        </div>
        <p class="font-semibold px-6 py-2  mr-auto ml-auto ">
          Chọn dự án
        </p>
      </div>
      <div
        v-if="searchInput.trim() === ''"
        class="flex justify-between h-11 border-b items-center mx-3"
        @click="handleSelectAllProjectOption"
      >
        <p class="text-dark-red">
          Tất cả dự án
        </p>
        <input type="radio" :checked="isSelected(null)">
      </div>
      <template v-if="projects !== null">
        <div v-for="project in filteredProjects" :key="project.id" class="flex justify-between h-11 border-b items-center mx-3" @click="handleSelectProject(project)">
          <p>{{ project.projectName }}</p>
          <input :checked="isSelected(project)" type="radio">
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
                title
              }
            }
          }
      `
  },

  props: {
    selectedOption: { type: Object, default: null },
    demand:{ type: String}
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
    },
    project(){
      if(this.selectedOption)
        return this.projects.filter(p => p.projectName.toLowerCase().includes(this.selectedOption.projectName.toLowerCase()))[0];
      else
        return null;
    }
  },

  watch: {
    selectedOption: {
      handler (option) {
        if (option) {
          this.displaySelected = 'Dự án: ' + option.projectName;
        } else {
          this.displaySelected = 'Dự án';
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
    isSelected (project) {
      return project?.id === this.selectedOption?.id;
    },

     handleSelectProject (project) {
      this.open = false;
      this.$emit('optionchanged', {
        projectName: project.projectName,
        id: project.id,
        pageInfor: project.pageInfors.filter(c => c.title.toLowerCase().includes(this.demand.toLowerCase()))[0]
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
