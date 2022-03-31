<template>
  <div class="w-full max-w-4xl md:px-4">
    <div
      v-if="showCreatePostForm"
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
          <div class="grow text-center text-xl font-bold">
            Tạo bài đánh giá
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 basic-4 text-[#656565] cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
            @click="showCreatePostForm = false"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <divider class="border-[#858585]" />

        <div class="px-3 lg:px-8 py-3 grid overflow-scroll max-h-[90%] md:max-h-[520px]">
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
            >
            <div class="ml-2 text-sm">
              <a href="#" class="font-bold"> Phong QUocc </a>
              <div class="font-bold text-[#0F9AFF]">
                {{ project.projectName }}
              </div>
            </div>
          </div>
          <quill-editor v-model="content" :options="editorOption" class="rounded" />
          <div class="border-x border-b border-[#C4C4C4] p-3 rounded-b-[5px] grid-wrap-image">
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
              <div class="w-14 leading-3 mt-1">
                Thêm ảnh hoặc video
              </div>
            </button>
            <img
              v-for="(item, index) in tempSrc"
              :key="index"
              :src="item"
              alt="they might be my crew"
              class="h-20 w-20 object-cover"
            >
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
    <div class="flex items-start p-2 md:p-0 mb-3 md:mb-7">
      <img :src="user.avatarSource" class="w-10 h-10 rounded-full">
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
        @click="showCreatePostForm = true"
      >
        <div class="self-center">
          Viết bài review
        </div>
      </div>
    </div>
    <div v-if="reviews.length > 0">
      <div v-for="(review, index) in reviews.slice().reverse()" :key="index">
        <review-post :review="review" />
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ReviewPost from './components/review-post.vue';
import Divider from '~/components/Divider.vue';

export default {
  name: 'ProjectReview',
  components: { Divider, ReviewPost },

  apollo: {
    project: {
      query () {
        return gql`
        query GetReviewingProject($slug: String!) {
          projects(where: { pageInfors: { some: { slug: { eq: $slug }}} }) {
            id
            projectName
          }
        }
    `;
      },
      // skip () {
      //   // return this.filter === null || this.$route.params.slug === null;
      //   return this.$route.params.slug === undefined;
      // },
      update (data) {
        if (data.projects.length === 0) {
          return;
        }

        const project = data.projects[0];
        return project;
      },
      variables () {
        return {
          slug: 'cho-thue-can-ho-chung-cu-lavita-charm-thu-duc'
        };
      }
    },

    reviewsWithPagination: {
      query () {
        return gql`query GetListReview{
    reviewsWithPagination{
      items{
        id
        content
        createdAt
        projectId
        galleries{
          path
        }
        author{
      name
      id
    }
        comments{
      author{
        authorName
      }
      createdAt
      content
    }
      }
      totalCount
      pageInfo{
        hasNextPage
        hasPreviousPage
      }
    }
  }`;
      },
      update: data => data.reviewsWithPagination
    }
  },

  data () {
    return {
      currentPage: 1,
      user: {
        avatarSource: 'https://pbgdpl.daklak.gov.vn/uploads/avatar.png'
      },
      showCreatePostForm: false,
      tempSrc: [],
      tempFile: [],
      content: '',
      editorOption: {
        theme: 'snow', // 可換
        modules: {
          toolbar: {
            // container這裡是個大坑，[]表分群
            container: [
              ['bold', 'italic', 'underline', 'strike', 'code'],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ align: [] }],
              ['link']
            ],
            // 客製化圖片上傳功能用的
            handlers: {
              image: this.uploadImage
            }
          }
        }
      }
    };
  },

  head () {
    return {
      script: [{
        once: true,
        hid: 's3-sdk',
        src: 'https://sdk.amazonaws.com/js/aws-sdk-2.1095.0.min.js',
        body: true
      }]
    };
  },

  computed: {
    reviews () {
      const tempReviews = [];
      if (this.reviewsWithPagination !== null && this.project !== null) {
        this.reviewsWithPagination.items.forEach((x) => {
          const tempReview = createMockReview(x);
          tempReviews.push(tempReview);
        }
        );
        return tempReviews;
      }
      return null;
    }
  },

  methods: {
    sendImagesToSever (id) {
      AWS.config.update({
        accessKeyId: '8EL21GNHMRNZYW8488OV',
        secretAccessKey: 'xBjwyBdSYz91ADgV9TH8oeTnAuZapmAJ8ycmrCiD',
        region: 'hn',
        endpoint: 'https://hn.ss.bfcplatform.vn',
        apiVersions: {
          s3: '2006-03-01'
        }
      });
      const s3 = new AWS.S3();

      const uploadOptions = {
        partSize: 10 * 1024 * 1024,
        queueSize: 1
      };

      this.tempFile.forEach((x) => {
        const uploadParams = {
          Bucket: 'weblisting',
          Key: 'review/' + id.toString() + '/' + x.name,
          Body: x,
          ACL: 'public-read',
          ContentType: x.type
        };

        const upload = s3.upload(uploadParams, uploadOptions);

        upload.send((err, data) => {
          if (err) {
            console.error('Upload lỗi:', err);
          } else if (data) {
            console.log('Upload thành công:', data);
          }
        });
      });
    },
    sendMutationCreateReview (createReviewInput) {
      this.$apollo.mutate({
        mutation: gql`mutation CreateReviewPost($input: CreateReviewInput!){
  createReview(input: $input)
  {
    string
  }
}`,
        variables: {
          input: {
            reviewId: createReviewInput.id,
            authorId: createReviewInput.authorId,
            content: createReviewInput.content,
            projectId: createReviewInput.projectId,
            galleries: createReviewInput.galleries,
            liked: []
          }
        }
      });
      console.log('Phong dep trai');
    },

    createNewReview () {
      if (this.tempSrc) {
        const id = generateNewId();
        const createReviewInput = {
          id: id.toString(),
          authorId: '623f0440bf28618e8d3eb0d8',
          content: this.content,
          projectId: this.project.id,
          galleries:
          [],
          liked: []
        };
        this.tempFile.forEach((x) => {
          this.sendImagesToSever(createReviewInput.id);
          const tempObject = {};
          tempObject.path = 'https://weblisting.hn.ss.bfcplatform.vn/' + 'review/' + id + '/' + x.name;
          tempObject.contentType = x.type;
          createReviewInput.galleries.push(tempObject);
        });

        this.sendMutationCreateReview(createReviewInput);

        this.showCreatePostForm = false;
      }

      function generateNewId () {
        const ObjectIddd = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
          s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
        return ObjectIddd();
      }
    },
    uploadNewImage () {
      const fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.setAttribute(
        'accept',
        'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
      );
      fileInput.click();
      fileInput.addEventListener('change', () => {
        if (fileInput.files != null && fileInput.files[0] != null) {
          const [file] = fileInput.files;
          if (file) {
            this.tempSrc.push(URL.createObjectURL(file));
            this.tempFile.push(file);
          }
        }
      });
    }
  }
};

function createMockReview (item) {
  const tempImageSources = [];
  item.galleries.forEach(x => tempImageSources.push(x.path));
  const tempComments = [];
  if (item.comments.length > 0) {
    item.comments.forEach((x) => {
      const tempComment = {
        authorName: x.author.authorName,
        authorAvatarSource:
          'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg',
        dateCreated: new Date(x.createdAt),
        content: x.content
      };
      tempComments.push(tempComment);
    });
  }
  return {
    id: item.id,
    authorName: item.author.name,
    authorAvatarSource:
      'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/1408930/8a30ed34e8e412873de69d48f8bcb5fd991b8ab5.jpg',
    dateCreated: new Date(item.createdAt),
    project: {
      name: 'The sun avenue',
      slug: 'cho-thue-can-ho-chung-cu-lavita-charm-thu-duc'
    },
    content: item.content,
    imageSources: tempImageSources,
    comments: tempComments
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
.grid-wrap-image{
  display:grid;
  grid-template-columns: repeat(auto-fill, 80px);
  gap: 16px;
}
</style>
