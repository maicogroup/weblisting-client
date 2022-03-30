<template>
  <div class="w-full max-w-4xl md:px-4">
    <div
      v-if="isFormShown"
      class="fixed top-0 left-0 h-full w-full z-30 bg-black bg-opacity-60"
    >
      <div
        class="
          relative
          left-0
          lg:left-[30%] lg:w-2/5
          w-full
          h-full
          md:h-auto md:w-2/3 md:top-[10%] md:left-[16%] md:rounded-md md:border
          bg-white
        "
      >
        <div class="px-3 py-5 flex flex-row max-h-screen">
          <div class="grow text-center text-xl font-bold">Tạo bài đánh giá</div>
          <svg
            @click="toggleCreatePost"
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
        <divider class="border-[#858585]" />

        <div
          class="
            px-3
            lg:px-8
            py-3
            grid
            overflow-scroll
            max-h-[90%]
            md:max-h-[520px]
          "
        >
          <div class="flex items-center mb-3 md:mb-5">
            <img
              class="
                w-10
                h-10
                lg:w-11 lg:h-11
                rounded-full
                cursor-pointer
                bg-gray-400
              "
            />
            <div class="ml-2 text-sm">
              <a href="#" class="font-bold"> Chí Linh </a>
              <div class="font-bold text-[#0F9AFF]">Saigon GateWay</div>
            </div>
          </div>
          <quill-editor :options="editorOption" class="rounded" />
          <div
            class="
              border-x border-b border-[#C4C4C4]
              p-3
              rounded-b-[5px]
              grid-wrap-image
            "
          >
            <button
              class="
                h-20
                w-20
                inline
                hover:bg-gray-100
                border border-[#C4C4C4] border-dashed
                bg-white
                grid
                justify-center
                content-center
                text-[10px] text-neutral-400
              "
              @click="uploadNewImage"
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
              <div class="w-14 leading-3 mt-1">Thêm ảnh hoặc video</div>
            </button>
            <div v-for="(item, index) in tempSrc" :key="item" class="relative">
              <button
                @click="removeUploadedImage(index)"
                class="absolute top-1 right-1 bg-black bg-opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <img
                :src="item"
                alt="they might be my crew"
                class="h-20 w-20 object-cover"
              />
            </div>
          </div>
          <button
            class="
              bg-green-600
              text-sm text-slate-50
              h-8
              md:h-12
              w-full
              md:w-1/3
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
    <div class="flex items-start p-2 md:p-0 mb-3 md:mb-7">
      <img :src="user.avatarSource" class="w-10 h-10 rounded-full" />
      <div
        @click="toggleCreatePost"
        class="
          grow
          ml-3
          text-sm text-[#C4C4C4]
          border
          rounded-[5px]
          h-11
          cursor-pointer
          hover:bg-gray-100
          px-4
          py-1
          flex
        "
      >
        <div class="self-center">Viết bài review</div>
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
      isFormShown: false,
      tempSrc: [],
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

  methods: {
    toggleCreatePost() {
      var element = document.body;
      element.classList.toggle("overflow-hidden");
      this.isFormShown = !this.isFormShown;
    },
    removeUploadedImage(index) {
      this.tempSrc.splice(index, 1);
    },
    uploadNewImage() {
      const fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      fileInput.setAttribute(
        "accept",
        "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
      );
      fileInput.click();
      fileInput.addEventListener("change", () => {
        if (fileInput.files != null && fileInput.files[0] != null) {
          const [file] = fileInput.files;
          if (file) {
            this.tempSrc.push(URL.createObjectURL(file));
          }
        }
      });
    },
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
        authorName: "Dr Strange",
        authorAvatarSource:
          "https://styles.redditmedia.com/t5_50b2l8/styles/profileIcon_snoo53df77a4-ae3a-449f-af3a-01fddcb3a0f7-headshot.png",
        dateCreated: new Date(2069, 3, 19, 9, 4, 23),
        content: "hôm bữa dẫn người iu đi ăn ở đây thấy vui và ngon",
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
      "https://www3.nhk.or.jp/nhkworld/en/radio/cooking/update/meal_200228_l.jpg",
      "https://www3.nhk.or.jp/nhkworld/en/radio/cooking/update/meal_200228_l.jpg",
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
.ql-toolbar {
  border-radius: 5px 5px 0 0;
}
.grid-wrap-image {
  display: grid;
  grid-template-columns: repeat(auto-fill, 80px);
  gap: 16px;
}
</style>