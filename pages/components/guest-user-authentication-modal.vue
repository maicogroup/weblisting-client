<template>
  <div v-if="open" class="fixed inset-0 h-full w-full z-30 bg-black bg-opacity-60" @click.self="closeModal">
    <guest-user-login v-if="alreadyHasAccount" @signup="moveToSignUpForm" @success="setCookiesAndCloseModal" @cancel="closeModal" />
    <guest-user-signup v-else @login="moveToLoginForm" @success="setCookiesAndCloseModal" @cancel="closeModal" />
  </div>
</template>

<script>
import guestUserLogin from './guest-user-authentication/guest-user-login.vue';
import GuestUserSignup from './guest-user-authentication/guest-user.signup.vue';
export default {
  components: { guestUserLogin, GuestUserSignup },

  props: {
    open: {
      type: Boolean, required: true, default: false
    }
  },

  data () {
    return {
      alreadyHasAccount: true
    };
  },

  methods: {
    moveToSignUpForm () {
      this.alreadyHasAccount = false;
    },

    moveToLoginForm () {
      this.alreadyHasAccount = true;
    },

    setCookiesAndCloseModal (user) {
      this.$cookies.set('GuestUser', { name: user.name, phoneNumber: user.phoneNumber },
        {
          maxAge: 60 * 60 * 24 * 365
        });

      this.closeModal();
    },

    closeModal () {
      this.alreadyHasAccount = true;
      this.$emit('close');
    }
  }
};
</script>
