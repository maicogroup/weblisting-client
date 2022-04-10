<template>
	<div class="inline relative">
		<button
			class="text-sm relative bg-white text-gray-800 px-2 hover:bg-gray-100 h-full"
			@click="open = !open"
		>
			<div class="inline-flex justify-between items-end">
				<span class="mr-1">Giá</span>
				<svg
					class="inline h-4 w-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<p class="text-center w-28 truncate ... relative text-gray-600">
				{{ displaySelected }}
			</p>
		</button>
		<div
			v-if="open"
			ref="dropdownContent"
			tabindex="0"
			class="text-sm absolute right-0 py-2 bg-white top-16 rounded-none shadow-xl"
			@mouseenter="entered = true"
			@mouseleave="entered = false"
		>
			<p class="font-semibold px-6 py-2">Chọn giá</p>

			<div class="flex justify-between items-center px-6 mt-3">
				<label class="flex items-center">
					<input
						:value="customRange.from"
						placeholder="Từ"
						class="w-14 px-2 py-1 text-center text-sm border rounded-md outline-none"
						@input="handleCustomRangeFromChanged"
					/>
					<span class="ml-1">{{ priceUnit }}</span>
				</label>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 mx-2"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1"
						d="M20 12H4"
					/>
				</svg>
				<label class="flex items-center">
					<input
						:value="customRange.to"
						placeholder="Đến"
						class="w-14 px-2 py-1 text-center text-sm border rounded-md outline-none"
						@input="handleCustomRangeToChanged"
					/>
					<span class="ml-1">{{ priceUnit }}</span>
				</label>
			</div>

			<divider class="mt-2" />

			<filter-dropdown-item
				class="text-dark-red"
				@click="handleSelectAllPrices"
			>
				Tất cả mức giá
			</filter-dropdown-item>
			<filter-dropdown-item
				v-for="range in priceRanges"
				:key="`${range.from}-${range.to}`"
				class="flex justify-between"
				@click="handleSelectPriceRange(range)"
			>
				<template v-if="range.from === 0">
					Dưới {{ range.to }} {{ priceUnit }}
				</template>
				<template v-else-if="range.to === null">
					Trên {{ range.from }} {{ priceUnit }}
				</template>
				<template v-else>
					<span class="range-text"> Từ {{ range.from }} {{ priceUnit }} </span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 mx-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1"
							d="M20 12H4"
						/>
					</svg>
					<span class="range-text text-right">
						đến {{ range.to }} {{ priceUnit }}
					</span>
				</template>
			</filter-dropdown-item>
		</div>
	</div>
</template>

<script>
import FilterDropdownItem from "./filter-dropdown-item.vue";
export default {
	name: "PriceFilterDropdown",
	components: { FilterDropdownItem },

	props: {
		selectedOption: { type: Object, default: null },
		demand: { type: String, optional: false, default: null },
	},

	data() {
		return {
			open: false,
			entered: false,
			displaySelected: "Tất cả",
			customRange: { from: null, to: null },
			MAX_VALUE: 999999,
		};
	},

	computed: {
		priceUnit() {
			return this.demand === "Bán" ? "tỷ" : "triệu";
		},

		priceRanges() {
			if (this.demand === "Bán") {
				return [
					{ from: 0, to: 1 },
					{ from: 1, to: 2 },
					{ from: 2, to: 3 },
					{ from: 3, to: 5 },
					{ from: 5, to: 7 },
					{ from: 7, to: 10 },
					{ from: 10, to: 20 },
					{ from: 20, to: null },
				];
			} else {
				return [
					{ from: 0, to: 3 },
					{ from: 3, to: 5 },
					{ from: 5, to: 7 },
					{ from: 7, to: 10 },
					{ from: 10, to: 15 },
					{ from: 15, to: 20 },
					{ from: 25, to: 30 },
					{ from: 30, to: null },
				];
			}
		},
	},

	watch: {
		open(value) {
			if (value === true) {
				// khi mở dropdown thì chuột chưa chạm vào nội dung nên biến entered phải mặc định bằng false
				this.entered = false;

				// setTimeout để tránh listen các click event hiện tại
				setTimeout(
					() =>
						document.addEventListener("click", this.closeIfOutsideOfDropdown),
					0,
				);
			} else {
				document.removeEventListener("click", this.closeIfOutsideOfDropdown);

				const { from, to } = this.customRange;

				const bothAreNumber = from !== null && to !== null;
				if (bothAreNumber && to - from < 0) {
					this.customRange = { from: to, to: from };
				} else if (bothAreNumber && to === 0 && from === 0) {
					this.customRange = { from: null, to: null };
				}

				this.$emit("optionchanged", { ...this.customRange });
			}
		},

		selectedOption: {
			handler(option) {
				if (option) {
					this.displaySelected = this.formatRange(option);
					this.setCustomRange(option);
				} else {
					this.displaySelected = "Tất cả";
					this.setCustomRange({ from: null, to: null });
				}
			},
			immediate: true,
		},
	},

	methods: {
		closeIfOutsideOfDropdown() {
			this.open = this.entered;
		},

		handleCustomRangeFromChanged(e) {
			if (e.target.value.trim() === "") {
				this.customRange.from = null;
			} else {
				const value = parseInt(e.target.value);
				if (isNaN(value)) {
					this.customRange = { ...this.customRange };
				} else {
					this.customRange.from = Math.min(this.MAX_VALUE, value);
				}
			}

			this.$emit("optionchanged", { ...this.customRange });
		},

		handleCustomRangeToChanged(e) {
			if (e.target.value.trim() === "") {
				this.customRange.to = null;
			} else {
				const value = parseInt(e.target.value);
				if (isNaN(value)) {
					this.customRange = { ...this.customRange };
				} else {
					this.customRange.to = Math.min(this.MAX_VALUE, value);
				}
			}

			this.$emit("optionchanged", { ...this.customRange });
		},

		formatRange(range) {
			const unit = this.demand === "Bán" ? "tỷ" : "triệu";

			if (range.from === null || range.from === 0) {
				return range.to === null || range.to === 0
					? "Tất cả"
					: `Dưới ${range.to} ${unit}`;
			}

			if (range.to === null) {
				return `Trên ${range.from} ${unit}`;
			}

			return `${range.from} - ${range.to} ${unit}`;
		},

		setCustomRange(range) {
			this.customRange = { ...range };
		},

		handleSelectPriceRange(range) {
			this.open = false;
			this.setCustomRange(range);
			this.$emit("optionchanged", { ...range });
		},

		handleSelectAllPrices() {
			this.open = false;
			this.customRange = { from: null, to: null };
			this.$emit("optionchanged", null);
		},
	},
};
</script>

<style scoped>
.range-text {
	width: 77px;
}

.text-dark-red {
	color: #961b12;
}
</style>
