// Lý do phải tạo component cho nút share link facebook:
// https://stackoverflow.com/questions/69345590/facebook-share-button-disappear-when-route-changed-in-nuxt-js-vue-js

<template>
  <div class="max-h-4">
    <div id="fb-root" />
    <div class="fb-share-button" style="line-height:0" :data-href="shareUrl" data-layout="button" data-size="small">
      <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FacebookShareButton',
  props: { shareUrl: { type: String, optional: false, default: '' } },
  head: {
    script: [{
      hid: 'fb',
      src: 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v13.0',
      defer: true,
      body: true,
      // eslint-disable-next-line no-undef
      callback: () => FB.XFBML.parse()
    }]
  }
};
</script>
