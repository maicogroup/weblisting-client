<template>
  <div class="flex flex-row w-full justify-center mb-72">
    <div class="flex flex-col items-center w-[52.25rem] mr-2">
      <h1 class="text-3xl font-bold mb-10">Thêm bài viết</h1>
      <textbox class="mb-6" title="Tiêu đề" :value="values.PageInfor.Title" />
      <h2 class="mb-2 text-zinc-800 font-medium"></h2>
      <Editor
        :blog-content="editorContent"
        @contentChanged="onChange"
        title="Nội dung"
        class="mb-5"
      />
      <button-basic class="self-end">Đăng bài</button-basic>
    </div>
    <div
      class="flex flex-col w-[22rem] mt-[214px] items-center rounded-md border border-neutral-300 h-fit p-5"
    >
      <h2 class="mb-7 text-stone-900 font-bold text-lg">Thiết lập bài viết</h2>
      <textbox class="mb-7" title="Slug" />
      <textbox title="Meta description" />
    </div>
  </div>
</template>

<script>
import Editor from "~/components/editor/Editor.vue";
import Textbox from "~/components/textbox/index.vue";
import ButtonBasic from "~/components/button-basic/index.vue";

export default {
  components: { Editor, Textbox, ButtonBasic },
  data() {
    return {
      editorContent: { time: "", blocks: [], version: "2.22.2" },
      values: {
        CreatedAt: "2022-03-26T12:22:30.529Z",
        PageInfor: {
          Slug: "",
          Title: "",
          MetaDescription: "",
        },
        Content: "",
        AuthorId: "",
        Status: "",
      },
    };
  },
  methods: {
    onChange(data) {
      this.editorContent = data;
    },
  },
};
</script>
