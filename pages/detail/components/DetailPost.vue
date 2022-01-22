<template>
  <div>
    <div>
      <img class="h-96 w-full" src="data:image/jpeg;base64,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" alt="elvis">
    </div>
    <h3 class="mt-5 lg:mt-6 lg:mx-0 mx-5 font-bold text-lg leading-5 ov-flow-hidden truncate ... ">
      THONG TIN RAO BAN HOAC THUE CAN HO THONG TIN RAO BAN HOAC THUE CAN HO
    </h3>
    <h4 class="lg:mx-0 mx-5 mt-3 font-normal color-3f3f3f text-sm leading-4">
      Pho Le Van Huu, Phuong Ben Nghe, Quan 1, Ho Chi Minh
    </h4>
    <div class="lg:mx-0 mx-5 lg:w-5/6 bd-color-858585 flex justify-start mt-3 text-sm leading-4 border-t border-b border-zinc-800 pb-7 pt-6 border-solid">
      <div class="lg:mr-11 mr-9">
        <h4 class="font-normal color-8c8c8c w-14">
          Mức giá
        </h4>
        <p class="font-bold">
          130 tỷ
        </p>
      </div>
      <div class="lg:mr-11 mr-9">
        <h4 class="font-normal color-8c8c8c w-14">
          Diện tích
        </h4>
        <p class="font-bold">
          35 m²
        </p>
      </div>
      <div class="lg:mr-11 mr-6">
        <h4 class="font-normal color-8c8c8c w-20">
          Phòng ngủ
        </h4>
        <p class="font-bold">
          5 PN
        </p>
      </div>
      <div>
        <h4 class="font-normal color-8c8c8c">
          Hướng
        </h4>
        <p class="font-bold">
          Dong Nam
        </p>
      </div>
    </div>
    <h3 class="lg:mx-0 mx-5 font-bold text-lg leading-5 mt-6 mb-2.5">
      Thông tin mô tả
    </h3>
    <p class="lg:mx-0 mx-5">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
    </p>
    <h3 class="lg:mx-0 mx-5 font-bold text-lg leading-5 mt-3 mb-3.5">
      Đặc điểm bất động sản
    </h3>
    <div class="lg:px-0 px-5">
      <table class="lg:mx-0 w-full table-fixed h-36 text-sm leading-4">
        <tbody>
          <tr class="border border-solid h-10">
            <td class="lg:w-1/6 w-2/6 lg:pl-8 pl-3.5 font-bold">
              Nhu cầu:
            </td>
            <td class="lg:w-5/6 w-4/6">
              Cho thuê
            </td>
          </tr>
          <tr class="border border-solid">
            <td class="lg:pl-8 pl-3.5 font-bold">
              Địa chỉ:
            </td>
            <td class="">
              Phố Lê Văn Hưu, Phường Bến Nghé, Quận 1, Hồ Chí Minh.
            </td>
          </tr>
          <tr class="border border-solid h-10">
            <td class="lg:pl-8 pl-3.5 font-bold">
              Pháp lý:
            </td>
            <td class="">
              Sổ đỏ/Sổ hồng
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3 class="lg:mx-0 mx-5 font-bold text-lg leading-5 lg:mt-8 mt-6 mb-4">
      Xem trên bản đồ
    </h3>
    <div class="lg:px-0 px-5">
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d42610.204593541435!2d105.84343352175317!3d9.681785323100865!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a057375062c715%3A0xfcbaaab199800a47!2zQ2jhu6MgVGhp4buHbiBN4bu5!5e0!3m2!1svi!2s!4v1642734184718!5m2!1svi!2s" class="lg:mx-0 w-full h-52 lg:h-64 mt-4" loading="lazy" />
    </div>
    <div class="lg:hidden mx-5 mt-5 mb-3">
      <h3 class="font-bold text-lg leading-5 mb-4">
        Liên hệ
      </h3>
      <div>
        <div class="items-center flex flex-row mb-4">
          <img
            class="h-14 w-14 mr-3.5 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          >
          <h3 class="text-sm color-707070 leading-4 font-bold">
            Team IT vô đối
          </h3>
        </div>
        <button class="bd-color-858585 color-707070 rounded w-full h-10 border text-sm font-bold mb-7">
          Yêu cầu liên hệ lại
        </button>
        <div class="w-full border-b bd-color-858585" />
      </div>
    </div>
    <h3 class="lg:mx-0 mx-5 font-bold text-lg leading-5 mt-6 lg:mt-5 mb-3">
      Tìm kiếm theo từ khóa
    </h3>
    <div class="mb-8 lg:mb-10 lg:mx-0 mx-5">
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
    <div class="lg:hidden px-5">
      <div class="w-full border-b bd-color-858585 mb-8" />
      <button class="mb-7 bd-color-858585 color-707070 rounded w-full h-10 border text-sm font-bold flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Báo cáo
      </button>
    </div>
  </div>
</template>

<script>

export default ({
  name: 'DetailPost'
});
</script>

<style scoped>
  .color-3f3f3f{
    color: #3F3F3F;
  }

  .color-707070{
  color: #707070;
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
