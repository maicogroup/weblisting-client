<template>
  <div>
    <div class="flex mt-3 lg:mt-4">
      <img
        :src="comment.authorAvatarSource"
        class="mt-1 w-10 h-10 rounded-full cursor-pointer"
      />
      <div
        class="ml-2 border rounded-xl py-0.5 pl-2 pr-3 bg-slate-50 leading-4"
      >
        <a href="#" class="font-bold text-sm">
          {{ comment.authorName }}
        </a>
        <span class="text-sm text-[#858585]">
          {{ comment.dateCreated }}
        </span>
        <p class="text-sm font-normal leading-4">
          {{ comment.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment"],
  data() {
    return {
    //   comment: createComment(),
    };
  },
  methods: {
    //todo: đổi thành dạng "x phút trước/x ngày trước"
    formatCommentDateCreated(dateCreated) {
      
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