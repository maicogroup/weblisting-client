<template>
  <div class="w-full max-w-4xl md:px-4">
    <guest-user-authentication-modal
      :open="isShowingLogIn"
      @close="isShowingLogIn = false"
    />
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
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 basic-4 text-[#656565] cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
            @click="toggleCreatePost"
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
            <guest-user-avatar
              :name="author.name"
              class="w-10 h-10 lg:w-11 lg:h-11 rounded-full cursor-pointer"
            />
            <div class="ml-2 text-sm">
              <a href="#" class="font-bold"> {{ author.name }} </a>
              <div class="font-bold text-[#0F9AFF]">
                {{ project.projectName }}
              </div>
            </div>
          </div>
          <quill-editor
            v-model="content"
            :options="editorOption"
            class="rounded"
          />
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
            <div v-for="(item, index) in tempSrc" :key="index" class="relative">
              <button
                class="absolute top-1 right-1 bg-black bg-opacity-50"
                @click="removeUploadedImage(index)"
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
            @click="createNewReview"
          >
            Đăng bài
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="reviews.length > 0"
      class="flex items-start p-2 md:p-0 mb-3 md:mb-7"
    >
      <template v-if="author">
        <guest-user-avatar :name="author.name" class="w-10 h-10 rounded-full" />
      </template>
      <template v-else>
        <img :src="user.avatarSource" class="w-10 h-10 rounded-full" />
      </template>
      <div
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
        @click="toggleCreatePost"
      >
        <div class="self-center">Viết bài review</div>
      </div>
    </div>
    <div v-if="reviews.length > 0">
      <div v-for="(review, index) in reviews" :key="review.id">
        <review-post :review="review" :index="index" :author="author" />
      </div>
    </div>

    <!-- skeleton -->
    <div
      v-if="
        reviews.length < reviewsWithPagination.totalCount || reviews.length <= 1
      "
      ref="skeleton"
      class="border rounded-md px-3 lg:px-8 py-3 lg:py-5 my-2"
    >
      <div class="animate-pulse">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full cursor-pointer bg-gray-300" />
          <div class="ml-2">
            <div class="h-2 bg-gray-300 w-20" />
            <div class="h-2 bg-gray-300 w-16 mt-2" />
          </div>
        </div>

        <div class="h-3 bg-gray-300 w-5/6 mt-3" />
        <div class="h-3 bg-gray-300 w-full mt-1" />
        <div class="h-3 bg-gray-300 w-full mt-1" />
        <div class="h-3 bg-gray-300 w-2/3 mt-1" />
        <div class="grid grid-cols-3 mt-3 gap-3">
          <div class="bg-gray-300 h-28" />
          <div class="bg-gray-300 h-28" />
          <div class="bg-gray-300 h-28" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import ReviewPost from "./components/review-post.vue";
import Divider from "~/components/Divider.vue";
import GuestUserAvatar from "~/pages/components/guest-user-avatar.vue";
import GuestUserAuthenticationModal from "~/pages/components/guest-user-authentication-modal.vue";

const getReviewsQuery = gql`
  query GetListReview($take: Int, $skip: Int) {
    reviewsWithPagination(take: $take, skip: $skip) {
      items {
        id
        content
        createdAt
        projectId
        galleries {
          path
        }
        author {
          name
          id
        }
        comments {
          author {
            authorName
          }
          createdAt
          content
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
export default {
  name: "ProjectReview",
  components: {
    Divider,
    ReviewPost,
    GuestUserAuthenticationModal,
    GuestUserAvatar,
  },

  apollo: {
    project: {
      query() {
        return gql`
          query GetReviewingProject($slug: String!) {
            projects(where: { pageInfors: { some: { slug: { eq: $slug } } } }) {
              id
              projectName
              images
              pageInfors {
                metaDescription
              }
            }
          }
        `;
      },
      update(data) {
        if (data.projects.length === 0) {
          return;
        }

        const project = data.projects[0];
        return project;
      },
      variables() {
        return {
          slug: this.$route.params.slug,
        };
      },
    },

    reviewsWithPagination: {
      query() {
        return gql`
          query GetListReview($take: Int, $skip: Int) {
            reviewsWithPagination(
              take: $take
              skip: $skip
              order: { createdAt: DESC }
            ) {
              items {
                id
                content
                createdAt
                projectId
                liked
                galleries {
                  path
                  contentType
                }
                author {
                  name
                  id
                }
                comments {
                  id
                  author {
                    authorName
                  }
                  createdAt
                  content
                }
              }
              totalCount
            }
          }
        `;
      },
      update: (data) => data.reviewsWithPagination,
      variables() {
        return {
          take: 5,
          skip: 0,
        };
      },
    },
  },

  data() {
    return {
      currentPage: 1,
      user: {
        avatarSource:
          "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      },
      isFormShown: false,
      tempSrc: [],
      tempFile: [],
      isLoading: false,
      tempReviews: [],
      isShowingLogIn: false,
      take: 5,
      skip: 0,
      content: "",
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

  head() {
    return {
      title: "Review dự án " + this.project?.projectName,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.project?.pageInfors[0].metaDescription,
        },
        {
          property: "og:image",
          content: this.project?.images[0],
        },
        {
          name: "robots",
          content: "noindex",
        },
      ],
      script: [
        {
          once: true,
          hid: "s3-sdk",
          src: "https://sdk.amazonaws.com/js/aws-sdk-2.1095.0.min.js",
          body: true,
        },
      ],
    };
  },

  computed: {
    reviews() {
      return this.reviewGenerate();
    },

    author() {
      const tempUser = {};
      const guestUser = this.$cookies.get("GuestUser") ?? null;
      if (guestUser !== null) {
        tempUser.name = guestUser.name;
        tempUser.id = guestUser.id;
        return tempUser;
      }
      return null;
    },
  },

  mounted() {
    window.addEventListener("scroll", this.HandleScroll);
  },

  methods: {
    reviewGenerate() {
      if (this.reviewsWithPagination !== null && this.project !== null) {
        const tempReviewArray = [];
        if (this.reviewsWithPagination !== undefined) {
          this.reviewsWithPagination.items.forEach((x) => {
            const tempReview = this.createMockReview(x, this.project);
            if (this.tempReviews.length < this.take) {
              setTimeout(function () {}, 10000);
              this.tempReviews.push(tempReview);
            } else {
              tempReviewArray.push(tempReview);
            }
          });
        }
        if (tempReviewArray.length === 0) {
          return this.tempReviews;
        } else {
          const oldReviews = tempReviewArray;
          return oldReviews;
        }
      }
      return [];
    },
    HandleScroll() {
      console.log(window.pageYOffset / document.body.offsetHeight);
      if (
        this.$refs.skeleton.getBoundingClientRect().y <= 513 &&
        this.$refs.skeleton.getBoundingClientRect().y <= 513
      ) {
        this.LoadNewReviews();
      }
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
            this.tempFile.push(file);
          }
        }
      });
    },
    toggleCreatePost() {
      if (this.author === null) {
        this.isShowingLogIn = true;
        return;
      }
      const element = document.body;
      element.classList.toggle("overflow-hidden");
      this.isFormShown = !this.isFormShown;
    },
    removeUploadedImage(index) {
      this.tempSrc.splice(index, 1);
      this.tempFile.splice(index, 1);
    },

    sendImagesToSever(id) {
      AWS.config.update({
        accessKeyId: "8EL21GNHMRNZYW8488OV",
        secretAccessKey: "xBjwyBdSYz91ADgV9TH8oeTnAuZapmAJ8ycmrCiD",
        region: "hn",
        endpoint: "https://hn.ss.bfcplatform.vn",
        apiVersions: {
          s3: "2006-03-01",
        },
      });
      const s3 = new AWS.S3();

      const uploadOptions = {
        partSize: 10 * 1024 * 1024,
        queueSize: 1,
      };

      this.tempFile.forEach((x) => {
        const uploadParams = {
          Bucket: "weblisting",
          Key: "review/" + id.toString() + "/" + x.name,
          Body: x,
          ACL: "public-read",
          ContentType: x.type,
        };

        const upload = s3.upload(uploadParams, uploadOptions);

        upload.send((err, data) => {
          if (err) {
            console.error("Upload lỗi:", err);
          } else if (data) {
            console.log("Upload thành công:", data);
          }
        });
      });
    },
    sendMutationCreateReview(createReviewInput) {
      this.$apollo.mutate({
        mutation: gql`
          mutation CreateReviewPost($input: CreateReviewInput!) {
            createReview(input: $input) {
              string
            }
          }
        `,
        variables: {
          input: {
            reviewId: createReviewInput.id,
            authorId: createReviewInput.authorId,
            content: createReviewInput.content,
            projectId: createReviewInput.projectId,
            galleries: createReviewInput.galleries,
            liked: [],
          },
        },
      });

      this.$apollo.queries.reviewsWithPagination.refetch({
        skip: 0,
        take: 5,
      });
    },

    sendWarningNotification(notification) {
      this.$toast.show(notification, {
        type: "error",
        theme: "bubble",
        duration: 3000,
        position: "top-right",
      });
    },

    createNewReview() {
      const id = generateNewId();
      if (this.content !== "" || this.tempSrc.length !== 0) {
        const createReviewInput = {
          id: id.toString(),
          authorId: this.author.id,
          content: this.content,
          projectId: this.project.id,
          galleries: [],
          liked: [],
        };
        this.tempFile.forEach((x) => {
          this.sendImagesToSever(createReviewInput.id);
          const tempObject = {};
          tempObject.path =
            "https://weblisting.hn.ss.bfcplatform.vn/" +
            "review/" +
            id +
            "/" +
            x.name;
          tempObject.contentType = x.type;
          createReviewInput.galleries.push(tempObject);
        });

        this.sendMutationCreateReview(createReviewInput);
        const element = document.body;
        element.classList.remove("overflow-hidden");
        this.isFormShown = !this.isFormShown;
        this.content = "";
        this.tempFile = [];
        this.tempSrc = [];
      } else {
        this.sendWarningNotification("Bài viết chưa có thông tin");
      }

      function generateNewId() {
        const ObjectIddd = (
          m = Math,
          d = Date,
          h = 16,
          s = (s) => m.floor(s).toString(h)
        ) =>
          s(d.now() / 1000) +
          " ".repeat(h).replace(/./g, () => s(m.random() * h));
        return ObjectIddd();
      }
    },

    LoadNewReviews() {
      if (this.isLoading === true) {
        return;
      }
      this.isLoading = true;

      if (this.skip + 5 <= this.reviewsWithPagination.totalCount) {
        this.skip += 5;
      } else {
        this.take = this.reviewsWithPagination.totalCount - this.skip;
      }
      if (this.skip !== this.reviewsWithPagination.totalCount) {
        this.$apollo.queries.reviewsWithPagination.fetchMore({
          variables: {
            skip: this.skip,
            take: this.take,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            setTimeout(function () {
              // your code to be executed after 1 second
            }, 10000);
            this.isLoading = false;
            return {
              reviewsWithPagination: {
                __typename: previousResult.reviewsWithPagination.__typename,
                items: [
                  ...previousResult.reviewsWithPagination.items,
                  ...fetchMoreResult.reviewsWithPagination.items,
                ],
                totalCount: fetchMoreResult.reviewsWithPagination.totalCount,
              },
            };
          },
        });
      }
      if (this.take === this.reviewsWithPagination.totalCount - this.skip) {
        this.skip = this.reviewsWithPagination.totalCount;
      }
    },

    createMockReview(item, project) {
      const tempImageSources = [];
      item.galleries.forEach((x) => tempImageSources.push(x.path));
      const tempComments = [];
      if (item.comments.length > 0) {
        item.comments.forEach((x) => {
          const tempComment = {
            commentId: x.id,
            authorName: x.author.authorName,
            authorAvatarSource:
              "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
            dateCreated: new Date(x.createdAt),
            content: x.content,
          };
          tempComments.push(tempComment);
        });
      }
      const isLiked =
        this.author === null ? false : item.liked.includes(this.author.id);
      return {
        id: item.id,
        authorName: item.author.name,
        authorAvatarSource:
          "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/1408930/8a30ed34e8e412873de69d48f8bcb5fd991b8ab5.jpg",
        dateCreated: new Date(item.createdAt),
        content: item.content,
        imageSources: tempImageSources,
        comments: tempComments,
        isLiked,
        galleries: item.galleries,
        liked: item.liked,
      };
    },
  },
};
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
