<template>
  <div class="px-5 w-full max-w-screen-xl">
    <ProjectHeader v-if="project != null" :project="project" />
    <Divider class="mt-7 mb-1.5" />
    <div class="flex justify-between w-full">
    <ListPost class="left-0" />
    <ContactInfor class="lg:ml-9 hidden lg:flex lg:flex-col mt-10" />
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';
import Divider from '../components/Divider.vue';

import ProjectHeader from './components/ProjectHeader.vue';
import ListPost from './components/ListPost.vue';
import ContactInfor from './components/ContactInfor.vue';

export default {
  name: 'ListingPage',
  components: { ProjectHeader, Divider, ListPost, ContactInfor },
  apollo: {
    projectId: {
      query () {
        return gql`
          query GetListPost($slug: String!) {
            listPosts(where:{pageInfors: {some: {slug: {eq: $slug}}}}) {
              projectId,
          }
        }`;
      },

      update: data => data.listPosts[0].projectId,

      variables () {
        return {
          slug: this.$route.params.slug
        };
      }
    },

    project: {
      query () {
        return gql`
          query GetProjects($projectId: String!) {
            projects(where: { id: { eq: $projectId } }) {
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

      skip () {
        return this.projectId == null;
      },

      variables () {
        return {
          projectId: this.projectId
        };
      }
    }
  }

};
</script>

<style>

</style>
