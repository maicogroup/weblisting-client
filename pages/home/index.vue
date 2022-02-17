<template>
  <div class="w-full h-full">
    <div class="mb-0 md:mb-14 h-537px bg-color-E1EDF2A3 relative">
      <div class="text-center">
        <text class="inline-block mt-4 md:mt-12 text-sm md:text-4xl font-normal leading-10">
          An tâm với căn hộ xác thực tại MaicoGroup
        </text>
        <text class="block mt-3 md:mt-2 text-2xl md:text-4xl font-bold leading-10">
          Lựa chọn tổ ấm ưng ý bạn
        </text>
      </div>
      <div class="bg-color-ECECEC ml-auto mr-auto mt-6 md:mt-20 bg-inherit md:bg-zinc-500 md:border border-0 w-full md:w-4/5  lg:w-2/3 h-36 left-20per justify-center rounded-md">
        <div class="my-4 flex w-full mx-4 max-w-fill-available">
          <div class="md:inline hidden">
            <Dropdown class="white-drop-down-button" item-width="200px" title="Thuê" />
          </div>
          <div class="relative md:rounded-l-none rounded-l-md h-42px w-full">
            <input class="pl-6 md:rounded-l-none rounded-l-md h-42px w-full" type="text" placeholder="Tìm căn hộ">
            <svg
              class="hidden md:block absolute left-0 top-3"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#7A7A7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M19.0004 19L14.6504 14.65" stroke="#7A7A7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <button class="rounded-r-md text-lg leading-5 font-normal h-42px w-14 md:w-28 bg-color-C5C5C5 color-8C8C8C ">
            <h4 class="hidden md:block">
              Tìm kiếm
            </h4>
            <svg
              class="md:hidden block ml-auto mr-auto"
              width="20"
              height="23"
              viewBox="0 0 20 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 18.9062C13.4183 18.9062 17 14.9124 17 9.98571C17 5.05906 13.4183 1.06522 9 1.06522C4.58172 1.06522 1 5.05906 1 9.98571C1 14.9124 4.58172 18.9062 9 18.9062Z" stroke="#7A7A7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M19.0004 21.1364L14.6504 16.2859" stroke="#7A7A7A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
        <div class="md:block hidden ml-4">
          <Dropdown class="mr-4 home-drop-down" item-width="200px" title="Quận" />
          <Dropdown class="mr-4 home-drop-down" item-width="200px" title="Chung cư" />
          <Dropdown class="mr-4 home-drop-down" item-width="200px" title="Giá" />
          <Dropdown class="mr-4 home-drop-down" item-width="200px" title="Diện tích" />
          <Dropdown class="home-drop-down" item-width="200px" title="Hướng" />
        </div>
      </div>
    </div>
    <div class="block md:flex justify-around">
      <div class="flex md:justify-around justify-between items-baseline w-full">
        <div class="text-center block md:ml-0 ml-14">
          <img src="https://maicogroup.com/wp-content/uploads/2022/01/5-1448x2048.png" class="h-icon-maico w-icon-maico">
          <h3 class="font-bold text-sm md:text-lg">
            Minh bạch
          </h3>
        </div>
        <div class="text-center block max-w-152  mr-5 md:mr-0">
          <img class="block ml-auto mr-auto h-icon-maico w-icon-maico" src="https://maicogroup.com/wp-content/uploads/2022/01/6-1448x2048.png">
          <h3 class="font-bold text-sm md:text-lg">
            Thông tin đầy đủ, xác thực
          </h3>
        </div>
      </div>
      <div class="flex md:justify-around justify-between w-full">
        <div class="text-center block max-w-210 ml-5 md:ml-0">
          <img class="block ml-auto mr-auto h-icon-maico w-icon-maico" src="https://maicogroup.com/wp-content/uploads/2022/01/7-1-1448x2048.png">
          <h3 class="font-bold text-sm md:text-lg">
            Không ngừng phát triển mở rộng
          </h3>
        </div>
        <div class="text-center block mr-14 md:mr-0">
          <img src="https://maicogroup.com/wp-content/uploads/2022/01/8-1448x2048.png" class="h-icon-maico w-icon-maico">
          <h3 class="font-bold text-sm md:text-lg">
            Tử tế là cốt lõi
          </h3>
        </div>
      </div>
    </div>
    <h3 class="text-lg md:text-xl font-bold mt-6 md:mt-16 mb-2 ml-4 md:ml-36 mr-4 md:mr-36 border-t pt-8">
      Dự án nổi bật
    </h3>
    <div class="ml-4 md:ml-36 mr-4 md:mr-0">
      <ul class="flex flex-wrap  min-w-292px h-290px">
        <li v-for="item in outstanding_projects" :key="item" class="min-w-292px h-290px">
          <div class="border border-color-858585 rounded-md lg:mr-9 md:mr-4 mr-0 mb-6">
            <a href="#">
              <img src="https://kfa.vn/wp-content/uploads/2020/04/thiet-ke-noi-that-chung-cu-3-phong-ngu-07-1.jpg" class="min-w-292px h-36">
              <div class="text-center bg-color-FF9D9D">
                <h4 class="text-xs font-bold text-white">
                  {{ item.condition }}
                </h4>
              </div>
              <h4 class="ml-4 mt-4 font-bold text-lg">
                {{ item.name }}
              </h4>
              <h4 class="ml-4 mt-2 font-normal text-sm">
                {{ item.address }}
              </h4>
              <h4 class="ml-4 mt-3.5 font-bold text-sm">
                Giá: {{ item.from_price }}tr - {{ item.to_price }}tr/m²
              </h4>
            </a>
          </div>
        </li>
      </ul>
    </div>
    <a class="font-bold text-sm md:text-base text-blue-400" href="#">
      <div class="flex items-end mt-4 ml-4 md:ml-36">
        <h4>Xem thêm dự án </h4>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </div>
    </a>
    <div class="h-0 border-t ml-4 md:ml-36 mr-4 md:mr-36 mt-2" />
    <h3 class="mt-8 mb-2 text-lg md:text-xl font-bold ml-4 md:ml-36">
      Căn hộ giá tốt
    </h3>
    <div class="ml-4 md:ml-36 mr-4 md:mr-0">
      <ul class="flex flex-wrap">
        <li v-for="item in good_price" :key="item" class="min-w-min w-292px h-290px ">
          <div class="border border-color-858585 rounded-md mr-0 lg:mr-9 md:mr-4 mb-4 md:mb-8">
            <a href="#">
              <img src="https://kfa.vn/wp-content/uploads/2020/04/thiet-ke-noi-that-chung-cu-3-phong-ngu-07-1.jpg" class="min-w-292px h-36">
              <div class="text-center bg-color-C4A400">
                <h4 class="text-xs font-bold text-white">
                  {{ item.condition }}
                </h4>
              </div>
              <div class="flex justify-between mt-5">
                <h4 class="ml-4 font-bold text-lg">
                  {{ item.price }} tỷ
                </h4>
                <div class="flex mr-4">
                  <div class="mr-6 flex items-center">
                    <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.83301 7.66663C7.21634 7.66663 8.33301 6.54996 8.33301 5.16663C8.33301 3.78329 7.21634 2.66663 5.83301 2.66663C4.44967 2.66663 3.33301 3.78329 3.33301 5.16663C3.33301 6.54996 4.44967 7.66663 5.83301 7.66663ZM5.83301 4.33329C6.29134 4.33329 6.66634 4.70829 6.66634 5.16663C6.66634 5.62496 6.29134 5.99996 5.83301 5.99996C5.37467 5.99996 4.99967 5.62496 4.99967 5.16663C4.99967 4.70829 5.37467 4.33329 5.83301 4.33329ZM15.833 1.83329H9.16634V8.49996H2.49967V0.166626H0.833008V12.6666H2.49967V10.1666H17.4997V12.6666H19.1663V5.16663C19.1663 3.32496 17.6747 1.83329 15.833 1.83329ZM17.4997 8.49996H10.833V3.49996H15.833C16.7497 3.49996 17.4997 4.24996 17.4997 5.16663V8.49996Z" fill="#858585" />
                    </svg>
                    <h4 class="font-bold text-sm">
                      {{ item.room_numbers }}
                    </h4>
                  </div>
                  <div class="flex items-center">
                    <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0.125V3.125H1.275V3.575H1.725V3.125H3V1.775H3.225V1.325H3V0.125H0ZM12 0.125V1.325H11.775V1.775H12V3.125H13.275V3.575H13.725V3.125H15V0.125H12ZM0.75 0.875H2.25V2.375H0.75V0.875ZM12.75 0.875H14.25V2.375H12.75V0.875ZM3.675 1.325V1.775H4.575V1.325H3.675ZM5.025 1.325V1.775H5.925V1.325H5.025ZM6.375 1.325V1.775H7.275V1.325H6.375ZM7.725 1.325V1.775H8.625V1.325H7.725ZM9.075 1.325V1.775H9.975V1.325H9.075ZM10.425 1.325V1.775H11.325V1.325H10.425ZM1.275 4.025V4.925H1.725V4.025H1.275ZM13.275 4.025V4.925H13.725V4.025H13.275ZM1.275 5.375V6.275H1.725V5.375H1.275ZM13.275 5.375V6.275H13.725V5.375H13.275ZM1.275 6.725V7.625H1.725V6.725H1.275ZM13.275 6.725V7.625H13.725V6.725H13.275ZM1.275 8.075V8.975H1.725V8.075H1.275ZM13.275 8.075V8.975H13.725V8.075H13.275ZM1.275 9.425V9.875H0V12.875H3V11.675H3.225V11.225H3V9.875H1.725V9.425H1.275ZM13.275 9.425V9.875H12V11.225H11.775V11.675H12V12.875H15V9.875H13.725V9.425H13.275ZM0.75 10.625H2.25V12.125H0.75V10.625ZM12.75 10.625H14.25V12.125H12.75V10.625ZM3.675 11.225V11.675H4.575V11.225H3.675ZM5.025 11.225V11.675H5.925V11.225H5.025ZM6.375 11.225V11.675H7.275V11.225H6.375ZM7.725 11.225V11.675H8.625V11.225H7.725ZM9.075 11.225V11.675H9.975V11.225H9.075ZM10.425 11.225V11.675H11.325V11.225H10.425Z" fill="#858585" />
                    </svg>
                    <h4 class="font-bold text-sm">
                      {{ item.acreage }} m²
                    </h4>
                  </div>
                </div>
              </div>
              <h4 class="ml-4 mt-1.5 font-bold text-xs">
                {{ item.description }}
              </h4>
              <div class="ml-4 mt-2.5 flex items-center">
                <svg
                  class="mr-px"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_77_910)">
                    <path d="M8.75 4.16663C8.75 7.08329 5 9.58329 5 9.58329C5 9.58329 1.25 7.08329 1.25 4.16663C1.25 3.17206 1.64509 2.21824 2.34835 1.51498C3.05161 0.811714 4.00544 0.416626 5 0.416626C5.99456 0.416626 6.94839 0.811714 7.65165 1.51498C8.35491 2.21824 8.75 3.17206 8.75 4.16663Z" stroke="#858585" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5 5.41663C5.69036 5.41663 6.25 4.85698 6.25 4.16663C6.25 3.47627 5.69036 2.91663 5 2.91663C4.30964 2.91663 3.75 3.47627 3.75 4.16663C3.75 4.85698 4.30964 5.41663 5 5.41663Z" stroke="#858585" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_77_910">
                      <rect width="10" height="10" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <h4 class="font-normal text-xs color-858585">
                  {{ item.address }}
                </h4>
              </div>
            </a>
          </div>
        </li>
      </ul>
    </div>
    <a class="font-bold text-sm md:text-base text-blue-400" href="#">
      <div class="flex items-end mt-4 ml-4 md:ml-36">
        <h4>Xem thêm căn tốt </h4>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </div>
    </a>
    <div class="h-0 border-t ml-4 md:ml-36 mr-4 md:mr-36 mt-2" />
    <div class="flex justify-between mr-24 max-w-1056px">
      <h3 class="mt-8 mb-2 text-lg md:text-xl font-bold ml-4 md:ml-36">
        Căn hộ đang cho thuê
      </h3>
      <div class="hidden md:flex mb-2.5 items-end">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
    <div class="ml-4 md:ml-36 mr-4 md:mr-36">
      <ul class="flex flex-wrap">
        <li v-for="item in rentting_appartment" :key="item " class="w-204px h-240px">
          <div class="border border-color-858585 rounded-md mr-0 md:mr-4 mb-4">
            <a href="#">
              <img src="https://kfa.vn/wp-content/uploads/2020/04/thiet-ke-noi-that-chung-cu-3-phong-ngu-07-1.jpg" class="w-204px h-32">
              <h4 class="ml-4 mt-3.5 font-bold text-lg">
                {{item.price}} triệu
              </h4>
              <h4 class="mx-4 mt-2.5 font-normal text-xs">
                {{item.description}}
              </h4>
            </a>
          </div>
        </li>
      </ul>
    </div>
    <a class="font-bold text-sm md:text-base text-blue-400" href="#">
      <div class="flex items-end mt-1.5 ml-4 md:ml-36">
        <h4>Xem thêm căn tốt </h4>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </div>
    </a>
    <div class="flex justify-between mr-24 max-w-1056px">
      <h3 class="mt-8 mb-2 text-lg md:text-xl font-bold ml-4 md:ml-36">
        Căn hộ đang rao bán
      </h3>
      <div class="hidden md:flex mb-2.5 items-end">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
    <div class="ml-4 md:ml-36 mr-4 md:mr-36">
      <ul class="flex flex-wrap">
        <li v-for="item in rentting_appartment" :key="item " class="w-204px h-240px">
          <div class="border border-color-858585 rounded-md mr-0 md:mr-4 mb-4">
            <a href="#">
              <img src="https://kfa.vn/wp-content/uploads/2020/04/thiet-ke-noi-that-chung-cu-3-phong-ngu-07-1.jpg" class="w-204px h-32">
              <h4 class="ml-4 mt-3.5 font-bold text-lg">
                {{item.price}} triệu
              </h4>
              <h4 class="mx-4 mt-2.5 font-normal text-xs">
                {{item.description}}
              </h4>
            </a>
          </div>
        </li>
      </ul>
    </div>
    <a class="font-bold text-sm md:text-base text-blue-400" href="#">
      <div class="flex items-end ml-4 md:ml-36">
        <h4>Xem thêm căn tốt </h4>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  </div>
</template>
<style>
.bg-color-E1EDF2A3{
  background: #E1EDF2A3;
}
.bg-color-ECECEC{
  background: none;
}
.bg-color-FF9D9D{
  background: #FF9D9D;
}
.bg-color-C4A400{
  background: #C4A400;
}
.bg-color-C5C5C5{
  background: #C5C5C5;
}
.color-8C8C8C{
  color: #8C8C8C;
}
.h-537px{
  height: 240px;
}
.left-20per{
  left: 20%;
}
.pt-9px{
  padding-top: 9px;
}
.border-b-half-px{
  border-bottom-width: 0.5px;
}
.border-color-858585{
  bordercolor: #858585;
}
.color-858585{
  color: #858585;
}
.h-42px{
  height: 42px;
}
.h-icon-maico{
  height: 144px;
}
.w-icon-maico{
  width: 102px;
}
.w-700px{
  width: 700px;
}
.w-292px{
  width: 100%;
}
.w-204px{
  width: 100%;
}
.max-w-1056px{
  max-width: 1056px;
}
.h-240px{
  height: 240px;
}
.w-500px{
  width: 500px;
}
.max-w-152{
  max-width: 45%;
}
.max-w-fill-available{
  max-width: -webkit-fill-available;
}
.max-w-210{
  max-width: 45%;
}
.min-w-292px{
  min-width: 100%;
}
.home-drop-down button{
  background: #ECECEC;
  color: #434343;
  border: 1px solid #C4C4C4;
}
.home-drop-down span{
  padding-right: 10px;
}
.white-drop-down-button button{
  height: 42px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.ml-auto{
  margin-left: auto;
}
.mr-auto{
  margin-right: auto;
}
.flex-flow-wrap{
  flex-flow: wrap;
}
@media only screen and (min-width: 768px){
  .bg-color-ECECEC{
    background: #ECECEC;
  }
  .max-w-152{
    max-width: 152px;
  }
  .max-w-210{
    max-width: 210px;
  }
  .min-w-292px{
    min-width: 292px;
  }
  .w-292px{
  width: 292px;
}
.w-204px{
  width: 204px;
}
.h-icon-maico{
  height: 170px;
}
.w-icon-maico{
  width: 121px;
}
.h-537px{
  height: 537px;
}
}

</style>
<script>
export default {
  data () {
    return {
      outstanding_projects: [
        { condition: 'Đang mở bán', name: 'The Berly', address: 'Nguyễn Xuyển, Long Bình, Quận 9', from_price: 34, to_price: 40 },
        { condition: 'Đang mở bán', name: 'The Berly', address: 'Nguyễn Xuyển, Long Bình, Quận 9', from_price: 34, to_price: 40 },
        { condition: 'Đang mở bán', name: 'The Berly', address: 'Nguyễn Xuyển, Long Bình, Quận 9', from_price: 34, to_price: 40 }
      ],
      good_price: [
        { condition: 'Căn giá tốt', price: 3, address: 'Mai Chí Thọ, An Phú, Quận 2, TP HCM', room_numbers: 3, acreage: 33, description: ' Căn hộ The Tresor tầng cao đầy đủ nội thất, view sông và thành phố.' },
        { condition: 'Căn giá tốt', price: 3, address: 'Mai Chí Thọ, An Phú, Quận 2, TP HCM', room_numbers: 3, acreage: 33, description: ' Căn hộ The Tresor tầng cao đầy đủ nội thất, view sông và thành phố.' },
        { condition: 'Căn giá tốt', price: 3, address: 'Mai Chí Thọ, An Phú, Quận 2, TP HCM', room_numbers: 3, acreage: 33, description: ' Căn hộ The Tresor tầng cao đầy đủ nội thất, view sông và thành phố.' },
        { condition: 'Căn giá tốt', price: 3, address: 'Mai Chí Thọ, An Phú, Quận 2, TP HCM', room_numbers: 3, acreage: 33, description: ' Căn hộ The Tresor tầng cao đầy đủ nội thất, view sông và thành phố.' },
        { condition: 'Căn giá tốt', price: 3, address: 'Mai Chí Thọ, An Phú, Quận 2, TP HCM', room_numbers: 3, acreage: 33, description: ' Căn hộ The Tresor tầng cao đầy đủ nội thất, view sông và thành phố.' }],
      rentting_appartment: [
        { price: 7.5, description: 'Cho thuê căn hộ abc full nội thất bla bla' },
        { price: 7.5, description: 'Cho thuê căn hộ abc full nội thất bla bla' },
        { price: 7.5, description: 'Cho thuê căn hộ abc full nội thất bla bla' },
        { price: 7.5, description: 'Cho thuê căn hộ abc full nội thất bla bla' }
      ]

    };
  }
};
</script>
