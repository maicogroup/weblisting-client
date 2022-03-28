<template>
  <div>
    <div class="h-96 w-full">
      <gallery :items="gallery" />
    </div>
    <div class="mx-5 lg:mx-0">
      <h1 class="mt-6 font-bold text-2xl">
        {{ post.pageInfor.title }}
      </h1>
      <div
        class="
          mt-3
          flex flex-col
          md:flex-row md:justify-between md:max-h-6
          overflow-hidden
        "
      >
        <h4
          class="
            font-normal
            color-3f3f3f
            text-sm
            leading-4
            md:max-h-4
            min-w-[50%]
          "
        >
          {{
            `${post.project.address.street}, ${post.project.address.district}, ${post.project.address.city}`
          }}
        </h4>
        <div class="mt-2 md:mt-0 flex space-x-2">
          <client-only>
            <div
              class="zalo-share-button"
              :data-href="shareUrl"
              data-oaid="579745863508352884"
              data-layout="1"
              data-color="blue"
              data-customize="false"
            />

            <facebook-share-button
              style="line-height: 0"
              :share-url="shareUrl"
            />
            <button
              class="copy-link hover:text-gray-600"
              :data-clipboard-text="shareUrl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </button>
          </client-only>
        </div>
      </div>

      <divider class="my-4" />

      <div class="flex justify-between items-center mb-4">
        <h3 class="font-bold text-lg leading-5">Mô tả căn hộ</h3>
        <div class="text-sm font-medium">
          <span class="text-gray-400">Mã bất động sản:</span>
          <span class="re-properties-content">{{
            post.pageInfor.slug.slice(-5)
          }}</span>
        </div>
      </div>
      <div class="grid md:grid-cols-2 grid-cols-1 md:gap-6 h-auto">
        <div class="hidden md:block">
          <p class="re-properties-frame">
            <span class="re-properties">Giá</span>
            <span class="re-properties-content">
              {{ formatPrice(post.price, post.demand) }}</span
            >
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Phòng tắm</span>
            <span class="re-properties-content"> {{ post.totalWC ? post.totalWC : '-'}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Diện tích sử dụng</span>
            <span class="re-properties-content">
              {{ post.usageAcreage }} m<sup>2</sup></span
            >
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Block</span>
            <span class="re-properties-content"> {{ post.block }}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Hướng cửa</span>
            <span class="re-properties-content"> {{ post.doorDirection }}</span>
          </p>
          <p class="re-properties-frame-last">
            <span class="re-properties">Đặc điểm khác</span>
            <span class="re-properties-content">
              {{ post.otherSpecification }}</span
            >
          </p>
        </div>
        <div class="hidden md:block">
          <p class="re-properties-frame">
            <span class="re-properties">Phòng ngủ</span>
            <span class="re-properties-content"> {{ post.totalBedRoom ? post.totalBedRoom : '-'  }}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Diện tích</span>
            <span class="re-properties-content">
              {{ post.acreage }} m<sup>2</sup></span
            >
          </p>
          <!-- <p class="re-properties-frame">
            <span class="re-properties">Tầng</span>
            <span class="re-properties-content"> {{ post.floor }}</span>
          </p> -->
          <p class="re-properties-frame">
            <span class="re-properties">Hướng nhà</span>
            <span class="re-properties-content"> {{ post.direction }}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Pháp lý</span>
            <span class="re-properties-content">
              {{ post.project.juridical }}</span
            >
          </p>
          <p class="re-properties-frame-last">
            <span class="re-properties">View</span>
            <span class="re-properties-content"> {{ post.view }}</span>
          </p>
        </div>
        <div class="md:hidden">
          <p class="re-properties-frame">
            <span class="re-properties">Giá</span>
            <span class="re-properties-content">
              {{ formatPrice(post.price, post.demand) }}</span
            >
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Phòng ngủ</span>
            <span class="re-properties-content"> {{ post.totalBedRoom ? post.totalBedRoom : '-' }}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Phòng tắm</span>
            <span class="re-properties-content"> {{ post.totalWC ? post.totalWC : '-'}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Diện tích</span>
            <span class="re-properties-content">
              {{ post.acreage }} m<sup>2</sup></span
            >
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Diện tích sử dụng</span>
            <span class="re-properties-content">
              {{ post.usageAcreage }} m<sup>2</sup></span
            >
          </p>
          <!-- <p class="re-properties-frame">
            <span class="re-properties">Tầng</span>
            <span class="re-properties-content"> {{ post.floor }}</span>
          </p> -->
          <p class="re-properties-frame">
            <span class="re-properties">Block</span>
            <span class="re-properties-content"> {{ post.block }}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Hướng nhà</span>
            <span class="re-properties-content"> {{ post.direction }}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Hướng cửa</span>
            <span class="re-properties-content"> {{ post.doorDirection }}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Pháp lý</span>
            <span class="re-properties-content">
              {{ post.project.juridical }}</span
            >
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Đặc điểm khác</span>
            <span class="re-properties-content">
              {{ post.otherSpecification }}</span
            >
          </p>
          <p class="re-properties-frame-last">
            <span class="re-properties">View</span>
            <span class="re-properties-content"> {{ post.view }}</span>
          </p>
        </div>
      </div>

      <divider />

      <div class="my-5 flex float-left w-full h-auto">
        <h3 class="re-properties mt-1.5">Nội thất</h3>
        <div class="flex flex-wrap items-center gap-2">
          <div v-for="item in post.furnitures" :key="item">
            <div
              v-if="item == 'Trống' || item == 'Ko'"
              class="btn red-furnitures"
            >
              {{ item }}
            </div>
            <div v-else-if="item == 'Full'" class="btn green-furnitures">
              Đầy đủ
            </div>
            <div v-else class="btn green-furnitures">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 class="font-bold text-lg leading-5 my-5">Ưu điểm dự án</h3>
        <div class="grid grid-cols-1 md:grid-cols-5 mb-3 text-sm">
          <p class="font-bold">Tiện ích vị trí</p>
          <p class="col-span-4 mt-1 md:mt-0">
            {{ post.project.utilities.locationUtilities }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-5 mb-3 text-sm">
          <p class="font-bold">Tiện ích nội khu</p>
          <p class="col-span-4 mt-1 md:mt-0">
            {{ post.project.utilities.internalUtilities }}
          </p>
        </div>
      </div>
      <h3 class="font-bold text-lg leading-5 mt-8 mb-4">Thông tin dự án</h3>

      <ProjectHeader2
        v-if="project"
        :project="project"
        :projectUrl="post.project.pageInfors[0].slug"
      />

      <h3 class="font-bold text-lg leading-5 mt-8 mb-4">Xem trên bản đồ</h3>
      <iframe
        :src="`${post.project.address.googleMapLocation}`"
        class="w-full h-64 mt-4"
        loading="lazy"
      />
      <div class="lg:hidden mx-0 mt-5 mb-3">
        <h3 class="font-bold text-lg leading-5">Liên hệ</h3>
        <div class="mb-4 flex flex-col items-center">
          <img
            class="
              inline-block
              object-cover
              h-14
              w-14
              rounded-full
              border border-gray
            "
            src="~/static/images/maico-contact-infor.png"
            alt="avatar"
          />
          <p class="mt-1 text-sm text-green-600 font-bold leading-4">MAICO</p>
          <a
            href="tel:0938140024"
            class="
              mt-3
              w-full
              rounded-md
              h-10
              border
              bg-green-600
              hover:bg-green-700
              text-white text-sm
              font-bold
              flex
              items-center
              justify-center
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-1 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 3h5m0 0v5m0-5l-6 6M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
              />
            </svg>
            <p>0938 140 024</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FacebookShareButton from "./facebook-share-button.vue";
import { gql } from "graphql-tag";
import ProjectHeader2 from "../../components/project-header-detail-page.vue";

let zaloScriptLoaded = false;

export default {
  name: "DetailPost",
  components: { FacebookShareButton, ProjectHeader2 },
  props: ["post"],
  head() {
    const skip = zaloScriptLoaded;

    return {
      script: [
        {
          once: true,
          hid: "clipboardJS",
          src: "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.10/clipboard.min.js",
          body: true,
          // eslint-disable-next-line no-new, no-undef
          callback: () => new ClipboardJS(".copy-link"),
        },
        {
          once: true,
          skip,
          hid: "zaloShareButton",
          src: "https://sp.zalo.me/plugins/sdk.js",
          body: true,
          callback: () => {
            zaloScriptLoaded = true;
          },
        },
      ],
    };
  },

  apollo: {
    project: {
      query() {
        return gql`
          query GetProjects($slug: String!) {
            projects(where: { pageInfors: { some: { slug: { eq: $slug } } } }) {
              id
              projectName
              address {
                street
                district
                city
                googleMapLocation
              }
              description
              images
              sEOContent
              pageInfors {
                title
                slug
                metaDescription
              }
            }
          }
        `;
      },

      update(data) {
        if (data.projects.length === 0) {
          this.$router.push({ path: "/" }).catch(() => {});
          return;
        }

        const project = data.projects[0];

        this.filter = {
          ...this.filter,
          project: {
            pageInfor: { slug: this.post.project.pageInfors[0].slug },
            id: project.id,
            projectName: project.projectName,
          },
        };
        this.inputFilter = { ...this.filter };

        return project;
      },

      skip() {
        // return this.filter === null || this.$route.params.slug === null;
        return (
          this.post.project.pageInfors.length == 0 ||
          this.post.project.pageInfors[0].slug === undefined
        );
      },

      variables() {
        return {
          slug: this.post.project.pageInfors[0].slug,
        };
      },
    },
  },

  computed: {
    gallery() {
      const items = this.post.gallery.map(
        (i) => "https://maico-hub-record.ss-hn-1.bizflycloud.vn/" + i
      );
      return items.sort(function (x, y) {
        return x.includes("mp4") ? 1 : y.includes("mp4") ? -1 : 0;
      });
    },
    shareUrl() {
      return process.client ? window.location.href : null;
    },
  },

  mounted() {
    if (zaloScriptLoaded) {
      // https://developers.zalo.me/docs/social/share
      // eslint-disable-next-line no-undef
      setTimeout(() => ZaloSocialSDK.reload(), 100);
    }
    console.log(this.post);
    console.log(this.project);
  },

  methods: {
    formatPrice(price, demand) {
      if (demand === "Cho Thuê") {
        return `${price / 1e6} triệu/tháng`;
      } else {
        return `${parseFloat((price / 1e9).toFixed(2))} tỷ`;
      }
    },
    featureNotSupported() {
      this.$toast.show(
        "Tính năng này đang được hoàn thiện, cảm ơn bạn đã nhấn",
        {
          type: "success",
          theme: "bubble",
          duration: 4000,
          position: "top-center",
        }
      );
    },
  },
};
</script>

<style scoped>
.color-3f3f3f {
  color: #3f3f3f;
}
.color-8c8c8c {
  color: #8c8c8c;
}
.bcolor-e5e5e5 {
  background-color: #e5e5e5;
}
.color-5a5a5a {
  color: #5a5a5a;
}
.bd-color-858585 {
  border-color: #858585;
}
.re-properties-frame {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #e7e5e4;
  padding-bottom: 15px;
  margin-top: 15px;
}

.re-properties-frame-last {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 15px;
  margin-top: 15px;
}

.re-properties {
  flex-shrink: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #999999;
  margin-right: 8px;
}
.re-properties-content {
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #505050;
      margin-top: 5px;
    margin-bottom: 5px;
}
.btn {
  padding: 5px 15px;
  border: 1px solid black;
  background-color: white;
  color: black;
  float: left;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  border-radius: 5px;
}
.green-furnitures {
  color: #16a34a;
  border-color: #16a34a;
}
.red-furnitures {
  color: #ef4444;
  border-color: #ef4444;
}

.zalo-share-button {
  z-index: 10;
}
</style>
