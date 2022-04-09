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
				@blur="findNameOfPhoneNumber"
			/>
			<p v-if="showError" class="text-red-600 text-xs">
				{{ errorMsg }}
			</p>
		</label>

		<label class="block mt-5">
			<p class="font-semibold text-gray-500">Tên:</p>
			<input
				:disabled="true"
				:placeholder="$apollo.queries.user.loading ? 'Đang tìm...' : ''"
				:value="loginName"
				class="bg-gray-100 w-full px-2 py-1 text-sm text-green-600 text-opacity-70 border rounded-md outline-none"
			/>
		</label>

		<button
			:aria-disabled="!user"
			:class="`w-full mt-6 p-2 rounded-md text-slate-50 ${loginButtonClasses}`"
			@click="signIn"
		>
			Đăng nhập
		</button>

		<button
			class="block mt-2 mx-auto text-sm text-blue-500 hover:text-blue-600"
			@click="$emit('signup')"
		>
			Chưa có tài khoản? Đăng ký
		</button>
	</div>
</template>

<script>
import { gql } from "graphql-tag";
export default {
	apollo: {
		user: {
			query: gql`
				query GetGuestUser($phoneNumber: String!) {
					user(where: { phoneNumber: { eq: $phoneNumber } }) {
						name
						phoneNumber
						id
					}
				}
			`,

			fetchPolicy: "no-cache",

			update(data) {
				this.showError = true;

				if (data.user) {
					this.loginName = data.user.name;
				} else {
					this.loginName = "";
				}

				return data.user;
			},
			skip: true,
		},
	},

	data() {
		return {
			loginName: "",
			phoneNumber: "",
			showError: false,

			PHONE_NUMBER_LIMIT: 10,
		};
	},

	computed: {
		loginButtonClasses() {
			return this.user
				? "bg-green-500 hover:bg-green-600"
				: "bg-gray-500 cursor-not-allowed";
		},

		errorMsg() {
			return this.user
				? ""
				: "*Tài khoản không tồn tại, hãy kiểm tra lại số điện thoại";
		},
	},

	methods: {
		findNameOfPhoneNumber() {
			this.$apollo.queries.user.setVariables({
				phoneNumber: this.phoneNumber,
			});
			this.$apollo.queries.user.skip = false;
		},

		signIn() {
			if (!this.user) {
				this.showError = true;
				return;
			}

			this.$emit("success", {
				name: this.user.name,
				phoneNumber: this.user.phoneNumber,
				id: this.user.id,
			});
			this.loginName = "";
		},
	},
};
</script>
