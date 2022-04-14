<template>
	<div
		style="word-break: break-word"
		class="mb-4"
		v-if="!comment.commentParentId || comment.commentParentId == ''"
	>
		<p class="text-base font-bold leading-4">
			{{ comment.author.authorName }}
		</p>
		<p v-html="comment.content"></p>
		<div class="flex items-start justify-start space-x-2">
			<span class="text-sky-500 cursor-pointer" @click="toggleReply"
				>Trả lời</span
			>
			<p>·</p>
			<span>{{ comment.createdAt.substring(0, 10) }}</span>
		</div>
		<div class="ml-10 mt-4">
			<template v-if="showReply">
				<new-comment
					v-model="newCmt"
					:autoFocus="true"
					:handleSubmitSuccessful="handleSubmit"
					class="mb-4"
				/>
			</template>
			<template v-if="comment.replies.length > 0">
				<reply-comment
					:replies="comment.replies"
					:isShow="showReply"
					:createReply="createReply"
				/>
			</template>
		</div>
		<divider class="mt-5" />
	</div>
</template>

<script>
import Divider from "../Divider.vue";
import newComment from "./new-comment.vue";
import replyComment from "./reply-comment.vue";

export default {
  components: {
    newComment,
    replyComment,
    Divider,
  },
  methods: {
    toggleReply() {
      this.showReply = !this.showReply;
    },
    handleSubmit: function () {
      this.createReply(this.comment.id, this.newCmt);
      this.newCmt = "";
    },
  },
  data() {
    return {
      showReply: false,
      newCmt: "",
    };
  },
  props: {
    isChild: { type: Boolean, default: false },
    comment: {
      type: Object,
      default: {
        CommentParentId: null,
        DiscussionId: "",
        Author: {
          AuthorId: "",
          AuthorName: "",
        },
        CommentType: "",
        Content: "",
      },
    },
    createReply: {
      type: Function,
      default: () => {
        console.log("create reply comment");
      },
    },
  },
};
</script>
