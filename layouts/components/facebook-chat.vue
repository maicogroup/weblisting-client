<template>
  <div>
    <div id="fb-root" />

    <!-- Your Plugin chat code -->
    <div id="fb-customer-chat" class="fb-customerchat" />
  </div>
</template>

<script>
export default {
  name: 'FacebookChat',
  mounted () {
    if (process.client) {
      // Facebook chat configuration
      const chatbox = document.getElementById('fb-customer-chat');
      chatbox.setAttribute('page_id', '2352735844786718');
      chatbox.setAttribute('attribution', 'biz_inbox');
      window.fbAsyncInit = function () {
        FB.init({
          xfbml: true,
          version: 'v13.0'
        });
      };

      (function (d, s, id) {
        let js; const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  }
};
</script>

<style>

</style>
