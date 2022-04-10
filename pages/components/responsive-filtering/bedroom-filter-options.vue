<template>
	<div>
		<div
			class="w-full flex justify-between border rounded h-11 items-center px-3 mb-4"
			@click="open = !open"
		>
			<p class="truncate ...">
				{{ displaySelected }}
			</p>
			<svg
				width="8"
				height="14"
				viewBox="0 0 8 14"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1 13L7 7L1 1"
					stroke="#999999"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
		<div
			v-if="open"
			ref="dropdownContent"
			class="fixed inset-0 mt-12 w-full z-30 bg-white opacity-100 overflow-auto"
		>
			<div class="flex justify-between border-b rounded">
				<div class="absolute top-1.5 left-2" @click="open = false">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="26"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#32c82b"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M19 12H6M12 5l-7 7 7 7" />
					</svg>
				</div>
				<p class="font-semibold px-6 py-2 mr-auto ml-auto">
					Chọn số lượng phòng ngủ
				</p>
			</div>
			<div class="flex space-x-4 px-6">
				<div class="flex-col space-y-1 w-full">
					<label
						v-for="option in bedroomOptions"
						:key="option"
						class="flex justify-between h-11 border-b items-center mx-3"
					>
						<span class="whitespace-nowrap ml-2 text-gray-700"
							>{{ option }} Phòng</span
						>
						<input
							v-model="selectedChoices"
							:value="option"
							type="checkbox"
							class="form-checkbox h-4 w-4 text-gray-600"
						/>
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "BedroomFilterOptions",
	props: {
		selectedOption: { type: Array, default: null },
	},

	data() {
		return {
			open: false,
			entered: false,
			displaySelected: "Số lượng phòng",
			bedroomOptions: ["1", "2", "3", "4", "5", "5+"],
			prevSelectedChoices: [],
			selectedChoices: [],
		};
	},

	watch: {
		selectedOption: {
			handler(option) {
				if (option) {
					this.displaySelected =
						option.length > 0
							? `Số lượng phòng: ${option.join(", ")}`
							: "Số lượng phòng";
					this.prevSelectedChoices = [...option];
					this.selectedChoices = [...option];
				} else {
					this.displaySelected = "Số lượng phòng";
				}
			},
			immediate: true,
		},

		selectedChoices(newChoices, oldChoices) {
			if (newChoices.length !== oldChoices.length) {
				this.$emit("optionchanged", newChoices);
				return;
			}

			const theSame = newChoices.every(
				(_, index) => newChoices[index] === oldChoices[index],
			);
			if (!theSame) {
				this.$emit("optionchanged", newChoices);
			}
		},
	},
};
</script>

<style scoped>
.text-dark-red {
	color: #961b12;
}
</style>
