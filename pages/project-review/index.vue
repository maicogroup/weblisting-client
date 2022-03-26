<template>
  <div class="w-full max-w-screen-lg lg:px-4">
    <div class="flex items-start p-2 lg:p-0">
      <img :src="user.avatarSource" class="w-10 h-10 rounded-full" />
      <div class="grow ml-3">
        <!-- todo: style placeholder -->
        <textarea
          style="overflow: auto"
          placeholder="Viết bài review"
          class="
            flex
            content-center
            resize-none
            no-scrollbar
            w-full
            px-2
            py-1
            text-gray-800
            border
            rounded-md
            focus:outline-none
            h-11
          "
        />
      </div>
    </div>
    <div v-for="review in reviews" :key="review">
      <review-post :review="review"/>
    </div>
  </div>
</template>

<script>
import Divider from "~/components/Divider.vue";
import Gallery from "~/components/gallery.vue";
import ReviewComment from './components/review-comment.vue';
import ReviewPost from './components/review-post.vue';
export default {
  name: "ProjectReview",
  components: { Divider, Gallery, ReviewComment, ReviewPost },
  data() {
    return {
      currentPage: 1,
      reviews: [createMockReview(), createMockReview2(), createMockReview2()],
      user: {
        avatarSource: "https://pbgdpl.daklak.gov.vn/uploads/avatar.png",
      },
    };
  },

  methods: {
    
  },
};

function createMockReview() {
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
    ],
  };
}
function createMockReview2() {
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
      "Hôm qua mình có chuyển nhà, ",
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
    ],
  };
}
</script>

<style>
</style>