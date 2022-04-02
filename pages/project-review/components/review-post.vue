<template>
  <div class="">
    <div class="border rounded-md px-3 lg:px-8 py-3 lg:py-5 my-2">
      <div class="flex items-center">
        <img
          :src="review.authorAvatarSource"
          class="w-10 h-10 rounded-full cursor-pointer"
        >
        <div class="ml-2">
          <a href="#" class="text-base font-bold">
            {{ review.authorName }}
          </a>
          <div class="text-sm text-neutral-400">
            {{ formatPostDate(review.dateCreated) }}
          </div>
        </div>
      </div>

      <p
        id="review-content"
        ref="reviewContent"
        :class="[!showFullContent ? shortContentClass:'']"
        class="
          text-sm text-stone-900
          font-normal
          mt-1
          leading-4
          lg:leading-5
        "
        v-html="review.content"
      />
      <span
        v-if="contentOverflowing && !showFullContent"
        id="show-more"
        class="text-sm cursor-pointer text-gray-500"
        @click="showFullContent = !showFullContent"
      >Xem thêm</span>
      <span
        v-if="contentOverflowing && showFullContent"
        class="text-sm cursor-pointer text-gray-500"
        @click="showFullContent = !showFullContent"
      >Rút gọn</span>
      <div>
        <div :class="[review.imageSources.length==2 ? 'grid-cols-2' : (review.imageSources.length==3 ? 'grid-cols-3' : (review.imageSources.length>=4 ? 'grid-cols-4' : ''))]" class="hidden md:grid gap-1 mt-2">
          <template v-if="review.imageSources.length <= 4">
            <img
              v-for="index in review.imageSources.length"
              :key="index"
              :class="[review.imageSources.length==1 ? 'aspect-auto': (review.imageSources.length<=3 ? 'aspect-square':'h-40')]"
              class="object-cover w-full cursor-pointer"
              :src="review.imageSources[index - 1]"
              @click="handleGallery(index - 1)"
            >
          </template>
          <template v-else>
            <img
              v-for="index in 3"
              :key="index"
              class="object-cover w-full h-16 lg:h-40 cursor-pointer"
              :src="review.imageSources[index - 1]"
              @click="handleGallery(index - 1)"
            >
            <div class="relative">
              <img
                class="object-cover w-full h-16 lg:h-40"
                :src="review.imageSources[3]"
              >
              <div
                class="absolute top-0 left-0 w-full h-full bg-black opacity-40"
              />
              <button
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
                @click="handleGallery(3)"
              >
                {{ `${review.imageSources.length - 4}+` }}
              </button>
            </div>
          </template>
        </div>

        <div :class="[review.imageSources.length==2 ? gridForTwoImages : (review.imageSources.length>=3 ? gridForThreeImages : '')]" class="md:hidden grid gap-1 mt-2">
          <template v-if="review.imageSources.length <= 3">
            <img
              v-for="index in review.imageSources.length"
              :key="index"
              :class="[review.imageSources.length<3 ? 'aspect-square':'']"
              class="object-cover w-full sm:h-40 cursor-pointer"
              :src="review.imageSources[index-1]"
              @click="handleGallery(index - 1)"
            >
          </template>
          <template v-else>
            <img
              v-for="index in 2"
              :key="index"
              class="object-cover w-full h-20 sm:h-40 cursor-pointer"
              :src="review.imageSources[index - 1]"
              @click="handleGallery(index - 1)"
            >
            <div class="relative">
              <img
                class="object-cover w-full h-20 sm:h-40"
                :src="review.imageSources[2]"
              >
              <div
                class="absolute top-0 left-0 w-full h-full bg-black opacity-40"
              />
              <button
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
                @click="handleGallery(2)"
              >
                {{ `${review.imageSources.length - 3}+` }}
              </button>
            </div>
          </template>
        </div>
      </div>

      <gallery ref="galleryref" class="hidden" :items="tempGallery" :gallery-index="index" />
      <div class="grid grid-cols-2 border-y my-3 text-sm">
        <button
          :class="[liked ? 'text-[#F33E58]' : 'text-black']"
          class="py-1.5 px-3 items-center hover:bg-gray-100 border-r"
          @click="toggleLike"
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span class="font-normal">Thích</span>
        </button>
        <button
          id="discussBtn"
          class="py-1.5 px-3 items-center hover:bg-gray-100"
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
          <img :src="user.avatarSource" class="w-10 h-10 rounded-full">
          <div class="grow px-3">
            <!-- todo: style placeholder -->
            <textarea
              id="discussArea"
              v-model="content"
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
              @click="addNewComment"
            >
              Đăng
            </button>
          </div>
        </div>

        <div v-if="review.comments.length > 0">
          <div v-if="showAllComment == false">
            <div v-for="(comment, index) in first3Comments" :key="index">
              <review-comment :comment="comment" />
            </div>
          </div>
          <div v-for="(comment, index) in comments" v-else :key="index">
            <review-comment :comment="comment" />
          </div>
        </div>
      </div>
      <div
        v-if="showAllComment == false"
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
        @click="showAllComment = true"
      >
        Hiển thị thêm bình luận
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';
import reviewComment from './review-comment.vue';
export default {
  components: { reviewComment },
  props: ['review', 'index', 'author'],
  data () {
    return {
      content: '',
      showFullContent: false,
      comments: this.review.comments.reverse(),
      tempGallery: this.review.imageSources,
      liked: this.review.isLiked,
      showAllComment: this.isGather3Comments(),
      contentOverflowing: false,
      user: {
        avatarSource: 'https://pbgdpl.daklak.gov.vn/uploads/avatar.png'
      },
      shortContentClass: 'shortcontent',
      gridForTwoImages: 'grid-cols-2',
      gridForThreeImages: 'grid-cols-3'
    };
  },
  computed: {
    first3Comments () {
      const reversignComments = this.comments.slice(0, 3);
      if (this.review.comments.length < 3) {
        return null;
      }
      return reversignComments;
    }
  },
  mounted () {
    const e = this.$refs.reviewContent;
    if (e.clientHeight - e.scrollHeight < 0) {
      this.contentOverflowing = true;
    } else {
      this.contentOverflowing = false;
    }
    window.addEventListener('resize', this.getOverflow);
  },
  methods: {
    formatPostDate (time) {
      this.today = new Date();
      const hi = new Date(time);
      if ((this.today.getFullYear() === hi.getFullYear()) && (this.today.getMonth() === hi.getMonth())) {
        if (this.today.getDate() === hi.getDate() + 1) {
          return 'Hôm qua';
        } else if (this.today.getDate() === hi.getDate()) {
          if (this.today.getHours() - hi.getHours() > 0) {
            return this.today.getHours() - hi.getHours() + 'giờ trước';
          } else if (this.today.getHours() === hi.getHours()) {
            if (this.today.getMinutes() - hi.getMinutes() === 0) { return 'vừa xong'; }
            return this.today.getMinutes() - hi.getMinutes() + 'phút trước';
          }
        } else { return this.formatReviewDateCreated(hi); }
      } else { return this.formatReviewDateCreated(hi); }
    },
    toggleLike () {
      this.liked = !this.liked;
      const tempLiked = this.review.liked;

      if (this.liked) {
        tempLiked.push('623f0408bf28618e8d3eb0d8');
      } else {
        for (const x in tempLiked) {
          if (tempLiked[x] === '623f0408bf28618e8d3eb0d8') {
            tempLiked.splice(x, 1);
            break;
          }
        }
      }
      console.log('Phong hihi');
      console.log(this.review.id.toString() + 'gall - ' + this.review.galleries + 'liked -' + tempLiked);
      this.$apollo.mutate({
        mutation: gql`
          mutation UpdateLikhgd($input: UpdateReviewInput!) {
            updateReview(input: $input) {
              __typename
            }
          }
        `,
        variables: {
          input: {
            reviewId: this.review.id,
            liked: tempLiked
          }
        }
      });
      console.log(tempLiked);
    },
    isGather3Comments () {
      if (this.review.comments.length > 3) {
        return false;
      } else {
        return true;
      }
    },
    sendAddCommentMutation (author) {
      this.$apollo.mutate({
        mutation: gql`
          mutation CreateNewComment($input: CreateCommentInput!) {
            createComment(input: $input) {
              string
            }
          }
        `,
        variables: {
          input: {
            author: {
              authorName: author.name,
              authorId: author.id
            },
            content: this.content,
            discussionId: this.review.id,
            type: 'Review'
          }
        }
      });
    },
    addNewComment () {
      if (this.author !== undefined) {
        const tempComment = {
          authorName: this.author.name,
          authorAvatarSource:
          'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg',
          dateCreated: new Date(),
          content: this.content
        };
        if (this.comments.length > 3) {
        // eslint-disable-next-line vue/no-mutating-props
          console.log('456');
          this.comments.unshift(tempComment);
        } else {
          console.log('123');
          this.comments.unshift(tempComment);
          console.log(this.comments);
          this.showAllComment = true;
        }
        this.sendAddCommentMutation(this.author);
        this.content = '';
      }
    },
    getOverflow () {
      const e = this.$refs.reviewContent;
      this.contentOverflowing = e.clientHeight - e.scrollHeight < 0;
    },
    setFocus () {
      setTimeout(function () {
        document.getElementById('discussArea').focus();
      }, 0);
    },
    handleGallery (index) {
      this.tempGallery = this.review.imageSources;
      if (this.$refs.galleryref) {
        this.tempGallery.forEach((element) => {
          let item = '';
          if (element.includes('.mp4')) {
            item = {
              poster: '/images/video-poster.jpg',
              thumb: '/images/video-thumbnail.jpg',
              html: `<video class="lg-video-object lg-html5" controls preload="none"><source src="${element}" type="video/mp4">Your browser does not support HTML5 video</video>`
            };
          } else {
            item = {
              src: element,
              thumb: element
            };
          }
        });
        this.$refs.galleryref.openGallery(index);
      }
    },
    formatReviewDateCreated (dateCreated) {
      const day = dateCreated.getDate();
      // getMonth trả về tháng bắt đầu từ 0 đến 11
      const month = dateCreated.getMonth() + 1;
      const year = dateCreated.getFullYear();

      return `${padZero(day)}/${padZero(month)}/${year}`;

      function padZero (num) {
        return num.toString().padStart(2, '0');
      }
    }
  }
};
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
