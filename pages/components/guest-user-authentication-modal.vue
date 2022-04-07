<template>
  <div
    v-if="open"
    class="fixed inset-0 h-full w-full z-30 bg-black bg-opacity-60"
    @click.self="cancelModal"
  >
    <guest-user-login
      v-if="alreadyHasAccount"
      @signup="moveToSignUpForm"
      @success="setCookiesAndCloseModal"
      @cancel="cancelModal"
    />
    <guest-user-signup
      v-else
      @login="moveToLoginForm"
      @success="setCookiesAndCloseModal"
      @cancel="cancelModal"
    />
  </div>
</template>

<script>
import guestUserLogin from './guest-user-authentication/guest-user-login.vue';
import GuestUserSignup from './guest-user-authentication/guest-user.signup.vue';
export default {
  components: { guestUserLogin, GuestUserSignup },

  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
    signUp: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      alreadyHasAccount: !this.signUp,
    };
  },

  watch: {
    signUp(newVal) {
      this.alreadyHasAccount = !newVal;
    },
  },

  methods: {
    moveToSignUpForm() {
      this.alreadyHasAccount = false;
    },

    moveToLoginForm() {
      this.alreadyHasAccount = true;
    },

    setCookiesAndCloseModal(user) {
      this.$cookies.set(
        "GuestUser",
        { name: user.name, phoneNumber: user.phoneNumber, id: user.id },
        {
          maxAge: 60 * 60 * 24 * 365,
          path: "/",
        }
      );
      
      this.$nuxt.$emit("userLogin");
      this.alreadyHasAccount = !this.signUp;
      this.$emit("close");
      this.$emit("success");
      location.reload();
    },

    cancelModal() {
      this.alreadyHasAccount = !this.signUp;
      this.$emit("close");
      this.$emit("cancel");
    },
  },
};
</script>
