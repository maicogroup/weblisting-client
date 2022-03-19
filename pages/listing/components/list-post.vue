<template>
  <div id="post-subinfor" class="max-w-full grow">
    <div class="mt-2 mb-2">
      <h1 class="text-[21px] md:text-[24px] text-stone-900 font-bold">
        {{ this.heading }}
      </h1>
      <div class="flex justify-between md:block">
        <p class="text-[12px] text-neutral-400 flex items-center">
          Hiện có {{ totalItem }} bất động sản
        </p>
        <div class="block md:hidden">
          <div class="flex justify-between text-stone-900 z-10">
            <p class="text-[14px] text-stone-900 flex items-center mr-2">
              Sắp xếp:
            </p>
            <Dropdown
              item-width="150px"
              class="text-sm border border-stone-200 rounded-[5px]"
              :title="arrangeOption"
            >
              <DropdownItem @click="order(0)"> Giá cao nhất </DropdownItem>
              <DropdownItem @click="order(1)"> Giá thấp nhất </DropdownItem>
              <DropdownItem @click="order(2)"> Mới nhất </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
      <div class="hidden md:flex w-full mt-[1rem] text-sm">
        <div class="text-[12px] text-stone-900 py-[0.05rem]">Sắp xếp:</div>
        <div class="flex ml-1">
          <div
            :class="`
              px-3
              py-[0.05rem]
              border
              rounded-[2px]
              text-[12px] 
              ${currentOrder == 3 ? 'text-green-600' : 'text-stone-900'}
              ${currentOrder == 3 ? 'border-green-600' : 'border-stone-200'}
              hover:border-green-600 hover:text-green-600 hover:cursor-pointer
              mx-1
            `"
            @click="order(3)"
          >
            Mặc định
          </div>
          <div
            :class="`
              px-3
              py-[0.05rem]
              border 
              rounded-[2px]
              text-[12px] 
              ${currentOrder == 2 ? 'text-green-600' : 'text-stone-900'}
              ${currentOrder == 2 ? 'border-green-600' : 'border-stone-200'}
              hover:border-green-600 hover:text-green-600 hover:cursor-pointer
              mx-1
            `"
            @click="order(2)"
          >
            Mới nhất
          </div>
          <div
            :class="`
              px-3
              py-[0.05rem]
              border 
              rounded-[2px]
              text-[12px] 
              ${currentOrder == 0 ? 'text-green-600' : 'text-stone-900'}
              ${currentOrder == 0 ? 'border-green-600' : 'border-stone-200'}
              hover:border-green-600 hover:text-green-600 hover:cursor-pointer
              mx-1
            `"
            @click="order(0)"
          >
            Giá cao nhất
          </div>
          <div
            :class="`
              px-3
              py-[0.05rem]
              border 
              rounded-[2px]
              text-[12px]
              ${currentOrder == 1 ? 'text-green-600' : 'text-stone-900'}
              ${currentOrder == 1 ? 'border-green-600' : 'border-stone-200'}
              hover:border-green-600 hover:text-green-600 hover:cursor-pointer
              mx-1
            `"
            @click="order(1)"
          >
            Giá thấp nhất
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <div
        v-for="post in posts"
        :key="post.id"
        class="mb-2 md:pt-0 md:border-none border border-stone-200 rounded-[4px] md:rouded-0"
      >
        <div
          class="
            md:flex
            md:item-flex-start
            md:space-x-4 md:border
            md:mt-2
            md:pr-3
            md:rounded-lg
            overflow-hidden
          "
        >
          <NuxtLink
            class="
              w-full
              h-32
              md:w-64 md:h-[160px]
              shrink-0
              relative
              project
              overflow-hidden
            "
            :to="`/chi-tiet-can-ho/${post.pageInfor.slug}`"
          >
            <img
              class="w-full h-[200px] object-cover rounded-t-[4px] md:rounded-l-lg md:rounded-tr-none "
              :src="post.srcimage"
              alt="Bonnie image"
            />
             <!--DÙNG ĐỂ TEST LÚC KO CÓ POST.TAGS -->
             <!-- <div class="diagonal badge bg-green-600" v-if="post.tags && post.tags.length || true">{{"Giá tốt" || post.tags[0]}}</div>  -->
            <div
              class="diagonal badge bg-green-600"
              v-if="post.tags && post.tags.length"
            >
              {{ post.tags[0] }}
            </div>
          </NuxtLink>
          <div class="flex flex-col justify-between h-[100px] md:h-[140px] w-full relative">
            <div class="p-2 md:p-0">
              <NuxtLink
                :to="`/chi-tiet-can-ho/${post.pageInfor.slug}`"
                class="hidden md:block mt-3 color-black font-bold"
              >
                {{ post.pageInfor.title }}
              </NuxtLink>

              <span class="text-neutral-400 mb-2 md:mb-0 md:mt-3 text-sm absolute md:relative bottom-0 max-w-[70%] md:max-w-[100vw] truncate">{{
                post.address
              }}</span>

              <NuxtLink
                :to="`/chi-tiet-can-ho/${post.pageInfor.slug}`"
                class="
                  title-mobile
                  absolute
                  top-7
                  text-[12px]
                  text-stone-900
                "
              >
                {{ post.pageInfor.title }}
              </NuxtLink>
              <div class="flex my-1 md:my-3 text-[14px] absolute top-0 right-1 md:relative">
                  <div class="flex" v-if="post.type === 'Căn hộ'">
                    <div class="flex items-center justify-center">
                      <svg
                        width="18"
                        height="12"
                        viewBox="0 0 18 12"
                        fill=""
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.1 4.95429V2.57143C17.1 1.15714 15.885 0 14.4 0H10.8C10.107 0 9.477 0.257143 9 0.668572C8.523 0.257143 7.893 0 7.2 0H3.6C2.115 0 0.9 1.15714 0.9 2.57143V4.95429C0.351 5.42571 0 6.10286 0 6.85714V12H1.8V10.2857H16.2V12H18V6.85714C18 6.10286 17.649 5.42571 17.1 4.95429ZM10.8 1.71429H14.4C14.895 1.71429 15.3 2.1 15.3 2.57143V4.28571H9.9V2.57143C9.9 2.1 10.305 1.71429 10.8 1.71429ZM2.7 2.57143C2.7 2.1 3.105 1.71429 3.6 1.71429H7.2C7.695 1.71429 8.1 2.1 8.1 2.57143V4.28571H2.7V2.57143ZM1.8 8.57143V6.85714C1.8 6.38571 2.205 6 2.7 6H15.3C15.795 6 16.2 6.38571 16.2 6.85714V8.57143H1.8Z"
                          fill="#5C5C5C"
                        />
                      </svg>
                    </div>
                    <div class="ml-2 text-neutral-400">
                      {{ post.totalBedRoom }}
                    </div>
                  </div>
                  <div v-if="post.type === 'Căn hộ'" class="mx-2">·</div>

                  <div v-if="post.type === 'Căn hộ'" class="flex">
                    <div class="flex items-center justify-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4 7.2V7.8C11.4 8.946 10.758 9.942 9.81 10.446L10.2 12H9L8.7 10.8H3.3L3 12H1.8L2.19 10.446C1.70951 10.1911 1.30758 9.81008 1.02744 9.34387C0.747286 8.87766 0.599511 8.34391 0.6 7.8V7.2H0V6H10.8V1.8C10.8 1.64087 10.7368 1.48826 10.6243 1.37574C10.5117 1.26321 10.3591 1.2 10.2 1.2C9.9 1.2 9.672 1.404 9.6 1.674C9.978 1.998 10.2 2.478 10.2 3H6.6C6.6 2.52261 6.78964 2.06477 7.12721 1.72721C7.46477 1.38964 7.92261 1.2 8.4 1.2H8.502C8.748 0.504 9.414 0 10.2 0C10.6774 0 11.1352 0.189642 11.4728 0.527208C11.8104 0.864773 12 1.32261 12 1.8V7.2H11.4ZM10.2 7.2H1.8V7.8C1.8 8.27739 1.98964 8.73523 2.32721 9.07279C2.66477 9.41036 3.12261 9.6 3.6 9.6H8.4C8.87739 9.6 9.33523 9.41036 9.67279 9.07279C10.0104 8.73523 10.2 8.27739 10.2 7.8V7.2Z"
                          fill="#4D5056"
                        />
                      </svg>
                    </div>
                    <div class="ml-2 text-neutral-400">{{ post.totalWC }}</div>
                  </div>
                <div v-if="post.type != 'Căn hộ'">
                  <div class="ml-2 text-neutral-900">{{ post.type }}</div>
                </div>
                <div class="mx-2 text-[#838383]">·</div>

                <div class="flex">
                  <div class="flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.33333 0H0V1.33333H1.33333V0ZM2.66667 0H4V1.33333H2.66667V0ZM6.66667 0H5.33333V1.33333H6.66667V0ZM8 0H9.33333V1.33333H8V0ZM10.6667 0H12V1.33333H10.6667V0ZM0 2.66667H1.33333V4H0V2.66667ZM1.33333 5.33333H0V6.66667H1.33333V5.33333ZM0 8H1.33333V9.33333H0V8ZM1.33333 10.6667H0V12H1.33333V10.6667ZM2.66667 10.6667H4V12H2.66667V10.6667ZM6.66667 10.6667H5.33333V12H6.66667V10.6667ZM10.6667 5.33333H12V6.66667H10.6667V5.33333ZM12 2.66667H10.6667V4H12V2.66667ZM8 9.33333V8H12V9.33333H10.6667V10.6667H9.33333V12H8V9.33333ZM10.6667 10.6667V12H12V10.6667H10.6667Z"
                        fill="#4D5056"
                      />
                    </svg>
                  </div>
                  <div class="ml-2 text-neutral-400">{{ post.acreage }}</div>
                </div>
              </div>
            </div>
            <div class="mb-2 mt-4 flex justify-between items-end w-full">
              <div class="font-bold text-[20px] text-stone-900 absolute md:relative top-0 left-0 ml-1 md:ml-0">
                {{ post.price }}
              </div>
              <div
                v-if="post.tags != null"
                class="inline-flex space-x-1 items-center"
              >
                <p
                  v-for="item in post.tags"
                  :key="item"
                  class="
                    text-xs
                    font-bold
                    leading-sm
                    uppercase
                    px-3
                    py-1
                    bg-red-400
                    text-white
                    rounded-full
                  "
                >
                  {{ item }}
                </p>
              </div>
              <div v-else />
              <p class="text-sm text-neutral-400 mr-2 md:ml-0">
                {{ post.date }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <pagination
        :total="totalItem"
        :per-page="10"
        :current-page="pageIndex"
        @pagechanged="pageNavigationTo"
      />
    </div>
  </div>
</template>

<script>
import { gql } from "graphql-tag";
// import pagination from '~/pages/components/pagination.vue';
// import Dropdown from '~/pages/components/Dropdown/Dropdown.vue';
// import DropdownItem from '~/pages/components/Dropdown/DropdownItem.vue';

const getPostsQuery = gql`
  query GetPostWithPagination(
    $condition: PostCollectionFilterInput
    $skipItems: Int
    $take: Int
    $order: [PostCollectionSortInput!]
  ) {
    postsWithPagination(
      take: $take
      skip: $skipItems
      where: $condition
      order: $order
    ) {
      items {
        id
        pageInfor {
          title
          slug
          metaDescription
        }
        gallery
        price
        description
        demand
        status
        acreage
        type
        totalBedRoom
        totalWC
        apartmentState
        tags
        project {
          address {
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
  }
`;

export default {
  name: "ListPost",
  props: ["filter", "heading"],
  data() {
    return {
      pageIndex: 1,
      pageOfItems: [],
      arrangeOption: "Mặc định",
      currentOrder: 3,
    };
  },
  apollo: {
    postsData: {
      query() {
        return getPostsQuery;
      },
      update: (data) => data.postsWithPagination,
      variables() {
        const condition = this.createConditionParamter(this.filter);
        const noFilter = Object.keys(condition).length === 0;

        return {
          condition: noFilter ? undefined : condition,
          take: 10,
        };
      },
    },
  },
  computed: {
    posts() {
      if (this.postsData == null) {
        return [];
      } else {
        return this.postsData.items.map((item) => {
          return {
            srcimage:
              "https://maico-hub-record.ss-hn-1.bizflycloud.vn/" +
              (item.gallery.find((c) => !c.includes(".mp4")) ||
                "apartment-resource/00800a5f-eb0c-4c6f-93ad-1c28e03b70dc/17-01-2022_0953/image/z3116547105303_32a851d4f5d44bca12e64ac1a09e6a6d.jpg"),
            pageInfor: item.pageInfor,
            price: this.formatPrice(item.price),
            totalBedRoom: item.totalBedRoom,
            totalWC: item.totalWC,
            acreage: item.acreage + "m²",
            roomStructure:
              item.type !== "Căn hộ"
                ? item.type
                : item.totalBedRoom + "PN" + item.totalWC + "WC",
            address:
              item.project?.address.street +
              ", " +
              item.project?.address.district +
              ", " +
              item.project?.address.city,
            description: this.formatDescription(item.description),
            date: this.formatDate(item.lastUpdatedAt),
            tags: item.tags,
            id: item.id,
            type: item.type
          };
        });
      }
    },
    totalItem() {
      if (this.postsData == null) {
        return 0;
      } else {
        return this.postsData.totalCount;
      }
    },
  },
  watch: {
    filter(filter) {
      const condition = this.createConditionParamter(filter);
      const noFilter = Object.keys(condition).length === 0;

      this.$apollo.queries.postsData.refetch({
        condition: noFilter ? undefined : condition,
        skipItems: 0,
      });
      this.pageIndex = 1;
    },
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      const diffInDays = Math.floor((Date.now() - date.getTime()) / 86400000);

      if (diffInDays === 0) {
        return "Hôm nay";
      }

      if (diffInDays === 1) {
        return "Hôm qua";
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

    formatDescription(description) {
      // document không tồn tại ở bên server
      let content;
      if (process.server) {
        content = description;
      } else {
        const span = document.createElement("span");
        span.innerHTML = description;
        content = span.textContent;
      }
      return content;
    },

    formatPrice(price) {
      if (price < 100000000) {
        return `${price / 1e6} triệu/tháng`;
      } else {
        return `${parseFloat((price / 1e9).toFixed(2))} tỷ`;
      }
    },

    createConditionParamter(filter) {
      const conditions = {};
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

        const scale = filter.demand === "Bán" ? 1e9 : 1e6;

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
          in: filter.directions,
        };
      }

      if (filter.type) {
        conditions.type = {};

        if (filter.type === "Căn hộ chung cư") {
          conditions.type.eq = "Căn hộ";
        } else {
          conditions.type.eq = filter.type;
        }
      }

      if (filter.bedroomOptions && filter.bedroomOptions.length > 0) {
        conditions.or = [];
        if (filter.bedroomOptions.includes("5+")) {
          conditions.or.push({ totalBedRoom: { gte: 5 } });
        }

        const fixedBedroomOptions = filter.bedroomOptions
          .filter((o) => o !== "5+")
          .map((o) => parseInt(o));
        if (fixedBedroomOptions.length !== 0) {
          conditions.or.push({ totalBedRoom: { in: fixedBedroomOptions } });
        }
      }

      return conditions;
    },

    pageNavigationTo(index) {
      this.$apollo.queries.postsData.refetch({
        skipItems: 10 * (index - 1),
      });
      this.pageIndex = index;
      // const yOffset = -10;
      // const element = document.getElementById('post-subinfor');
      // const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      // window.scrollTo({top: y, behavior: 'smooth'});
      document.getElementById("post-subinfor").scrollIntoView(true);
    },
    order(orderConditionIndex) {
      if (this.currentOrder == orderConditionIndex) return;
      this.currentOrder = orderConditionIndex;
      let orderCondition = {};
      if (orderConditionIndex === 0) {
        orderCondition.price = "DESC";
        this.arrangeOption = "Giá Cao Nhất";
      } else if (orderConditionIndex === 1) {
        orderCondition.price = "ASC";
        this.arrangeOption = "Giá Thấp Nhất";
      } else if (orderConditionIndex === 2) {
        orderCondition.lastUpdatedAt = "DESC";
        this.arrangeOption = "Mới Nhất";
      } else {
        orderCondition = undefined;
      }
      this.$apollo.queries.postsData.refetch({
        order: orderCondition,
        skipItems: 0,
      });
      this.pageIndex = 1;
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
  },
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
  color: #db4f21;
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

.color-a7a7a7 {
  color: #a7a7a7;
}

.border-none {
  border: none;
}

.project {
  position: relative;
}
.project .badge.diagonal {
  white-space: nowrap;
  position: absolute;
  padding: 5px 100px;
  min-width: 200px;
  transform: rotate(-45deg) translate(-33%, -50px);
  color: white;
  text-align: center;
  text-transform: uppercase;
  font-size: 10px;
  top: 0px;
  box-sizing: border-box;
}
</style>
