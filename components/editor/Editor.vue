<template>
  <div id="editorjs" />
</template>

<script>
export default {
  name: "Editor",
  props: {
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
