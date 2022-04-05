<template>
  <div class="flex w-full items-start justify-between space-x-2">
    <textarea
      v-model="localValue"
      type="text"
      @input="$emit('input', $event.target.value)"
      class="
        w-full
        py-2
        px-3
        resize-none
        border-[1px] border-stone-200
        rounded-md
        text-base
      "
      :rows="rowText < 2 ? 2 : rowText"
      placeholder="Mời bạn để lại bình luận"
      @keyup.enter.exact="handleSubmit"
      @keyup.alt.enter="newLine"
      @keyup.ctrl.enter="newLine"
      ref="focusMe"
    />
    <button-basic
      size="md"
      :handleClick="handleSubmit"
      class="bg-green-600 px-5 py-2 whitespace-nowrap text-white rounded-md"
    >
      Bình luận
    </button-basic>
  </div>
</template>

<script>
import ButtonBasic from "~/components/button-basic/index.vue";
export default {
  props: {
    handleSubmitSuccessful: {
      type: Function,
      default: () => {
        console.log("is cmt");
      },
    },
    autoFocus: { type: Boolean, default: false },
  },
  data() {
    return {
      localValue: "",
    };
  },
  mounted() {
    this.autoFocus && this.$refs.focusMe.focus();
  },
  computed: {
    rowText: function () {
      return this.localValue.split("\n").length;
    },
  },
  methods: {
    newLine: function () {
      this.localValue = this.localValue + " \n";
    },
    isValueEmpty: function () {
      if ((this.localValue.match(/^\s*$/) || []).length > 0) {
        return true;
      }      
      return false;
    },
    handleSubmit: function () {
      if (!this.isValueEmpty())
      {
        this.handleSubmitSuccessful();
        this.localValue = "";
      }
      else {
        return;
      }
    }
  },
  components: { ButtonBasic },
};
</script>
