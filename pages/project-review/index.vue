<template>
  <div class="w-full max-w-screen-lg lg:px-4">
    <div
      v-if="showCreatePostForm"
      class="fixed top-0 left-0 h-full w-full z-10 bg-black bg-opacity-60"
    >
      <div
        class="relative top-[14%] left-[30%] w-2/5 bg-white rounded-md border"
      >
        <div class="p-3 flex flex-row">
          <div class="grow text-center text-xl font-bold">Tạo bài đánh giá</div>
          <svg
            @click="showCreatePostForm = false"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 basic-4 text-[#656565] cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <divider />

        <div class="px-8 py-3 grid overflow-scroll max-h-[520px]">
          <div class="flex items-center mb-5">
            <img class="w-11 h-11 rounded-full cursor-pointer bg-gray-400" />
            <div class="ml-2">
              <a href="#" class="text-sm font-bold"> Chí Linh </a>
              <div class="text-sm font-bold text-[#0F9AFF]">Saigon GateWay</div>
            </div>
          </div>
          <quill-editor :options="editorOption" class="" />
          <div class="border-x border-b border-[#C4C4C4] p-3">
            <button
              class="
                h-20
                w-20
                border border-[#C4C4C4]
                bg-white
                grid
                justify-center
                content-center
                text-[10px]
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-2.5 w-2.5 justify-self-center"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <div>Thêm ảnh</div>
            </button>
          </div>
          <button
            class="
              bg-green-600
              text-sm text-slate-50
              h-12
              px-12
              rounded-md
              font-bold
              justify-self-end
              mt-3
            "
          >
            Đăng bài
          </button>
        </div>
      </div>
    </div>
    <div class="flex items-start p-2 lg:p-0">
      <img :src="user.avatarSource" class="w-10 h-10 rounded-full" />
      <div class="grow ml-3">
        <!-- todo: style placeholder -->
        <textarea
          style="overflow: auto"
          placeholder="Viết bài review"
          @click="showCreatePostForm = true"
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
            cursor-pointer
          "
        />
      </div>
    </div>
    <div v-for="review in reviews" :key="review">
      <review-post :review="review" />
    </div>
  </div>
</template>

<script>
import Divider from "~/components/Divider.vue";
import Gallery from "~/components/gallery.vue";
import ReviewComment from "./components/review-comment.vue";
import ReviewPost from "./components/review-post.vue";
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
      showCreatePostForm: false,
      editorOption: {
        theme: "snow", // 可換
        modules: {
          toolbar: {
            // container這裡是個大坑，[]表分群
            container: [
              ["bold", "italic", "underline", "strike", "code"],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ align: [] }],
              ["link"],
            ],
            // 客製化圖片上傳功能用的
            handlers: {
              image: this.uploadImage,
            },
          },
        },
      },
    };
  },

  methods: {},
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
    content: "Hôm qua mình có chuyển nhà, ",
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
.ql-editor {
  min-height: 180px;
}
.ql-container.ql-snow {
  height: auto;
}
</style>