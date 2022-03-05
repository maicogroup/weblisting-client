<template>
  <div v-if="post != null">
    <div class="h-96 w-full">
      <gallery :items="gallery" />
    </div>
    <div class="mx-5">
      <h1 class="mt-6 lg:mx-0  font-bold text-2xl">
        {{ post.pageInfor.title }}
      </h1>
      <div class="mt-3 flex flex-col md:flex-row md:justify-between">
        <h4 class="lg:mx-0 font-normal color-3f3f3f text-sm leading-4">
          {{ `${post.project.address.street}, ${post.project.address.district}, ${post.project.address.city}` }}
        </h4>
        <div class="mt-2 md:mt-0 flex space-x-2">
          <p class="leading-none color-3f3f3f text-sm font-bold">
            Chia sẻ qua:
          </p>
          <div
            class="zalo-share-button"
            :data-href="shareUrl"
            data-oaid="579745863508352884"
            data-layout="1"
            data-color="blue"
            data-customize="false"
          />

          <facebook-share-button style="line-height:0" :share-url="shareUrl" />
          <button class="copy-link hover:text-gray-600" :data-clipboard-text="shareUrl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
        </div>
      </div>
      <div class="lg:mx-0 w-full flex space-x-12  bd-color-858585 mt-3 text-sm leading-4 border-t border-b pb-7 pt-6 border-solid" style="border-color:#E5E5E5;">
        <div class="">
          <h4 class="font-normal color-8c8c8c">
            Mức giá
          </h4>
          <p class="font-bold">
            {{ formatPrice(post.price, post.demand) }}
          </p>
        </div>
        <div class="">
          <h4 class="font-normal color-8c8c8c">
            Diện tích
          </h4>
          <p class="font-bold">
            {{ post.acreage }} m²
          </p>
        </div>
        <div class="">
          <h4 class="font-normal color-8c8c8c">
            Cơ cấu phòng
          </h4>
          <p v-if="post.totalWC != 0" class="font-bold">
            {{ `${post.totalBedRoom}PN${post.totalWC}WC` }}
          </p>
          <p v-else class="font-bold">
            {{ post.type }}
          </p>
        </div>
        <div>
          <h4 class="font-normal color-8c8c8c">
            Hướng
          </h4>
          <p class="font-bold">
            {{ post.direction }}
          </p>
        </div>
      </div>
      <div class="flex justify-between items-center mt-5">
        <h3 class="lg:mx-0  font-bold text-lg leading-5 mt-3 mb-3.5">
          Mô tả căn hộ
        </h3>
        <div class="">
          <span class="text-gray-400">Mã bất động sản:</span> 
          <span class="re-properties-content">{{post.pageInfor.slug.slice(-5)}}</span>
        </div>
      </div>
      <div class="grid md:grid-cols-2 grid-cols-1 md:gap-6 h-auto">
        <div class="p-2 hidden md:block">
          <p class="re-properties-frame">
            <span class="re-properties">Giá</span>
            <span class="re-properties-content"> {{formatPrice(post.price, post.demand)}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Phòng tắm</span>
            <span class="re-properties-content"> {{post.totalWC}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Diện tích sử dụng</span>
            <span class="re-properties-content"> {{post.usageAcreage}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Block</span>
            <span class="re-properties-content"> {{post.block}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Hướng cửa</span>
            <span class="re-properties-content"> {{post.direction}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Đặc điểm khác</span>
            <span class="re-properties-content"> {{post.otherSpecification}}</span>
          </p>
        </div>
        <div class="p-2 hidden md:block">
          <p class="re-properties-frame">
            <span class="re-properties">Phòng ngủ</span>
            <span class="re-properties-content"> {{post.totalBedRoom}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Diện tích</span>
            <span class="re-properties-content"> {{post.acreage}} m<sup>2</sup></span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Tầng</span>
            <span class="re-properties-content"> {{post.floor}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Hướng nhà</span>
            <span class="re-properties-content"> {{post.viewDirection}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Pháp lý</span>
            <span class="re-properties-content"> {{post.project.juridical}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">View</span>
            <span class="re-properties-content"> {{post.view}}</span>
          </p>
        </div>
        <div class="p-2 md:hidden">
          <p class="re-properties-frame">
            <span class="re-properties">Giá</span>
            <span class="re-properties-content"> {{formatPrice(post.price, post.demand)}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Phòng ngủ</span>
            <span class="re-properties-content"> {{post.totalBedRoom}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Phòng tắm</span>
            <span class="re-properties-content"> {{post.totalWC}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Diện tích</span>
            <span class="re-properties-content"> {{post.acreage}} m<sup>2</sup></span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Diện tích sử dụng</span>
            <span class="re-properties-content"> {{post.usageAcreage}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Tầng</span>
            <span class="re-properties-content"> {{post.floor}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Block</span>
            <span class="re-properties-content"> {{post.block}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Hướng nhà</span>
            <span class="re-properties-content"> {{post.viewDirection}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Hướng cửa</span>
            <span class="re-properties-content"> {{post.direction}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Pháp lý</span>
            <span class="re-properties-content"> {{post.project.juridical}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">Đặc điểm khác</span>
            <span class="re-properties-content"> {{post.otherSpecification}}</span>
          </p>
          <p class="re-properties-frame">
            <span class="re-properties">View</span>
            <span class="re-properties-content"> {{post.view}}</span>
          </p>
        </div>
      </div>
      <div class="flex justify-start items-center space-x-3 float-left mb-2 w-full h-auto">
        <h3 class="re-properties pl-2 w-40 md:w-auto">
          Nội thất:
        </h3>
        <div class="flex flex-wrap justify-start items-center my-2">
        <div v-for="item in post.furnitures" :key="item" class="my-auto">
          <button v-if="item == 'Trống' || item == 'Ko'" class="btn red-furnitures my-1">{{item}}</button>
          <button v-else-if="item == 'Full'" class="btn green-furnitures my-1">Đầy đủ</button>
          <button v-else class="btn green-furnitures my-1">{{item}}</button>
        </div>
        </div>
      </div>
      <div>
        <h3 class="lg:mx-0  font-bold text-lg leading-5 mt-3 mb-3.5">
          Ưu điểm dự án
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-5 mb-3">
          <p class="re-properties pl-2">Tiện ích vị trí</p>
          <p class="col-span-4 text-justify pl-2 md:pl-0 font-medium" style="color: #5C5C5C;">Masteri Thảo Điền sẽ mang lại cho bạn và gia đình một cuộc sống đẳng cấp hoàn hảo thể hiện từ vị trí, phong cách sống, không gian thiên nhiên trong lành đến những tiện ích hiện đại và dịch vụ tiện nghi, tạo nên một môi trường sống lý tưởng, tạo dựng nền tảng và phát triển tương lai.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-5 mb-3">
          <p class="re-properties pl-2">Tiện ích nội khu</p>
          <p class="col-span-4 text-justify pl-2 md:pl-0 font-medium" style="color: #5C5C5C;">Masteri Thảo Điền sẽ mang lại cho bạn và gia đình một cuộc sống đẳng cấp hoàn hảo thể hiện từ vị trí, phong cách sống, không gian thiên nhiên trong lành đến những tiện ích hiện đại và dịch vụ tiện nghi, tạo nên một môi trường sống lý tưởng, tạo dựng nền tảng và phát triển tương lai.</p>
        </div>
      </div>
      <h3 class="lg:mx-0  font-bold text-lg leading-5 mt-8 mb-4">
        Xem trên bản đồ
      </h3>
      <iframe :src="`${post.project.address.googleMapLocation}`" class="w-full h-64 mt-4" loading="lazy" />
      <div class="lg:hidden mx-0 mt-5 mb-3">
        <h3 class="font-bold text-lg leading-5 mb-4">
          Liên hệ
        </h3>
        <div>
          <div class="items-center flex flex-row mb-4">
            <img
              class="h-14 w-14 mr-3.5 rounded-full ring-2 ring-white"
              src="http://crm.maicogroup.net/assets/images/logo.png"
              alt=""
            >
            <h3 class="text-sm color-707070 leading-4 font-bold">
              Maico
            </h3>
          </div>
          <button @click="featureNotSupported" class="bd-color-858585 color-707070 rounded w-full h-10 border text-sm font-bold mb-7">
            Yêu cầu liên hệ lại
          </button>
          <div class="w-full border-b bd-color-858585" />
        </div>
      </div>
      <h3 class="lg:mx-0  font-bold text-lg leading-5 mt-5 mb-3">
        Tìm kiếm theo từ khóa
      </h3>
      <div class="mb-10 lg:mx-0 ">
        <ul class="w-5/6">
          <li class="inline-block px-3 bcolor-e5e5e5 color-5a5a5a rounded-2xl mb-2.5">
            Cho thue chung cu quan 2
          </li>
          <li class="inline-block px-3 bcolor-e5e5e5 color-5a5a5a rounded-2xl mb-2.5">
            Cho thue chung cu quan 2 5PN
          </li>
          <li class="inline-block px-3 bcolor-e5e5e5 color-5a5a5a rounded-2xl mb-2.5">
            Cho thue chung cu quan 2 5PN
          </li>
          <li class="inline-block px-3 bcolor-e5e5e5 color-5a5a5a rounded-2xl mb-2.5">
            Cho thue chung cu quan 2
          </li>
        </ul>
      </div>
    </div>

    <script src="" />
  </div>
</template>

<script>
import FacebookShareButton from './facebook-share-button.vue';

export default ({
  name: 'DetailPost',
  components: { FacebookShareButton },
  props: ['post'],
  head: {
    script: [{
      hid: 'clipboardJS',
      src: 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.10/clipboard.min.js',
      body: true,
      // eslint-disable-next-line no-new, no-undef
      callback: () => new ClipboardJS('.copy-link')
    },
    {
      hid: 'zaloShareButton',
      src: 'https://sp.zalo.me/plugins/sdk.js',
      body: true
    }]
  },

  computed: {
    gallery () {
      const items = this.post.gallery.map(i => 'https://maico-hub-record.ss-hn-1.bizflycloud.vn/' + i);
      return items.sort(function (x, y) {
        return x.includes('mp4') ? 1 : y.includes('mp4') ? -1 : 0;
      });
    },
    shareUrl () {
      return 'http://listing.maicogroup.net' + this.$route.fullPath;
    }
  },

  methods: {
    formatPrice (price, demand) {
      if (demand === 'Cho Thuê') {
        return `${price / 1e6} triệu/tháng`;
      } else {
        return `${parseFloat((price / 1e9).toFixed(2))} tỷ`;
      }
    },
    featureNotSupported() {
      this.$toast.show("Tính năng này đang được hoàn thiện, cảm ơn bạn đã nhấn", {
        type: "success",
        theme: "bubble",
        duration: 4000,
        position: "top-center"
      });
    }
  }

});
</script>

<style scoped>
  .color-3f3f3f{
    color: #3F3F3F;
  }
  .color-8c8c8c{
    color: #8C8C8C;
  }
  .bcolor-e5e5e5{
    background-color: #E5E5E5;
  }
  .color-5a5a5a{
    color: #5A5A5A;
  }
  .bd-color-858585
  {
    border-color: #858585;
  }
  .re-properties-frame {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #E5E5E5;
    padding-bottom: 7px;
    margin-bottom:10px;

  }
  .re-properties {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #999999;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .re-properties-content {
    font-family: Roboto;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #505050;
  }
  .btn {
  width: 71px;
  height: 26px;
  border: 1px solid black;
  background-color: white;
  color: black;
  float:left;
  font-family: Roboto;
  font-style: normal;
  line-height: 16px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin-inline: 5px;
}
  .green-furnitures {
    color: green;
    border-color: #07A35D;
  }
  .red-furnitures {
    color: red;
    border-color: #FF375F;
  }
</style>
