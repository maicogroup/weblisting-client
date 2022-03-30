<template>
  <div class="">
    <div class="border rounded-md px-3 lg:px-8 py-3 lg:py-5 my-2">
      <div class="flex items-center">
        <img
          :src="review.authorAvatarSource"
          class="w-10 h-10 rounded-full cursor-pointer"
        />
        <div class="ml-2">
          <a href="#" class="text-base font-bold">
            {{ review.authorName }}
          </a>
          <div class="text-sm text-neutral-400">
            {{ formatReviewDateCreated(review.dateCreated) }}
          </div>
        </div>
      </div>

      <p
        id="review-content"
        v-bind:class="[!showFullContent ? shortContentClass:'']"
        class="
          text-sm text-stone-900
          font-normal
          mt-1
          leading-4
          lg:leading-5
        "
        ref="reviewContent"
      >
        {{ review.content }}
      </p>
      <span
        v-if="contentOverflowing && !showFullContent"
        id="show-more"
        class="text-sm cursor-pointer text-gray-500"
        @click="showFullContent = !showFullContent"
        >Xem thêm</span
      >
      <span
        v-if="contentOverflowing && showFullContent"
        class="text-sm cursor-pointer text-gray-500"
        @click="showFullContent = !showFullContent"
        >Rút gọn</span
      >
      <div>
        <div v-bind:class="[review.imageSources.length==2 ? 'grid-cols-2' : (review.imageSources.length==3 ? 'grid-cols-3' : (review.imageSources.length>=4 ? 'grid-cols-4' : ''))]" class="hidden md:grid gap-1 mt-2">
          <template v-if="review.imageSources.length <= 4">
            <img
              v-for="index in review.imageSources.length"
              :key="index"
              v-bind:class="[review.imageSources.length==1 ? 'aspect-auto': (review.imageSources.length<=3 ? 'aspect-square':'')]"
              class="object-cover w-full cursor-pointer"
              :src="review.imageSources[index - 1]"
              @click="handleGallery(index - 1)"
            />
          </template>
          <template v-else>
            <img
              v-for="index in 3"
              :key="review.imageSources[index - 1]"
              class="object-cover w-full h-16 lg:h-40 cursor-pointer"
              :src="review.imageSources[index - 1]"
              @click="handleGallery(index - 1)"
            />
            <div class="relative">
              <img
                class="object-cover w-full h-16 lg:h-40"
                :src="review.imageSources[3]"
              />
              <div
                class="absolute top-0 left-0 w-full h-full bg-black opacity-40"
              />
              <button
                @click="handleGallery(3)"
                class="
                  absolute
                  top-0
                  left-0
                  w-full
                  h-full
                  text-white
                  font-semibold
                  text-4xl
                "
              >
                {{ `${review.imageSources.length - 4}+` }}
              </button>
            </div>
          </template>
        </div>

        <div v-bind:class="[review.imageSources.length==2 ? gridForTwoImages : (review.imageSources.length>=3 ? gridForThreeImages : '')]" class="md:hidden grid gap-1 mt-2">
          <template v-if="review.imageSources.length <= 3">
            <img
              v-for="index in review.imageSources.length"
              :key="index"
              v-bind:class="[review.imageSources.length<3 ? 'aspect-square':'']"
              class="object-cover w-full sm:h-40 cursor-pointer"
              :src="review.imageSources[index-1]"
              @click="handleGallery(index - 1)"
            />
          </template>
          <template v-else>
            <img
              v-for="index in 2"
              :key="review.imageSources[index - 1]"
              class="object-cover w-full h-20 sm:h-40 cursor-pointer"
              :src="review.imageSources[index - 1]"
              @click="handleGallery(index - 1)"
            />
            <div class="relative">
              <img
                class="object-cover w-full h-20 sm:h-40"
                :src="review.imageSources[2]"
              />
              <div
                class="absolute top-0 left-0 w-full h-full bg-black opacity-40"
              />
              <button
                @click="handleGallery(2)"
                class="
                  absolute
                  top-0
                  left-0
                  w-full
                  h-full
                  text-white
                  font-semibold
                  text-4xl
                "
              >
                {{ `${review.imageSources.length - 3}+` }}
              </button>
            </div>
          </template>
        </div>
      </div>

      <gallery class="hidden" :items="review.imageSources" ref="galleryref" />
      <div class="grid grid-cols-2 border-y my-3 text-sm">
        <button @click="liked = !liked" v-bind:class="[liked ? 'text-[#F33E58]':'text-black']" class="py-1.5 px-3 items-center hover:bg-gray-100 border-r">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1 h-5 w-5 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span class="font-normal">Thích</span>
        </button>
        <button
          class="py-1.5 px-3 items-center hover:bg-gray-100"
          id="discussBtn"
          @click="setFocus"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1 h-5 w-5 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span class="font-normal">Thảo luận</span>
        </button>
      </div>

      <div class="mt-4">
        <div class="flex items-start">
          <img :src="user.avatarSource" class="w-10 h-10 rounded-full" />
          <div class="grow px-3">
            <!-- todo: style placeholder -->
            <textarea
              id="discussArea"
              style="overflow: auto"
              placeholder="Thảo luận"
              class="
                resize-none
                no-scrollbar
                w-full
                px-2
                py-1
                text-gray-800
                border
                rounded-md
                h-9
              "
            />
          </div>
          <div class="">
            <button
              class="
                text-sm
                font-semibold
                text-white
                bg-green-600
                rounded-md
                px-4
                py-1.5
                h-9
              "
            >
              Đăng
            </button>
          </div>
        </div>

        <div v-if="showAllComment == false">
          <div v-for="comment in first3Comments" :key="comment">
            <review-comment :comment="comment" />
          </div>
        </div>
        <div v-else v-for="comment in this.review.comments" :key="comment">
          <review-comment :comment="comment" />
        </div>
      </div>
      <div
        v-if="showAllComment == false && review.comments.length>3"
        @click="showAllComment = true"
        class="
          bg-stone-200
          border border-neutral-400
          h-8
          mt-4
          rounded
          flex
          items-center
          justify-center
          cursor-pointer
          hover:bg-stone-300
          text-sm text-stone-900
        "
      >
        Hiển thị thêm bình luận
      </div>
    </div>
  </div>
</template>

<script>
import reviewComment from "./review-comment.vue";
export default {
  components: { reviewComment },
  props: ["review"],
  data() {
    return {
    //   review: createReview(),
      showAllComment: false,
      showFullContent: false,
      contentOverflowing: false,
      user: {
        avatarSource: "https://pbgdpl.daklak.gov.vn/uploads/avatar.png",
      },
      liked: false,
      shortContentClass: 'shortcontent',
      gridForTwoImages: 'grid-cols-2',
      gridForThreeImages: 'grid-cols-3',

    };
  },
  computed: {
    first3Comments() {
      return this.review.comments.slice(0, 3);
    },
  },
  mounted() {
    var e = this.$refs.reviewContent;
    console.log(e.clientHeight-e.scrollHeight);
    if (0 > e.clientHeight - e.scrollHeight) {
      this.contentOverflowing = true;
    } else this.contentOverflowing = false;
    window.addEventListener("resize", this.getOverflow);
  },
  methods: {
    getOverflow() {
      var e = this.$refs.reviewContent;
      this.contentOverflowing = 0 > e.clientHeight - e.scrollHeight;
    },
    setFocus() {
      setTimeout(function () {
        document.getElementById("discussArea").focus();
      }, 0);
    },
    handleGallery(index) {
      if (this.$refs.galleryref)
        this.$refs.galleryref.openGallery(index);
    },
    formatReviewDateCreated(dateCreated) {
      const day = dateCreated.getDate();
      // getMonth trả về tháng bắt đầu từ 0 đến 11
      const month = dateCreated.getMonth() + 1;
      const year = dateCreated.getFullYear();

      return `${padZero(day)}/${padZero(month)}/${year}`;

      function padZero(num) {
        return num.toString().padStart(2, "0");
      }
    },
  },
};
function createReview() {
  return {
    authorName: "Chí Linh",
    authorAvatarSource:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/1408930/8a30ed34e8e412873de69d48f8bcb5fd991b8ab5.jpg",
    dateCreated: new Date(),
    project: {
      name: "Chung cư Saigon Gateway",
      slug: "ban-thue-can-ho-chung-cu-the-sun-avenue",
    },
    title: "Tên đề của bài đánh giá",
    content:
      "Hôm qua mình có chuyển nhà, mình thấy quá mệt mỏi nên đã quyết định lên núi ở Tây Tạng và học được Phép thuật ở đây. Giờ đây mình đã có khả năng điều khiển không thời gian, đi xuyên qua các đa vũ trụ, có khả năng nhìn thấu tương lai, vượt qua tam giới, hiểu được nhân sinh, hiểu được tiếng mèo kêu. Ngày mai mình sẽ qua thiên hà Tiên Nữ chơi, bay Milky Way ^^",
    imageSources: [
      "https://www3.nhk.or.jp/nhkworld/en/radio/cooking/update/meal_200228_l.jpg",
      "https://pogogi.com/sites/default/files/japanesefoodimages/2015/2/134%20Furai.jpg",
      "https://kenh14cdn.com/thumb_w/660/2019/1/25/3cbbd3ec62d085e2372585f56ccc8c69-15484114508781292670329.jpg",
      "https://img.tinxe.vn/resize/1000x-/2020/10/08/vwnbOqjE/mazda-furai-concept-front-studio-20a5.jpg",
      "https://i.ytimg.com/vi/K_7lPqLZrE8/maxresdefault.jpg",
    ],
    comments: [
      {
        authorName: "Linh Chí",
        authorAvatarSource:
          "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
        dateCreated: new Date(2069, 3, 19, 9, 4, 23),
        content: "Đúng vậy hết sức bất mãn với cái vụ cơm chó này, vote 1 sao",
      },
      {
        authorName: "Linh Chí",
        authorAvatarSource:
          "https://styles.redditmedia.com/t5_50b2l8/styles/profileIcon_snoo53df77a4-ae3a-449f-af3a-01fddcb3a0f7-headshot.png",
        dateCreated: new Date(2069, 3, 19, 9, 4, 23),
        content:
          "Gì, mình thấy quán này ok mà, hôm bữa dẫn người iu đi ăn ở đây thấy vui và ngon mà, 5 sao nha",
      },
      {
        authorName: "Dr Strange",
        authorAvatarSource:
          "https://styles.redditmedia.com/t5_50b2l8/styles/profileIcon_snoo53df77a4-ae3a-449f-af3a-01fddcb3a0f7-headshot.png",
        dateCreated: new Date(2069, 3, 19, 9, 4, 23),
        content: "Chào đồng môn!",
      },
      {
        authorName: "Linh Chí",
        authorAvatarSource:
          "https://styles.redditmedia.com/t5_50b2l8/styles/profileIcon_snoo53df77a4-ae3a-449f-af3a-01fddcb3a0f7-headshot.png",
        dateCreated: new Date(2069, 3, 19, 9, 4, 23),
        content: "Quán dở ẹc",
      },
    ],
  };
}
</script>

<style>
.shortcontent {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
@media only screen and (max-width: 769px) {
  .shortcontent {
    -webkit-line-clamp: 6;
  }
}
</style>