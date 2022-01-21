<template>
  <div class="max-w-full">
    <div class="flex justify-between items-center mt-2 mb-2">
      <p class="md:text-sm text-xs truncate mar-address">
        Hiện có: 19,384 bất động sản
      </p>
      <div>
        <p class="inline text-sm truncate mar-address">
          Sắp xếp theo:
        </p>
        <Dropdown class="text-sm md:mr-9">
          <DropdownItem>
            Giá cao nhất
          </DropdownItem>
          <DropdownItem>
            Giá thấp nhất
          </DropdownItem>
          <DropdownItem>
            Mới nhất
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
    <div class="flow-root">
      <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        <li v-for="post in posts" :key="post" class="pb-6 md:pt-0 pt-6  md:border-none border-b border-black">
          <div class="">
            <p class="md:hidden truncate ... font-bold text-lg leading-6 ov-flow-hidden mb-3">
              {{ post.title }}
            </p>
            <div class="flex item-flex-start space-x-4 md:rounded-md md:border">
              <img class="w-28 h-28 md:w-60 md:h-40 rounded-md border" :src="post.srcimage" alt="Bonnie image">
              <div class="flex-1 min-w-0">
                <p class="hidden md:block font-bold text-lg leading-6 mar-title h-12 ov-flow-hidden">
                  {{ post.title }}
                </p>
                <p class="font-price md:mt-0 md:mb-4 mt-2 mb-5">
                  {{ post.price }}
                </p>
                <p class="text-sm color-858585 md:mb-3 mb-6">
                  {{ post.address }}
                </p>
                <p class="text-sm color-a7a7a7">
                  {{ post.date }}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

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
  margin: 10px 76px 14px 0;
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
</style>
<script>
export default {
  name: 'ListPost',
  data () {
    return {
      posts: [{
        srcimage: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
        title: 'CĂN HỘ HUHIHAHA TẦNG 6 BAN CÔNG RỘNG RÃI THOÁNG MÁT VÃI ĐẠN AHIHI FIRST THING FIRST PRERESENT TO CD TOWN',
        price: '6,3 Tỷ - 52 m² - 2PN3WC',
        address: '8 Miles, Novara, CĐ City',
        date: 'Hôm nay'
      },
      {
        srcimage: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
        title: 'CĂN HỘ HUHIHAHA TẦNG 6 BAN CÔNG RỘNG RÃI THOÁNG MÁT VÃI ĐẠN AHIHI FIRST THING FIRST PRERESENT TO CD TOWN',
        price: '6,3 Tỷ - 52 m² - 2PN3WC',
        address: '8 Miles, Novara, CĐ City',
        date: 'Hôm nay'
      },
      {
        srcimage: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
        title: 'CĂN HỘ HUHIHAHA TẦNG 6 BAN CÔNG RỘNG RÃI THOÁNG MÁT VÃI ĐẠN AHIHI FIRST THING FIRST PRERESENT TO CD TOWN',
        price: '6,3 Tỷ - 52 m² - 2PN3WC',
        address: '8 Miles, Novara, CĐ City',
        date: 'Hôm nay'
      },
      {
        srcimage: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
        title: 'CĂN HỘ HUHIHAHA TẦNG 6 BAN CÔNG RỘNG RÃI THOÁNG MÁT VÃI ĐẠN AHIHI FIRST THING FIRST PRERESENT TO CD TOWN',
        price: '6,3 Tỷ - 52 m² - 2PN3WC',
        address: '8 Miles, Novara, CĐ City',
        date: 'Hôm nay'
      }
      ]
    };
  }
};
</script>
