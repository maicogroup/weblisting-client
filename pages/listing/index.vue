<template>
  <div class="px-5 w-full max-w-screen-xl">
    <ProjectHeader v-if="project != null" :project="project" />
    <Divider class="mt-7 mb-1.5" />
    <div class="flex justify-between w-full">
    <ListPost class="left-0" :projectId="project.id"/>
    <ContactInfor class="lg:ml-9 hidden lg:flex lg:flex-col mt-14" />
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';

import ProjectHeader from './components/ProjectHeader.vue';
import ListPost from './components/ListPost.vue';
import ContactInfor from './components/ContactInfor.vue';

export default {
  name: 'PostList',
  components: { ProjectHeader, ListPost, ContactInfor },
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
  }

};
</script>

<style>

</style>
