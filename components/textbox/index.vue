<template>
	<div class="w-full">
		<p class="mb-2 text-zinc-800 font-medium">{{ title }}</p>
		<textarea
			v-if="type === 'textarea'"
			rows="3"
			class="w-full border border-neutral-200 rounded-md p-2 text-zinc-700 text-base resize-none"
			:value="value"
			:pattern="pattern"
			:name="name"
			@change="handleChange"
			@input="$emit('input', $event.target.value)"
		/>
		<input
			v-else
			class="w-full border border-neutral-200 rounded-md p-2 text-zinc-700 text-base"
			:type="inputType"
			:value="value"
			:pattern="pattern"
			:name="name"
			@change="handleChange"
			@input="$emit('input', $event.target.value)"
		/>
		<p class="errorMessage" v-if="error">{{ errorMessage }}</p>
	</div>
</template>

<script>
export default {
	props: {
		title: { type: String, default: "" },
		value: { type: String, default: "" },
		pattern: { type: String, default: "" },
		errorMessage: { type: String, default: "" },
		handleChange: { type: Function, default: () => {} },
		type: { type: String, default: "" },
		error: { type: Boolean, default: false },
		name: { type: String, default: "" },
		inputType: { type: String, default: "text" },
	},
};
</script>

<style lang="scss" scoped>
input:invalid .errorMessage {
	display: inline-block;
}
.errorMessage {
	color: red;
	margin-top: 0.5rem;
}

::-webkit-scrollbar {
	width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
	background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}
</style>
