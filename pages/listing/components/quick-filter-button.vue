<template>
	<button
		class="flex justify-between items-center hover:text-green-500 text-sm mt-3"
		@click="$emit('click', $event)"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="mr-1 h-3 w-3"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="3"
				d="M9 5l7 7-7 7"
			/>
		</svg>
		<slot />
	</button>
</template>

<script>
export default {
	name: "QuickFilterButton",
};
</script>
