<template>
  <div id="post-subinfor" class="max-w-full grow">
    <div class="flex justify-between items-center mb-2" style="height: 2.5rem;">
      <p class="md:text-sm text-xs truncate mar-address">
        Hiện có: {{ totalItem }} bất động sản
      </p>
      <div class="flex items-center">
        <p class="inline text-sm truncate mar-address">
          Sắp xếp theo:
        </p>
        <Dropdown item-width="150px" class="text-sm w-36" :title="arrangeOption">
          <DropdownItem @click="order(0)">
            Giá cao nhất
          </DropdownItem>
          <DropdownItem @click="order(1)">
            Giá thấp nhất
          </DropdownItem>
          <DropdownItem @click="order(2)">
            Mới nhất
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
    <div class="flow-root">
      <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        <li v-for="post in posts" :key="post.id" class="pb-6 md:pt-0 pt-6  md:border-none border-b">
          <div class="">
            <NuxtLink :to="`/chi-tiet-can-ho/${post.pageInfor.slug}`" class="md:hidden font-bold text-lg leading-6 ov-flow-hidden">
              {{ post.pageInfor.title }}
            </NuxtLink>
            <div class="flex item-flex-start h-40 space-x-4 md:rounded-md md:border mt-2">
              <NuxtLink class="w-40 md:w-60 h-full" :to="`/chi-tiet-can-ho/${post.pageInfor.slug}`">
                <img class="w-full h-full object-cover rounded-md" :src="post.srcimage" alt="Bonnie image">
              </NuxtLink>
              <div class="flex-1 min-w-0">
                <div v-if="post.tags != null" class="mt-2 inline-flex space-x-1 items-center">
                  <p v-for="item in post.tags" :key="item" class="text-xs font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full">
                    {{ item }}
                  </p>
                </div>
                <NuxtLink :to="`/chi-tiet-can-ho/${post.pageInfor.slug}`" class="hidden md:block font-bold text-xl leading-6 mar-title ov-flow-hidden">
                  {{ post.pageInfor.title }}
                </NuxtLink>
                <p class="font-price md:mt-0 md:mb-4 mt-2 md:mb-5 mb-2">
                  {{ post.price.toLocaleString('it-IT', {style: 'currency', currency: 'VND'}) }}
                </p>
                <p class="text-sm color-858585 md:mb-3 md:mb-6 mb-2">
                  {{ post.address }}
                </p>
                <p class="text-sm color-a7a7a7">
                  {{ post.date }}, {{ post.hour }}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <pagination :total="totalItem" :per-page="10" :current-page="pageIndex" @pagechanged="pageNavigationTo" />
  </div>
</template>

<script>
import { gql } from 'graphql-tag';
// import pagination from '~/pages/components/pagination.vue';
// import Dropdown from '~/pages/components/Dropdown/Dropdown.vue';
// import DropdownItem from '~/pages/components/Dropdown/DropdownItem.vue';

const getPostsQuery = gql`query GetPostWithPagination($condition: PostCollectionFilterInput, $skipItems: Int, $take: Int, $order : [PostCollectionSortInput!]) {
            postsWithPagination(take: $take, skip: $skipItems, where: $condition, order : $order) {
              items{
                id
                pageInfor{
                  title
                  slug
                  metaDescription
                }
                gallery
                price
                description
                demand
                status,
                acreage,
                type,
                totalBedRoom,
                totalWC,
                apartmentState,
                tags
                project{
                    address{
                        street
                        city
                        district
                        googleMapLocation
                    }
                }
                lastUpdatedAt
              }
              totalCount
            }
          }`;

export default {
  name: 'ListPost',
  props: [
    'filter'
  ],
  data () {
    return {
      pageIndex: 1,
      pageOfItems: [],
      arrangeOption: 'Mặc định'
    };
  },
  apollo: {
    postsData: {
      query () {
        return getPostsQuery;
      },
      update: data => data.postsWithPagination,
      variables () {
        const condition = this.createConditionParamter(this.filter);
        const noFilter = (Object.keys(condition).length === 0);

        return {
          condition: noFilter ? undefined : condition,
          take: 10
        };
      }
    }
  },
  computed: {
    posts () {
      if (this.postsData == null) { return []; } else {
        return this.postsData.items.map(function (item) {
          const roomStructure = (item.type !== 'Căn hộ') ? item.type : item.totalBedRoom + 'PN' + item.totalWC + 'WC';

          return {
            srcimage: 'https://maico-hub-record.ss-hn-1.bizflycloud.vn/' + (item.gallery.find(c => !c.includes('.mp4')) || 'apartment-resource/00800a5f-eb0c-4c6f-93ad-1c28e03b70dc/17-01-2022_0953/image/z3116547105303_32a851d4f5d44bca12e64ac1a09e6a6d.jpg'),
            pageInfor: item.pageInfor,
            price: item.price + ' vnđ - ' + item.acreage + ' m² - ' + roomStructure,
            address: item.project?.address.street + ' ' + item.project?.address.district + ' ' + item.project?.address.city,
            date: 'Cập nhật lần cuối: ' + item.lastUpdatedAt.substring(0, 10),
            hour: item.lastUpdatedAt.substring(11, 16),
            tags: item.tags,
            id: item.id
          };
        });
      }
    },
    totalItem () {
      if (this.postsData == null) { return 0; } else { return this.postsData.totalCount; }
    }
  },
  watch: {
    filter (filter) {
      const condition = this.createConditionParamter(filter);
      const noFilter = (Object.keys(condition).length === 0);

      this.$apollo.queries.postsData.refetch(
        {
          condition: noFilter ? undefined : condition,
          skipItems: 0
        });
      this.pageIndex = 1;
    }
  },
  methods: {
    createConditionParamter (filter) {
      const conditions = { };

      if (filter.demand) {
        conditions.demand = { eq: filter.demand };
      }

      if (filter.location) {
        conditions.project = { address: { and: [] } };
        const andQuery = conditions.project.address.and;
        if (filter.location.city) {
          andQuery.push({ city: { eq: filter.location.city } });
        }

        if (filter.location.district) {
          andQuery.push({ district: { eq: filter.location.district } });
        }
      }

      if (filter.project) {
        conditions.projectId = { eq: filter.project.id };
      }

      if (filter.priceRange) {
        const priceRange = filter.priceRange;
        conditions.price = {};

        if (priceRange.from) {
          conditions.price.gte = priceRange.from * 1000000;
        }

        if (filter.priceRange.to) {
          conditions.price.lte = priceRange.to * 1000000;
        }
      }

      if (filter.acreageRange) {
        const acreageRange = filter.acreageRange;
        conditions.acreage = {};

        if (acreageRange.from) {
          conditions.acreage.gte = acreageRange.from;
        }

        if (filter.acreageRange.to) {
          conditions.acreage.lte = acreageRange.to;
        }
      }

      if (filter.directions && filter.directions.length !== 0) {
        conditions.direction = {
          in: filter.directions
        };
      }

      if (filter.type) {
        conditions.type = {};

        if (filter.type === 'Căn hộ chung cư') {
          conditions.type.eq = 'Căn hộ';
        } else {
          conditions.type.eq = filter.type;
        }
      }

      if (filter.bedroomOptions) {
        conditions.or = [];
        if (filter.bedroomOptions.includes('5+')) {
          conditions.or.push({ totalBedRoom: { gte: 5 } });
        }

        const fixedBedroomOptions = filter.bedroomOptions.filter(o => o !== '5+').map(o => parseInt(o));
        if (fixedBedroomOptions.length !== 0) {
          conditions.or.push({ totalBedRoom: { in: fixedBedroomOptions } });
        }
      }

      return conditions;
    },

    pageNavigationTo (index) {
      this.$apollo.queries.postsData.refetch({
        skipItems: 10 * (index - 1)
      });
      this.pageIndex = index;
      // const yOffset = -10;
      // const element = document.getElementById('post-subinfor');
      // const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      // window.scrollTo({top: y, behavior: 'smooth'});
      document.getElementById('post-subinfor').scrollIntoView(true);
    },
    order (orderConditionIndex) {
      const orderCondition = {};
      if (orderConditionIndex === 0) { orderCondition.price = 'DESC'; this.arrangeOption = 'Giá Cao Nhất'; } else if (orderConditionIndex === 1) { orderCondition.price = 'ASC'; this.arrangeOption = 'Giá Thấp Nhất'; } else { orderCondition.lastUpdatedAt = 'DESC'; this.arrangeOption = 'Mới Nhất'; }
      this.$apollo.queries.postsData.refetch({
        order: orderCondition,
        skipItems: 0
      });
      this.pageIndex = 1;
    }
  }
};
</script>

<style scoped>
.w-h-100 {
  width: 100px;
  height: 100px;
}

.item-flex-start {
  align-items: flex-start;
}

.font-price {
  line-height: 16.43px;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
}

.mar-title {
  margin: 10px 24px 14px 0;
}

.ov-flow-hidden {
  overflow: hidden;
}

.color-858585{
    color: #858585;
}

.color-a7a7a7{
    color: #a7a7a7;
}

.border-none {
  border: none;
}

.grow {
  flex-grow: 1;
}
</style>
