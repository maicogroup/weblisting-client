<template>
  <div v-if="post != null">
    Apollo Testing:
    {{ post.id }}
  </div>
</template>

<script>
import { gql } from 'graphql-tag';

export default {
  name: 'IndexPage',
  apollo: {
    post: gql`
      query GetPost {
        post(
          where: {
            pageInfor: { slug: { eq: "can-ho-the-sun-avenue-3pn2wc-tang-17-thoai-mai-sang-trong-40072"} } }
        ) {
          id
        } 
    }`
  }
};
</script>
