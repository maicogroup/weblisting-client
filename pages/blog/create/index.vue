<template>
  <div>
    <Editor :blog-content="editorContent" @contentChanged="onChange" />
  </div>
</template>

<script>
import Editor from "~/components/editor/Editor.vue";

export default {
  components: { Editor },
  data() {
    return { editorContent: { time: "", blocks: [], version: "2.22.2" } };
  },
  methods: {
    onChange(data) {
      console.log("component content was changed...");
      this.editorContent = data;
    },
  },
};
</script>
