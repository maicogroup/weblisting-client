<template>
  <div class="mx-2" id="post-queue">
    <div class="flex justify-between space-x-3 items-center mb-5">
      <p class="text-gray-600">
        Hiện có {{ totalCount }} bài viết chờ duyệt
      </p>
      <project-filter-dropdown :selected-option="inputFilter.project" @optionchanged="handleProjectFilterChanged"></project-filter-dropdown>
     </div>
    <div v-if="postsWithPagination != null" class="flex-col space-y-6 mb-4">
      <div v-for="post in postsWithPagination.items" :key="post.id" class="bg-white rounded-md max-w-4xl mx-auto p-4 hover:shadow-lg border-gray-400 border border-solid">
        <div class="flex justify-between">
          <div>
            <p class="mb-2 font-semibold">
              Ngày tạo: <span class="font-thin">{{ new Date(post.createdAt).toLocaleString() }}</span>
            </p>
            <p class="mb-2 font-semibold">
              Ngày sửa: <span class="font-thin">{{ new Date(post.lastUpdatedAt).toLocaleString() }}</span>
            </p>
          </div>
          <div class="flex justify-end space-x-2">
            <a :href="`chinh-sua-tin-dang/${post.pageInfor.slug}`" class="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 py-2 px-4 rounded flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Chỉnh sửa
            </a>
            <button v-on:click="postPush(post)" :href="`chinh-sua-tin-dang/${post.pageInfor.slug}`" class="bg-green-500 hover:bg-green-700 text-white font-bold h-10 py-2 px-4 rounded flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Đăng
            </button>
          </div>
        </div>
        <p class="truncate">
          <span class="font-semibold">
            Tags:
          </span>
          <span v-if="post.tags && post.tags.length != 0" class="text-blue-600 mt-2">
            {{ post.tags.join(', ') }}
          </span>
          <span v-else class="mt-2 text-red-600 font-semibold">
            trống
          </span>
        </p>
        <div>
          <p class="mt-1 font-semibold">
            Mô tả:
            <span v-if="!isStringNullOrWhitespace(post.description)" class="font-thin mt-2">
              {{ formatDescription(post.description) }}
            </span>
            <span v-else class="mt-2 text-red-600">
              trống
            </span>
          </p>
        </div>

        <Divider class="my-2" />

        <div class="text-purple-800">
          <p class="font-semibold ">
            Thông tin SEO:
          </p>

          <p class="ml-2 font-semibold">
            Slug:
            <span v-if="!isStringNullOrWhitespace(post.pageInfor.slug)" class="font-thin mt-2">
              {{ post.pageInfor.slug }}
            </span>
            <span v-else class="mt-2 text-red-600">
              trống
            </span>
          </p>

          <p class="ml-2 mt-1 font-semibold">
            Title:
            <span v-if="!isStringNullOrWhitespace(post.pageInfor.title)" class="font-thin mt-2">
              {{ post.pageInfor.title }}
            </span>
            <span v-else class="mt-2 text-red-600">
              trống
            </span>
          </p>

          <p class="ml-2 mt-1 font-semibold">
            Meta description:
            <span v-if="!isStringNullOrWhitespace(post.pageInfor.metaDescription)" class="font-thin mt-2">
              {{ post.pageInfor.metaDescription }}
            </span>
            <span v-else class="mt-2 text-red-600">
              trống
            </span>
          </p>
        </div>
      </div>
    </div>
    <pagination :total="totalCount" :perPage="10" :currentPage="pageIndex" @pagechanged="pageNavigationTo"></pagination>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';
import ProjectFilterDropdown from './components/project-filter-dropdown.vue';

const getPostQuery = gql`
        query GetWaitingPosts($skip: Int, $take: Int, $condition: PostCollectionFilterInput) { 
          postsWithPagination (take: $take, skip: $skip, where: $condition) {
            items {
              id
              createdAt
              lastUpdatedAt
              pageInfor {
                title
                slug
                metaDescription
              }
              description
              tags
            }
            totalCount
        }
      }`;
export default {
  components: { ProjectFilterDropdown },
  name: 'ListpostsPage',
  data () {
    return{
      pageIndex: 1,
      inputFilter: {}
    }
  },
  apollo: {
    postsWithPagination: { 
      query () {
        return getPostQuery;
      },
      update: data => data.postsWithPagination,
      variables () {
        return{
            take: 5,
            skip: 0,
            condition: {
              or: [
                {status: {eq: "Draft"}},
                {status: {eq: "Updated"}}
              ]
            }
        }
      }
    }
  },
  watch: {
    inputFilter: function(filter) {
      if (filter.project) {
        this.$apollo.queries.postsWithPagination.refetch({
          condition: {
            or: [
              {status: {eq: "Draft"}},
              {status: {eq: "Updated"}}
            ],
            projectId: {eq: this.inputFilter.project.id}
          },
          take: 5, 
          skip: 0
          });
        this.pageIndex = 1;
      }
      else {
        this.$apollo.queries.postsWithPagination.refetch({
          condition: {
            or: [
              {status: {eq: "Draft"}},
              {status: {eq: "Updated"}}
            ]
          },
          take: 5, 
          skip: 0
          });
        this.pageIndex = 1;
      }
      
    }
  },
  methods: {
    handleProjectFilterChanged (project) {
      this.inputFilter = { ...this.inputFilter, project };
    },
    isStringNullOrWhitespace (str) {
      return str === null || str.trim() === '';
    },

    formatDescription (description) {
      // document không tồn tại ở bên server
      let content;
      if (process.server) {
        content = description;
      } else {
        const span = document.createElement('span');
        span.innerHTML = description;
        content = span.textContent || span.innerText;
      }

      return content.length <= 280 ? content : content.slice(0, 277) + '...';
    },
    pageNavigationTo: function(index){
      this.$apollo.queries.postsWithPagination.refetch ({
          take: 5,
          skip: 10 * (index - 1)
      });
      this.pageIndex = index;
      document.getElementById("post-queue").scrollIntoView(true);
      console.log("kaka");
    },
    postPush: function(post){
      const postTemp = post
      this.$apollo.mutate({
        mutation: gql `mutation UpdatePostStatus($input: UpdatePostStatusInput!) {
            updatePostStatus(input: $input) {
                string
            }
        }`,
        variables:{
          input: {
            id: post.id
          }
        },
        update:(store, {data:{ postPush }}) =>{
          
          const query = {
            query: getPostQuery,
            variables: {take: 5, skip: 10 * (this.pageIndex - 1)}
          }
          const { postsWithPagination } = store.readQuery( query )
          debugger;
          postsWithPagination.items = postsWithPagination.items.filter(c => c.id != post.id),
          postsWithPagination.totalCount--

          console.log(postData)
          store.writeQuery({ ...query, data: {postsWithPagination : postsWithPagination}})
        }
      })
    }
  },
  computed:{
    totalCount(){
      if(this.postsWithPagination == null) return 0
      else return this.postsWithPagination.totalCount;
    }
  }
};
</script>

<style>

</style>
