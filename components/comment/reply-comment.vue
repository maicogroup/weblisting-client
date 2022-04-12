<template>
  <div
    class="bg-slate-50 flex flex-col w-fill items-start justify-between px-3 py-4 rounded-lg border-2 border-stone-300 box-border"
  >
    <div
      v-for="reply in replies"
      :key="reply.id"
      class="flex items-start flex-col justify-start w-full"
    >
      <template v-if="replies.indexOf(reply) <= max">
        <p
          class="text-base mb-2"
          v-html="
            `<strong>${
              reply.author.authorName
            }</strong> · ${reply.createdAt.substring(0, 10)}`
          "
        />
        <p
          class="text-base"
          :class="{ 'mb-2': replies.indexOf(reply) < replies.length - 1 }"
        >
          {{ reply.content }}
        </p>
        <divider
          v-if="
            replies.indexOf(reply) < replies.length - 1 &&
            replies.indexOf(reply) !== max
          "
          class="mb-2 w-full"
        />
      </template>
    </div>
    <span
      v-if="replies.length > 3"
      class="w-full text-center cursor-pointer underline"
      @click="toggleSeeMore"
    >
      <divider class="mb-2" />
      {{
        max !== replies.length
          ? `Hiển thị thêm ${replies.length - 1 - max} bình luận`
          : "Thu gọn"
      }}</span
    >
  </div>
</template>

<script>
import NewComment from "./new-comment.vue";

export default {
  data() {
    return {
      newCmt: "",
      max: 3,
    };
  },
  methods: {
    toggleSeeMore() {
      if (this.max !== this.replies.length) this.max = this.replies.length;
      else this.max = 3;
    },
  },
  props: {
    createReply: {
      type: Function,
      default: () => {
        console.log("oke");
      },
    },
    replies: {
      type: Array,
      default: [],
    },
    parentId: { type: String, default: "" },
  },
  components: {
    NewComment,
  },
};
</script>
