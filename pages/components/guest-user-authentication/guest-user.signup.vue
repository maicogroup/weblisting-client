<<<<<<< HEAD
<template>
  <div
    class="
      w-72
      absolute
      top-1/2
      left-1/2
      -translate-x-1/2 -translate-y-1/2
      p-8
      bg-white
      rounded-md
      shadow-xl
    "
  >
    <button
      class="absolute right-3 top-3 p-1 hover:bg-gray-50 rounded-full"
      @click="$emit('cancel')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <label class="block">
      <p class="font-semibold">Số điện thoại:</p>
      <input
        v-model="phoneNumber"
        :maxlength="PHONE_NUMBER_LIMIT"
        class="w-full px-2 py-1 text-sm border rounded-md outline-none"
      />
      <p v-if="showError" class="text-xs text-red-600">
        {{ phoneNumberErrorMsg }}
      </p>
    </label>

    <label class="block mt-5">
      <p class="font-semibold">Tên:</p>
      <input
        v-model.trim="name"
        :maxlength="NAME_CHARACTER_LIMIT"
        class="w-full px-2 py-1 text-sm border rounded-md outline-none"
      />
      <p v-if="showError" class="text-xs text-red-600">{{ nameErrorMsg }}</p>
    </label>

    <p v-if="errorMsg" class="text-red-600 text-xs mt-4">
      {{ errorMsg }}
    </p>

    <button
      class="
        w-full
        mt-6
        p-2
        rounded-md
        text-slate-50
        bg-green-500
        hover:bg-green-600
      "
      @click="signUp"
    >
      Đăng ký
    </button>

    <button
      class="block mt-2 mx-auto text-sm text-blue-500 hover:text-blue-600"
      @click="$emit('login')"
    >
      Đã có tài khoản? Đăng nhập
    </button>
  </div>
</template>

<script>
import { gql } from "graphql-tag";

export default {
  data() {
    return {
      name: "",
      phoneNumber: "",
      errorMsg: "",
      showError: false,

      NAME_CHARACTER_LIMIT: 20,
      NAME_CHARACTER_MINIMUM: 2,
      PHONE_NUMBER_LIMIT: 10,
      // chỉ cho phép chữ cái và giữa mỗi từ là một dáu cách duy nhất
      VALID_NAME_REGEX: /^[\p{L}\p{M}]+(\s[\p{L}\p{M}]+)*$/u,
      VALID_PHONE_NUMBER_REGEX: /^[0-9]{10}$/,
    };
  },

  computed: {
    nameErrorMsg() {
      if (this.name.length < this.NAME_CHARACTER_MINIMUM) {
        return "*Tên phải có ít nhất 2 ký tự";
      }
      if (!this.VALID_NAME_REGEX.test(this.name)) {
        return "*Tên không được chứa ký tự đặc biệt, mỗi từ chỉ cách nhau bởi một dấu cách";
      } else {
        return "";
      }
    },

    phoneNumberErrorMsg() {
      if (!this.VALID_PHONE_NUMBER_REGEX.test(this.phoneNumber)) {
        return "*Số điện thoại không hợp lệ";
      } else {
        return "";
      }
    },

    nameIsValid() {
      return (
        this.name.length >= this.NAME_CHARACTER_MINIMUM &&
        this.name.length <= this.NAME_CHARACTER_LIMIT &&
        this.VALID_NAME_REGEX.test(this.name)
      );
    },

    phoneNumberIsValid() {
      return this.VALID_PHONE_NUMBER_REGEX.test(this.phoneNumber);
    },
  },

  methods: {
    moveToSignUpForm() {
      this.errorMsg = "";
      this.alreadyHasAccount = false;
    },

    async signUp() {
      if (!this.nameIsValid || !this.phoneNumberIsValid) {
        this.showError = true;
        return;
      }

      try {
        let id = "";
        await this.$apollo.mutate({
          mutation: gql`
            mutation CreateGuestUser($input: CreateGuestUserInput!) {
              createGuestUser(input: $input) {
                string
              }
            }
          `,
          variables: {
            input: {
              name: this.name,
              phoneNumber: this.phoneNumber,
            },
          },
          update: (store, { data: { createGuestUser } }) => {
            id = createGuestUser.string;
          },
        });

        this.$emit("success", {
          name: this.name,
          phoneNumber: this.phoneNumber,
          id: id,
        });
        this.errorMsg = "";
        this.name = "";
        this.phoneNumber = "";
      } catch (e) {
        if (
          e.graphQLErrors.find((e) => e.extensions.code === "GUEST_USER_EXISTS")
        ) {
          this.errorMsg =
            "*Số điện thoại đã được sử dụng, hãy sử dụng số điện thoại khác";
        } else {
          this.errorMsg = "*Lỗi đã xảy ra, vui lòng thử lại";
        }
      }
    },
  },
};
</script>
=======
<template>
	<div
		class="w-72 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-md shadow-xl"
	>
		<button
			class="absolute right-3 top-3 p-1 hover:bg-gray-50 rounded-full"
			@click="$emit('cancel')"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>

		<label class="block">
			<p class="font-semibold">Số điện thoại:</p>
			<input
				v-model="phoneNumber"
				:maxlength="PHONE_NUMBER_LIMIT"
				class="w-full px-2 py-1 text-sm border rounded-md outline-none"
			/>
			<p v-if="showError" class="text-xs text-red-600">
				{{ phoneNumberErrorMsg }}
			</p>
		</label>

		<label class="block mt-5">
			<p class="font-semibold">Tên:</p>
			<input
				v-model.trim="name"
				:maxlength="NAME_CHARACTER_LIMIT"
				class="w-full px-2 py-1 text-sm border rounded-md outline-none"
			/>
			<p v-if="showError" class="text-xs text-red-600">{{ nameErrorMsg }}</p>
		</label>

		<p v-if="errorMsg" class="text-red-600 text-xs mt-4">
			{{ errorMsg }}
		</p>

		<button
			class="w-full mt-6 p-2 rounded-md text-slate-50 bg-green-500 hover:bg-green-600"
			@click="signUp"
		>
			Đăng ký
		</button>

		<button
			class="block mt-2 mx-auto text-sm text-blue-500 hover:text-blue-600"
			@click="$emit('login')"
		>
			Đã có tài khoản? Đăng nhập
		</button>
	</div>
</template>

<script>
import { gql } from "graphql-tag";

export default {
	data() {
		return {
			name: "",
			phoneNumber: "",
			errorMsg: "",
			showError: false,

			NAME_CHARACTER_LIMIT: 20,
			NAME_CHARACTER_MINIMUM: 2,
			PHONE_NUMBER_LIMIT: 10,
			// chỉ cho phép chữ cái và giữa mỗi từ là một dáu cách duy nhất
			VALID_NAME_REGEX: /^[\p{L}\p{M}]+(\s[\p{L}\p{M}]+)*$/u,
			VALID_PHONE_NUMBER_REGEX: /^[0-9]{10}$/,
		};
	},

	computed: {
		nameErrorMsg() {
			if (this.name.length < this.NAME_CHARACTER_MINIMUM) {
				return "*Tên phải có ít nhất 2 ký tự";
			}
			if (!this.VALID_NAME_REGEX.test(this.name)) {
				return "*Tên không được chứa ký tự đặc biệt, mỗi từ chỉ cách nhau bởi một dấu cách";
			} else {
				return "";
			}
		},

		phoneNumberErrorMsg() {
			if (!this.VALID_PHONE_NUMBER_REGEX.test(this.phoneNumber)) {
				return "*Số điện thoại không hợp lệ";
			} else {
				return "";
			}
		},

		nameIsValid() {
			return (
				this.name.length >= this.NAME_CHARACTER_MINIMUM &&
				this.name.length <= this.NAME_CHARACTER_LIMIT &&
				this.VALID_NAME_REGEX.test(this.name)
			);
		},

		phoneNumberIsValid() {
			return this.VALID_PHONE_NUMBER_REGEX.test(this.phoneNumber);
		},
	},

	methods: {
		moveToSignUpForm() {
			this.errorMsg = "";
			this.alreadyHasAccount = false;
		},

		async signUp() {
			if (!this.nameIsValid || !this.phoneNumberIsValid) {
				this.showError = true;
				return;
			}

			try {
				let id = "";
				await this.$apollo.mutate({
					mutation: gql`
						mutation CreateGuestUser($input: CreateGuestUserInput!) {
							createGuestUser(input: $input) {
								string
							}
						}
					`,
					variables: {
						input: {
							name: this.name,
							phoneNumber: this.phoneNumber,
						},
					},
					update: (store, { data: { CreateGuestUser } }) => {
						id = CreateGuestUser.string;
					},
				});

				this.$emit("success", {
					name: this.name,
					phoneNumber: this.phoneNumber,
					id: id,
				});
				this.errorMsg = "";
				this.name = "";
				this.phoneNumber = "";
			} catch (e) {
				if (
					e.graphQLErrors.find(e => e.extensions.code === "GUEST_USER_EXISTS")
				) {
					this.errorMsg =
						"*Số điện thoại đã được sử dụng, hãy sử dụng số điện thoại khác";
				} else {
					this.errorMsg = "*Lỗi đã xảy ra, vui lòng thử lại";
				}
			}
		},
	},
};
</script>
>>>>>>> dev
