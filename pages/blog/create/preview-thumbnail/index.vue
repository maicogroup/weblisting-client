<template>
  <div class="flex flex-col align-center w-full">
    <label
      class="cursor-pointer px-4 mb-2 text-center text-zinc-800 font-medium w-full rounded-md border border-neutral-300 py-2"
      for="thumbnail"
    >
      Tải lên ảnh thumnail
    </label>
    <input
      id="thumbnail"
      type="file"
      class="hidden"
      accept=".png,.gif,.jpeg, jpg"
      @change="handlePreview"
    />
    <img v-if="readyPreview" :src="image.preview" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: null,
      readyPreview: false,
    };
  },
  props: {
    setThumbnail: { type: Function, default: () => {} },
  },
  unmounted() {
    if (this.image?.preview) {
      URL.revokeObjectURL(this.image.preview);
    }
  },
  methods: {
    handlePreview(e) {
      if (this.image?.preview) {
        URL.revokeObjectURL(this.image.preview);
      }
      this.image = e.target.files[0];
      this.image.preview = URL.createObjectURL(this.image);
      this.readyPreview = true;
      this.setThumbnail(this.image);
    },
  },
};
</script>
