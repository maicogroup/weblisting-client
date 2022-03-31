<template>
  <div class="w-full">
    <div class="relative items-center w-full h-[239px] md:h-[366px] object-cover">
      <img class="w-full h-full object-cover absolute" src="~/static/images/home/unsplash_WYd_PkCa1BY.png">
      <div class="relative mx-auto h-full text-[32px] md:text-[60px] md:leading-[75px] flex flex-col items-center justify-center font-bold font-source-serif-pro">
        <h1 class="text-slate-50 text-center">
          Thông tin nhanh về
        </h1>
        <h1 class="text-slate-50 text-center">
          thị trường bất động sản
        </h1>
      </div>
    </div>
    <div class="object-cover center relative flex flex-col items-center md:justify-center">
      <div class=" pt-2.5 md:pt-10 pb-8 px-[21px] overflow-hidden">
        <div class="title font-bold text-2xl font-source-serif-pro">
          Bài viết mới nhất
        </div>
        <div class="flex space-x-6">
          <div class="min-w-0 md:max-w-[745px] max-w-[370px]">
            <div
              v-for="blog in blogs"
              :key="blog.id"
              class="flex flex-col md:flex-row mb-[15px] bg-white rounded-md border border-stone-200 overflow-hidden"
            >
              <nuxt-link class="shrink-0" :to="blog.slug">
                <img src="~/static/images/home/home-page-bg.jpg" class="h-[220px] w-[370px] md:w-[180px] md:h-[160px] blog-card-image">
              </nuxt-link>
              <div class="py-2 pr-2 pl-3">
                <nuxt-link :to="blog.slug" class="font-source-serif-pro font-bold text-xl leading-[30px]">
                  {{ blog.title }}
                </nuxt-link>
                <div class="text-sm text-neutral-400 flex justify-start">
                  <div>
                    {{ blog.authorName }}
                  </div>
                  <div class="ml-2 mr-2">
                    ·
                  </div>
                  <div>
                    {{ blog.createdAt }}
                  </div>
                </div>
                <div class="mt-1 line-clamp-3 text-sm">
                  {{ blog.description }}
                </div>
              </div>
            </div>
            <pagination
              :total="blogPagination.totalCount"
              :per-page="15"
              :current-page="currentPage"
              @pagechanged="handlePageChanged"
            />
            <featured-blogs :blogs="FeaturedBlogs" class="mt-7 lg:hidden" />
          </div>
          <featured-blogs :blogs="FeaturedBlogs" class="flex-shrink-[99] hidden lg:block" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import FeaturedBlogs from './components/featured-blogs.vue';
import Pagination from '~/components/pagination.vue';

export default {
  name: 'HomePage',
  components: { Pagination, FeaturedBlogs },
  layout: 'no-fixed-contact',

  apollo: {
    blogPagination: {
      query: gql`query GetBlogs($skip: Int) {
        blogsWithPagination(take: 15, skip: $skip, order: {createdAt: DESC}) {
          totalCount
          items {
            id
            author {
              name
            },
            pageInfor {
              title
              slug
              metaDescription
            }
            createdAt
          }
        }
      }`,
      update: data => data.blogsWithPagination,
      variables () {
        return {
          skip: this.skip
        };
      }
    },

    FeaturedBlogs: {
      query: gql`
        query GetBlogs {
          blogsWithPagination(take: 5) {
            totalCount
            items {
              content
              id
              author {
                name
              },
              pageInfor {
                title
                slug
              }
              createdAt
            }
          }
        }`,
      update (data) {
        return data.blogsWithPagination.items.map(b => ({
          id: b.id,
          authorName: b.author.name,
          title: b.pageInfor.title,
          createdAt: this.formatDate(new Date(b.createdAt)),
          slug: b.pageInfor.slug
        }));
      }
    }
  },

  data () {
    return {
      skip: 0,
      currentPage: 1
    };
  },

  head () {
    return {
      title: 'MaicoGroup - Căn hộ xác thực',
      meta: [{
        property: 'og:image',
        content: 'https://weblisting.hn.ss.bfcplatform.vn/og_image.jpg'
      }]
    };
  },

  computed: {
    blogs () {
      return this.blogPagination.items.map((b) => {
        const date = new Date(b.createdAt);
        const createdAt = this.formatDate(date);

        return {
          id: b.id,
          authorName: b.author.name,
          title: b.pageInfor.title,
          slug: b.pageInfor.slug,
          description: b.pageInfor.metaDescription,
          createdAt
        };
      });
    }
  },

  methods: {
    formatDate (date) {
      return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },

    handlePageChanged (index) {
      this.skip = 15 * (index - 1);
      this.currentPage = index;
    }
  }
};
</script>

<style scoped>
  .font-size-0 {
    font-size: 0;
  }

  .search-bar {
    max-width: 384px;
    /*width: 100%;*/
  }
</style>
