<template>
  <div class="editorWrapper w-full">
    <p class="mb-2 text-zinc-800 font-medium">{{ title }}</p>
    <div class="rounded-md border border-neutral-300 pt-8 min-h-[500px]">
      <div id="editorjs" class="w-full" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Editor",
  props: {
    title: { type: String, default: "" },
    existingContent: { type: Object, default: () => {} },
  },
  data() {
    return {
      editor: null,
    };
  },
  head() {
    return {
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
  async mounted() {
    const editorOptions = {
      id: "editorjs",
      data: this.existingContent,
      onChange: this.onChange,
    };
    this.editor = this.$editor(editorOptions);
    await this.editor.isReady;
  },
  methods: {
    async onChange() {
      try {
        const updatedData = await this.editor.save();
        console.log("Article data saved: ", updatedData);
        this.$emit("contentChanged", updatedData);
      } catch (error) {
        console.log("Saving failed: ", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ce-block {
  background-color: black !important;
}
.ce-block__content > p {
  color: red;
}
.image-tool__image > img {
  height: 100px;
}

.editorWrapper h1.ce-header:first-of-type {
  font-size: 50px !important;
}
</style>
