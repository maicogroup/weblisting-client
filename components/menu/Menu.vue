<template>
	<div>
		<button
			class="w-full flex justify-between items-center py-3 px-6 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
			@click="open = !open"
		>
			<span class="flex items-center">
				<span class="mx-4 font-medium">{{ title }}</span>
			</span>

			<span>
				<svg
					class="h-4 w-4"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						v-if="!open"
						d="M9 5L16 12L9 19"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						v-if="open"
						d="M19 9L12 16L5 9"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
		</button>

		<div v-if="open" class="bg-gray-50">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: "MenuComponent",

	props: {
		title: { type: String, default: "" },
	},

	data() {
		return {
			open: false,
		};
	},
};
</script>

<style></style>
