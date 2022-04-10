<template>
	<div
		class="h-7 w-7 flex justify-center items-center bg-green-500 rounded-full"
	>
		<p class="text-slate-50 text-sm">
			{{ avatarName }}
		</p>
	</div>
</template>

<script>
export default {
	name: "GuestUserAvatar",
	props: {
		name: { type: String, required: true, default: "Anonymous" },
	},

	computed: {
		avatarName() {
			return this.name
				.split(" ")
				.slice(-2)
				.map(item => item[0])
				.join("")
				.toUpperCase();
		},
	},
};
</script>

<style></style>
