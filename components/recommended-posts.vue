<template>
  <div>
    <div class="lg:mx-0 mx-5 flex justify-between items-end">
      <h3 class="font-bold text-lg mt-8">
        {{ this.title }}
      </h3>
      <div class="hidden md:block">
        <button class="text-grat-400 px-3 py-2 border rounded-md" @click="scrollBy(-500)">
          <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.3692 14.8582L0.726562 7.80924L10.3692 0.760254" stroke="#C4C4C4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button class="text-grat-400 px-3 py-2 border rounded-md" @click="scrollBy(500)">
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.44968 14.8582L11.0923 7.80924L1.44968 0.760254" stroke="#C4C4C4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    <div ref="recommendedPostsContainer" class="mx-5 lg:mx-0 mt-3 no-scrollbar p-2 md:p-4 border flex space-x-3 md:space-x-6 overflow-auto">
      <nuxt-link v-for="post in formatedPosts" :key="post.id" :to="`/chi-tiet-can-ho/${post.slug}`">
        <div class="post border border-stone-200 rounded-md overflow-hidden">
          <img :src="post.srcimage" :alt="post.title" class="post-img object-cover">
          <div class="mx-2 my-2">
            <div class="flex justify-between">
              <p class="font-bold">
                {{ post.price }}
              </p>
              <div class="flex space-x-1">
                <div class="flex items-center">
                  <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.83301 7.66663C7.21634 7.66663 8.33301 6.54996 8.33301 5.16663C8.33301 3.78329 7.21634 2.66663 5.83301 2.66663C4.44967 2.66663 3.33301 3.78329 3.33301 5.16663C3.33301 6.54996 4.44967 7.66663 5.83301 7.66663ZM5.83301 4.33329C6.29134 4.33329 6.66634 4.70829 6.66634 5.16663C6.66634 5.62496 6.29134 5.99996 5.83301 5.99996C5.37467 5.99996 4.99967 5.62496 4.99967 5.16663C4.99967 4.70829 5.37467 4.33329 5.83301 4.33329ZM15.833 1.83329H9.16634V8.49996H2.49967V0.166626H0.833008V12.6666H2.49967V10.1666H17.4997V12.6666H19.1663V5.16663C19.1663 3.32496 17.6747 1.83329 15.833 1.83329ZM17.4997 8.49996H10.833V3.49996H15.833C16.7497 3.49996 17.4997 4.24996 17.4997 5.16663V8.49996Z" fill="#858585" />
                  </svg>
                  <p class="ml-1 text-sm text-neutral-400">
                    {{ post.totalBedRoom }}
                  </p>
                </div>

                <span class="text-neutral-400">·</span>

                <div class="flex items-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.4 7.2V7.8C11.4 8.946 10.758 9.942 9.81 10.446L10.2 12H9L8.7 10.8H3.3L3 12H1.8L2.19 10.446C1.70951 10.1911 1.30758 9.81008 1.02744 9.34387C0.747286 8.87766 0.599511 8.34391 0.6 7.8V7.2H0V6H10.8V1.8C10.8 1.64087 10.7368 1.48826 10.6243 1.37574C10.5117 1.26321 10.3591 1.2 10.2 1.2C9.9 1.2 9.672 1.404 9.6 1.674C9.978 1.998 10.2 2.478 10.2 3H6.6C6.6 2.52261 6.78964 2.06477 7.12721 1.72721C7.46477 1.38964 7.92261 1.2 8.4 1.2H8.502C8.748 0.504 9.414 0 10.2 0C10.6774 0 11.1352 0.189642 11.4728 0.527208C11.8104 0.864773 12 1.32261 12 1.8V7.2H11.4ZM10.2 7.2H1.8V7.8C1.8 8.27739 1.98964 8.73523 2.32721 9.07279C2.66477 9.41036 3.12261 9.6 3.6 9.6H8.4C8.87739 9.6 9.33523 9.41036 9.67279 9.07279C10.0104 8.73523 10.2 8.27739 10.2 7.8V7.2Z" fill="#4D5056" />
                  </svg>
                  <p class="ml-1 text-sm text-neutral-400">
                    {{ post.totalWC }}
                  </p>
                </div>

                <span class="text-neutral-400">·</span>

                <div class="flex items-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.33333 0H0V1.33333H1.33333V0ZM2.66667 0H4V1.33333H2.66667V0ZM6.66667 0H5.33333V1.33333H6.66667V0ZM8 0H9.33333V1.33333H8V0ZM10.6667 0H12V1.33333H10.6667V0ZM0 2.66667H1.33333V4H0V2.66667ZM1.33333 5.33333H0V6.66667H1.33333V5.33333ZM0 8H1.33333V9.33333H0V8ZM1.33333 10.6667H0V12H1.33333V10.6667ZM2.66667 10.6667H4V12H2.66667V10.6667ZM6.66667 10.6667H5.33333V12H6.66667V10.6667ZM10.6667 5.33333H12V6.66667H10.6667V5.33333ZM12 2.66667H10.6667V4H12V2.66667ZM8 9.33333V8H12V9.33333H10.6667V10.6667H9.33333V12H8V9.33333ZM10.6667 10.6667V12H12V10.6667H10.6667Z" fill="#4D5056" />
                  </svg>

                  <p class="ml-1 text-sm text-neutral-400">
                    {{ post.acreage }}
                  </p>
                </div>
              </div>
            </div>
            <h4 class="mt-1 text-xs">
              {{ post.title }}
            </h4>
            <div class="mt-1 flex items-center justify-between text-neutral-400 text-xs">
              <p class="truncate ...">
                {{ post.address }}
              </p>
              <p class="ml-3 shrink-0">
                {{ post.date }}
              </p>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendedPosts',
  props: {
    posts: { type: Array, require: true, default: null },
    title: { type: String, require: true, default: null}
  },

  computed: {
    formatedPosts () {
      return this.posts.map((p) => {
        return {
          srcimage: 'https://weblisting.ss-hn-1.bizflycloud.vn/' + (p.gallery.find(c => !c.includes('.mp4')) || 'temporary-apartment-gallery.jpg'),
          title: p.pageInfor.title,
          slug: p.pageInfor.slug,
          price: this.formatPrice(p.price, p.demand),
          totalBedRoom: p.totalBedRoom,
          totalWC: p.totalWC,
          acreage: p.acreage + 'm²',
          address: p.project?.address.street + ', ' + p.project?.address.district + ', ' + p.project?.address.city,
          date: this.formatDate(p.lastUpdatedAt),
          tags: p.tags,
          id: p.id
        };
      });
    }
  },

  methods: {
    scrollBy (amount) {
      const container = this.$refs.recommendedPostsContainer;
      const start = container.scrollLeft;

      this.animate({
        duration: 500,
        timing: this.easeInOutSine,
        draw: (progress) => {
          container.scrollLeft = start + (progress * amount);
        }
      });
    },

    // https://easings.net/#easeInOutSine
    easeInOutSine (timeFraction) {
      return -(Math.cos(Math.PI * timeFraction) - 1) / 2;
    },

    // https://javascript.info/js-animation
    animate ({ timing, draw, duration }) {
      const start = performance.now();

      requestAnimationFrame(function animate (time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) { timeFraction = 1; }

        // calculate the current animation state
        const progress = timing(timeFraction);

        draw(progress); // draw it

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      });
    },

    formatDate (dateStr) {
      const date = new Date(dateStr);
      const diffInDays = Math.floor((Date.now() - date.getTime()) / 86400000);

      if (diffInDays === 0) {
        return 'Hôm nay';
      }

      if (diffInDays === 1) {
        return 'Hôm qua';
      }

      if (diffInDays < 7) {
        return `${diffInDays} ngày trước`;
      }

      if (diffInDays < 30) {
        const diffInWeeks = Math.floor(diffInDays / 7);
        return `${diffInWeeks} tuần trước`;
      }

      if (diffInDays < 365) {
        const diffInMonths = Math.min(11, Math.floor(diffInDays / 30));
        return `${diffInMonths} tháng trước`;
      }

      const diffInYears = Math.floor(diffInDays / 365);
      return `${diffInYears} năm trước`;
    },

    formatPrice (price, demand) {
      if (demand === 'Cho Thuê') {
        return `${price / 1e6} triệu/tháng`;
      } else {
        return `${parseFloat((price / 1e9).toFixed(2))} tỷ`;
      }
    }
  }
};
</script>

<style scoped>
.post-img {
  width: 100%;
  height: 202px;
}

.post {
  width: 290px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>
