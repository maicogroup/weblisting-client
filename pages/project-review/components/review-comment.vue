<template>
  <div>
    <div class="flex mt-3 lg:mt-4">
      <guest-user-avatar
        :name="comment.authorName"
        class="mt-1 w-10 h-10 rounded-full cursor-pointer"
      ></guest-user-avatar>
      <div
        class="ml-2 border rounded-xl py-0.5 pl-2 pr-3 bg-slate-50 leading-4"
      >
        <a href="#" class="font-bold text-sm">
          {{ comment.authorName }}
        </a>
        <span class="text-sm text-[#858585]">
          {{ formatPostDate(comment.dateCreated) }}
        </span>
        <p class="text-sm font-normal leading-4">
          {{ comment.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import GuestUserAvatar from "~/pages/components/guest-user-avatar.vue";

export default {
  components: { GuestUserAvatar },
  props: ["comment"],
  data() {
    return {
      //   comment: createComment(),
    };
  },
  methods: {
    // todo: đổi thành dạng "x phút trước/x ngày trước"
    formatPostDate(time) {
      this.today = new Date();
      const hi = new Date(time);
      if (
        this.today.getFullYear() === hi.getFullYear() &&
        this.today.getMonth() === hi.getMonth()
      ) {
        if (this.today.getDate() === hi.getDate() + 1) {
          return "Hôm qua";
        } else if (this.today.getDate() === hi.getDate()) {
          if (this.today.getHours() - hi.getHours() > 0) {
            return this.today.getHours() - hi.getHours() + " giờ trước";
          } else if (this.today.getHours() === hi.getHours()) {
            if (this.today.getMinutes() - hi.getMinutes() === 0) {
              return "Vừa xong";
            }
            return this.today.getMinutes() - hi.getMinutes() + " phút trước";
          }
        } else {
          return this.formatReviewDateCreated(hi);
        }
      } else {
        return this.formatReviewDateCreated(hi);
      }
    },
  },
};
function createComment() {
  return {
    authorName: "Linh Chí",
    authorAvatarSource:
      "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
    dateCreated: new Date(2069, 3, 19, 9, 4, 23),
    content: "Đúng vậy hết sức bất mãn với cái vụ cơm chó này, vote 1 sao",
  };
}
</script>

<style>
</style>
