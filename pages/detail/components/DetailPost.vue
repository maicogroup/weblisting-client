<template>
  <div v-if="post != null">
    <div class="h-96 w-full">
      <gallery :items="gallery"/>
    </div>
    <h1 class="mt-6 lg:mx-0 mx-5 font-bold text-2xl leading-5 ov-flow-hidden truncate ... ">
      {{ post.pageInfor.title }}
    </h1>
    <h4 class="lg:mx-0 mx-5 mt-3 font-normal color-3f3f3f text-sm leading-4">
      {{`${post.project.address.street}, ${post.project.address.district}, ${post.project.address.city}`}}
    </h4>
    <div class="lg:mx-0 mx-5 w-5/6 bd-color-858585 flex justify-start mt-3 text-sm leading-4 border-t border-b border-zinc-800 pb-7 pt-6 border-solid">
      <div class="mr-11">
        <h4 class="font-normal color-8c8c8c">
          Mức giá
        </h4>
        <p class="font-bold">
          {{ post.price }}
        </p>
      </div>
      <div class="mr-14">
        <h4 class="font-normal color-8c8c8c">
          Diện tích
        </h4>
        <p class="font-bold">
          {{ post.acreage}} m²
        </p>
      </div>
      <div class="mr-11">
        <h4 class="font-normal color-8c8c8c">
          Cơ cấu phòng
        </h4>
        <p class="font-bold">
          {{ post.roomStructure }}
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
    <h3 class="lg:mx-0 mx-5 font-bold text-lg leading-5 mt-6 mb-2.5">
      Thông tin mô tả
    </h3>
    <p class="lg:mx-0 mx-5" v-html="post.description">
    </p>
    <div>
      <h3 class="lg:mx-0 mx-5 font-bold text-lg leading-5 mt-3 mb-3.5">Nội thất</h3>
      <div class="grid md:grid-cols-3 sm:grid-cols-1">
        <div v-for="item in post.furnitures" :key="item">
          <div class="w-6/12 float-left text-sm bg-gray-50 border border-gray-200 border-solid p-4">
            {{ item }}
          </div>
          <div class="w-6/12 float-left border border-gray-200 border-solid p-4 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#32c82b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
        </div>
      </div>
    </div>
     <div>
      <h3 class="lg:mx-0 mx-5 font-bold text-lg leading-5 mt-3 mb-3.5">Tiện ích</h3>
      <div class="grid md:grid-cols-3 sm:grid-cols-1">
        <div v-for="item in post.project.utilities" :key="item">
          <div class="w-6/12 float-left text-sm bg-gray-50 border border-gray-200 border-solid p-4">
            {{ item }}
          </div>
          <div class="w-6/12 float-left border border-gray-200 border-solid p-4 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#32c82b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
        </div>
      </div>
    </div>
    <h3 class="lg:mx-0 mx-5 font-bold text-lg leading-5 mt-3 mb-3.5">
      Đặc điểm bất động sản
    </h3>
    <div>
      <table class="lg:mx-0 table-w mx-5 table-fixed h-36 text-sm leading-4">
        <tbody>
          <tr class="border border-solid h-10">
            <td class="w-1/6 pl-8 font-bold">
              Nhu cầu:
            </td>
            <td class="w-5/6">
              {{ post.demand }}
            </td>
          </tr>
          <tr class="border border-solid">
            <td class="pl-8 font-bold">
              Địa chỉ:
            </td>
            <td class="w-5/6">
              {{`${post.project.address.street}, ${post.project.address.district}, ${post.project.address.city}`}}
            </td>
          </tr>
          <tr class="border border-solid h-10">
            <td class="w-1/6 pl-8 font-bold">
              Pháp lý:
            </td>
            <td class="w-5/6">
              {{ post.project.juridical }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3 class="lg:mx-0 mx-5 font-bold text-lg leading-5 mt-8 mb-4">
      Đặc điểm bất động sản
    </h3>
    <iframe :src="`${post.project.address.googleMapLocation}`" class="lg:mx-0 table-w ml-5 h-64 mt-4" loading="lazy" />
    <h3 class="lg:mx-0 mx-5 font-bold text-lg leading-5 mt-5 mb-3">
      Tìm kiếm theo từ khóa
    </h3>
    <div class="mb-10 lg:mx-0 mx-5">
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
</template>

<script>



export default ({
  name: 'DetailPost',
  props:['post'],
  
  computed:{
    gallery(){
      this.post.gallery = this.post.gallery.map(i => 'https://maico-hub-record.ss-hn-1.bizflycloud.vn/' + i);
      return this.post.gallery.sort(function(x, y){
        return x.includes('mp4') ? 1 : y.includes('mp4') ? -1 : 0; 
      })
    },
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

  .table-w{
    width: 96%;
  }

  @media only screen and (min-width: 1024px) {
  .table-w {
    width: 100%;
  }
}
</style>
