<template>
  <div class="flex justify-between lg:px-5 w-full max-w-screen-xl">
    <DetailPost :post="this.post" class="lg:w-9/12 lg:mr-9 w-full" />
    <ContactInfor class="lg:block hidden" />
  </div>
</template>

<script>
import DetailPost from './components/DetailPost.vue';
import ContactInfor from './components/ContactInfor.vue';
import {gql} from 'graphql-tag';

const getPostQuery = gql `
  query GetPost($condition: PostCollectionFilterInput) {
        post( where: $condition ) {
          id
          gallery
          acreage
          price
          roomStructure
          direction
          description
          ownerId
          furnitures
          apartmentNumber
          floor
          demand
          status
          tags
          pageInfor {
            title
            slug
            metaDescription
          }
          project{
            address{
              street
              district
              city
              googleMapLocation
            }
            juridical
            investor
            projectName
            utilities
          }
        }
      }
`;

export default {
  name: 'DetailApartmentPage',
  components: { ContactInfor, DetailPost },
  apollo:{
    post:{
      query(){
        return getPostQuery
      },
      update: data => data.post,
      variables(){
        return{
          condition:{
            pageInfor: {
              slug: {
                eq: this.$route.params.slug
              }
            }
          }
        }
      }
    }
  },
  head(){
    return {
      title: this.post.pageInfor.title,
      meta:[{
        hid: 'description', 
        name: 'description',
        content: this.post.pageInfor.metaDescription
      }]
    }
  }
};
</script>

<style>

</style>
