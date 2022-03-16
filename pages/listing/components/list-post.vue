<template>
  <div id="post-subinfor" class="max-w-full grow">
    <div class="flex justify-between items-center mt-2 mb-2" style="height: 2.5rem;">
      <p class="md:text-sm text-xs truncate">
        Hiện có: {{ totalItem }} bất động sản
      </p>
      <div class="flex items-center">
        <p class="inline text-sm truncate">
          Sắp xếp theo:
        </p>
        <Dropdown item-width="150px" class="text-sm" :title="arrangeOption">
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
    <div class="flex flex-col space-y-4">
      <div v-if="posts.length == 0">
        <div>
          <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="128" height="128" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path fill="#999" d="M31 8h-8v2h8v21h-8v2h10V10a2 2 0 0 0-2-2Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="#999" d="M19.88 3H6.12A2.12 2.12 0 0 0 4 5.12V33h18V5.12A2.12 2.12 0 0 0 19.88 3ZM20 31h-3v-3H9v3H6V5.12A.12.12 0 0 1 6.12 5h13.76a.12.12 0 0 1 .12.12Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="#999" d="M8 8h2v2H8z" class="clr-i-outline clr-i-outline-path-3"/><path fill="#999" d="M12 8h2v2h-2z" class="clr-i-outline clr-i-outline-path-4"/><path fill="#999" d="M16 8h2v2h-2z" class="clr-i-outline clr-i-outline-path-5"/><path fill="#999" d="M8 13h2v2H8z" class="clr-i-outline clr-i-outline-path-6"/><path fill="#999" d="M12 13h2v2h-2z" class="clr-i-outline clr-i-outline-path-7"/><path fill="#999" d="M16 13h2v2h-2z" class="clr-i-outline clr-i-outline-path-8"/><path fill="#999" d="M8 18h2v2H8z" class="clr-i-outline clr-i-outline-path-9"/><path fill="#999" d="M12 18h2v2h-2z" class="clr-i-outline clr-i-outline-path-10"/><path fill="#999" d="M16 18h2v2h-2z" class="clr-i-outline clr-i-outline-path-11"/><path fill="#999" d="M8 23h2v2H8z" class="clr-i-outline clr-i-outline-path-12"/><path fill="#999" d="M12 23h2v2h-2z" class="clr-i-outline clr-i-outline-path-13"/><path fill="#999" d="M16 23h2v2h-2z" class="clr-i-outline clr-i-outline-path-14"/><path fill="#999" d="M23 13h2v2h-2z" class="clr-i-outline clr-i-outline-path-15"/><path fill="#999" d="M27 13h2v2h-2z" class="clr-i-outline clr-i-outline-path-16"/><path fill="#999" d="M23 18h2v2h-2z" class="clr-i-outline clr-i-outline-path-17"/><path fill="#999" d="M27 18h2v2h-2z" class="clr-i-outline clr-i-outline-path-18"/><path fill="#999" d="M23 23h2v2h-2z" class="clr-i-outline clr-i-outline-path-19"/><path fill="#999" d="M27 23h2v2h-2z" class="clr-i-outline clr-i-outline-path-20"/><path fill="none" d="M0 0h36v36H0z"/></svg>
          <p class="text-lg font-bold text-center">Rất tiếc, hiện không tìm thấy căn hộ nào <br> ở khu vực này !!!</p>
          <div class="text-sm flex justify-center mt-3">
            <p class="leading-6">
              Vui lòng thử cách:
              <ul class="ml-2" style="list-style-type: disc; list-style-position: inside;">
                <li>Thay đổi hoặc làm mới bộ lọc</li>
                <li>Trở lại trang chủ</li>
              </ul>
              <button v-on:click="goToHomePage" class="text-white bg-green-600 text-base font-bold px-10 py-4 rounded-md mt-3">Trở về trang chủ</button>
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-for="post in posts" :key="post.id" class="md:pt-0 md:border-none border-b mb-5">
          <NuxtLink :to="`/chi-tiet-can-ho/${post.pageInfor.slug}`" class="title-mobile color-orange font-bold text-base leading-6 ov-flow-hidden ">
            {{ post.pageInfor.title }}
          </NuxtLink>
          <div class="flex item-flex-start space-x-4 md:border mt-2 pr-3 rounded">
            <NuxtLink class="w-32 h-32 md:w-64 md:h-44 shrink-0" :to="`/chi-tiet-can-ho/${post.pageInfor.slug}`">
              <img class="w-full h-full object-cover" :src="post.srcimage" alt="Bonnie image">
            </NuxtLink>
            <div class="flex flex-col justify-between h-32 md:h-44 w-full">
              <div class="flex flex-col justify-between h-full">
                <NuxtLink :to="`/chi-tiet-can-ho/${post.pageInfor.slug}`" class="title-desktop mt-2 color-orange font-bold leading-6 ov-flow-hidden">
                  {{ post.pageInfor.title }}
                </NuxtLink>
                <p class="text-sm sm:text-base mt-2">
                  <span class="md:mr-2">{{ post.price }}</span> -
                  <span class="md:mx-2">{{ post.acreage }}</span> -
                  <span class="md:mx-2">{{ post.roomStructure }}</span>
                  <span class="md:mr-2 hidden md:inline">-</span>
                  <span class="hidden md:inline text-gray-700">{{ post.address }}</span>
                </p>
                <p class="md:hidden text-sm text-gray-700 mt-3 md:mt-2">
                  {{ post.address }}
                </p>
                <p class="description text-justify mt-2">
                  <!-- {{ post.description }} -->
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, velit non tincidunt lobortis, metus nisl pretium massa, sed luctus dui libero ut quam. Sed dictum mauris nisl, id fermentum nibh vulputate non. Mauris varius eros orci, vitae condimentum risus tristique vitae. Mauris quis mi ac erat suscipit sodales sit amet quis est. Nullam eu elementum odio. Morbi nec varius dolor, eu luctus elit. Nunc a leo non tortor aliquet mollis vestibulum eget arcu. Pellentesque aliquet faucibus augue, sit amet tempus risus mattis non.
                </p>
              </div>
              <div class="mb-2 mt-4 flex justify-between items-end w-full">
                <div v-if="post.tags != null" class="inline-flex space-x-1 items-center">
                  <p v-for="item in post.tags" :key="item" class="text-xs font-bold leading-sm uppercase px-3 py-1 bg-red-400 text-white rounded-full">
                    {{ item }}
                  </p>
                </div>
                <div v-else />
                <p class="text-sm color-a7a7a7">
                  {{ post.date }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <pagination :total="totalItem" :per-page="10" :current-page="pageIndex" @pagechanged="pageNavigationTo" />
      </div>
      
      
    </div>
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
                    id
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
        return this.postsData.items.map((item) => {
          return {
            srcimage: 'https://maico-hub-record.ss-hn-1.bizflycloud.vn/' + (item.gallery.find(c => !c.includes('.mp4')) || 'apartment-resource/00800a5f-eb0c-4c6f-93ad-1c28e03b70dc/17-01-2022_0953/image/z3116547105303_32a851d4f5d44bca12e64ac1a09e6a6d.jpg'),
            pageInfor: item.pageInfor,
            price: this.formatPrice(item.price, item.demand),
            acreage: item.acreage + 'm²',
            roomStructure: (item.type !== 'Căn hộ') ? item.type : item.totalBedRoom + 'PN' + item.totalWC + 'WC',
            address: item.project?.address.district + ', ' + item.project?.address.city,
            description: this.formatDescription(item.description),
            date: this.formatDate(item.lastUpdatedAt),
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

    goToHomePage(){
       this.$router.push({ path: '/'}).catch(() => {});
    },
    formatDate (dateStr) {
      const date = new Date(dateStr);
      const diffInDays = Math.floor((Date.now() - date.getTime()) / 86400000);

      if (diffInDays === 0) {
        return 'Hôm nay';
      }

      if (diffInDays === 1) {
        return 'Hôm qua';
      }

      if (diffInDays < 7) {
        return `${diffInDays} ngày trước`;
      }

      if (diffInDays < 30) {
        const diffInWeeks = Math.floor(diffInDays / 7);
        return `${diffInWeeks} tuần trước`;
      }

      if (diffInDays < 365) {
        const diffInMonths = Math.min(11, Math.floor(diffInDays / 30));
        return `${diffInMonths} tháng trước`;
      }

      const diffInYears = Math.floor(diffInDays / 365);
      return `${diffInYears} năm trước`;
    },

    formatDescription (description) {
      // document không tồn tại ở bên server
      let content;
      if (process.server) {
        content = description;
      } else {
        const span = document.createElement('span');
        span.innerHTML = description;
        content = span.textContent;
      }
      return content;
    },

    formatPrice (price, demand) {
      if (demand === 'Cho Thuê') {
        return `${price / 1e6} triệu/tháng`;
      } else {
        return `${parseFloat((price / 1e9).toFixed(2))} tỷ`;
      }
    },

    createConditionParamter (filter) {
      const conditions = { };
      // if(!filter.isPreview){
      //   conditions.status = { eq: "Publish"}
      // }
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

      if (filter.project?.id) {
        conditions.projectId = { eq: filter.project.id };
      }

      if (filter.priceRange) {
        const priceRange = filter.priceRange;
        conditions.price = {};

        const scale = filter.demand === 'Bán' ? 1e9 : 1e6;

        if (priceRange.from) {
          conditions.price.gte = priceRange.from * scale;
        }

        if (filter.priceRange.to) {
          conditions.price.lte = priceRange.to * scale;
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

      if (filter.directions && filter.directions.length > 0) {
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

      if (filter.bedroomOptions && filter.bedroomOptions.length > 0) {
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

.title-desktop {
  display: none;
}

.description {
  display: none;
}

.color-orange {
  color: #DB4F21;
}

.title-mobile {
   display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

@media (min-width: 768px) {
  .title-desktop {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #505050;
  }

  .title-mobile {
    display: none;
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.w-h-100 {
  width: 100px;
  height: 100px;
}

.item-flex-start {
  align-items: flex-start;
}

.ov-flow-hidden {
  overflow: hidden;
}

.color-a7a7a7{
    color: #a7a7a7;
}

.border-none {
  border: none;
}

</style>
