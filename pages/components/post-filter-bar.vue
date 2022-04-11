<template>
	<div
		class="z-10 w-full fixed left-0 top-after-header hidden md:flex space-x-4 bg-white shadow-sm px-4"
	>
		<div class="double-button my-4 flex">
			<button
				:class="`text-base py-2 px-4 border rounded-l-md ${sellButtonClasses}`"
				@click="setFilterDemandOption('Bán')"
			>
				Bán
			</button>
			<button
				:class="`text-base whitespace-nowrap py-2 px-4 border rounded-r-md ${rentButtonClasses}`"
				@click="setFilterDemandOption('Cho Thuê')"
			>
				Cho thuê
			</button>
		</div>

		<div class="hidden xl:block filter-search-bar relative my-4">
			<span class="absolute inset-y-0 left-0 flex items-center pl-2">
				<button
					class="p-1 text-gray-400 focus:outline-none focus:shadow-outline"
				>
					<svg
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						viewBox="0 0 24 24"
						class="w-6 h-6"
					>
						<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</button>
			</span>
			<input
				type="search"
				class="w-full border py-2 pl-10 pr-2 h-full rounded-md bg-white focus:text-gray-900 focus:outline-none"
				placeholder="Tìm kiếm..."
			/>
		</div>

		<div class="flex justify-between grow">
			<type-filter-dropdown
				:selected-option="filter.type"
				@optionchanged="handleTypeFilterChanged"
			/>
			<location-ftiler-dropdown
				:selected-option="filter.location"
				@optionchanged="handleLocationFilterChanged"
			/>
			<project-filter-dropdown
				:selected-option="filter.project"
				:demand="filter.demand"
				@optionchanged="handleProjectFilterChanged"
			/>
			<price-filter-dropdown
				:selected-option="filter.priceRange"
				:demand="filter.demand"
				@optionchanged="handlePriceFilterChanged"
			/>
			<acreage-filter-dropdown
				:selected-option="filter.acreageRange"
				@optionchanged="handleAcreageFilterChanged"
			/>
			<direction-filter-dropdown
				:selected-option="filter.directions"
				@optionchanged="handleDirectionFilterChanged"
			/>
			<bedroom-filter-dropdown
				:selected-option="filter.bedroomOptions"
				@optionchanged="handleBedroomFilterChanged"
			/>
		</div>

		<button
			class="my-auto text-gray-600 hover:text-gray-800 px-2 h-fit"
			@click="resetFilter"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
				/>
			</svg>
		</button>

		<button
			class="whitespace-nowrap ml-12 rounded-md px-6 bg-green-600 hover:bg-green-700 font-semibold text-white my-4"
			@click="$emit('search')"
		>
			Tìm kiếm
		</button>
	</div>
</template>

<script>
import LocationFtilerDropdown from "./filtering/location-filter-dropdown.vue";
import ProjectFilterDropdown from "./filtering/project-filter-dropdown.vue";
import DirectionFilterDropdown from "./filtering/direction-filter-dropdown.vue";
import TypeFilterDropdown from "./filtering/type-filter-dropdown.vue";
import PriceFilterDropdown from "./filtering/price-filter-dropdown.vue";
import AcreageFilterDropdown from "./filtering/acreage-filter-dropdown.vue";
import BedroomFilterDropdown from "./filtering/bedroom-filter-dropdown.vue";

export default {
	name: "PostFilterBar",
	components: {
		LocationFtilerDropdown,
		ProjectFilterDropdown,
		DirectionFilterDropdown,
		TypeFilterDropdown,
		PriceFilterDropdown,
		AcreageFilterDropdown,
		BedroomFilterDropdown,
	},

	props: {
		filter: {
			type: Object,
			default() {
				return { demand: "Cho Thuê" };
			},
		},
	},

	data() {
		return {
			heading: null,
			readMoreButtonIsActive: false,
		};
	},

	computed: {
		sellButtonClasses() {
			return this.filter.demand === "Bán" ? "bg-gray-200" : "hover:bg-gray-100";
		},

		rentButtonClasses() {
			return this.filter.demand !== "Bán" ? "bg-gray-200" : "hover:bg-gray-100";
		},
	},

	methods: {
		setFilterDemandOption(option) {
			this.$set(this.filter, "demand", option);
		},

		resetFilter() {
			this.$emit("filterchanged", { demand: "Cho Thuê" });
		},

		openCloseMobileFilter() {
			this.filterResponsive = !this.filterResponsive;
		},

		createFilterFromUrl() {
			const filter = {};
			const query = this.$route.query;
			filter.demand = query.demand ?? "Cho Thuê";
			filter.type = query.type;
			if (query.city || query.district) {
				filter.location = {
					city: query.city,
					district: query.district,
				};
			}
			if (query.priceFrom || query.priceTo) {
				const parsedPriceFrom = parseInt(query.priceFrom);
				const parsedPriceTo = parseInt(query.priceTo);
				filter.priceRange = {
					from: isNaN(parsedPriceFrom) ? null : parsedPriceFrom,
					to: isNaN(parsedPriceTo) ? null : parsedPriceTo,
				};
			}
			if (query.acreageFrom || query.acreageTo) {
				const parsedAcreageFrom = parseInt(query.acreageFrom);
				const parsedAcreageTo = parseInt(query.acreageTo);
				filter.acreageRange = {
					from: isNaN(parsedAcreageFrom) ? null : parsedAcreageFrom,
					to: isNaN(parsedAcreageTo) ? null : parsedAcreageTo,
				};
			}
			if (query.directions) {
				filter.directions = Array.isArray(query.directions)
					? query.directions
					: [query.directions];
			}
			if (query.bedroomOptions) {
				filter.bedroomOptions = Array.isArray(query.bedroomOptions)
					? query.bedroomOptions
					: [query.bedroomOptions];
			}
			return filter;
		},

		handleTypeFilterChanged(type) {
			this.$emit("filterchanged", { ...this.filter, type });
		},

		handleLocationFilterChanged(location) {
			this.$emit("filterchanged", { ...this.filter, location });
		},

		handleProjectFilterChanged(project) {
			this.$emit("filterchanged", { ...this.filter, project });
		},

		handlePriceFilterChanged(priceRange) {
			this.$emit("filterchanged", { ...this.filter, priceRange });
		},

		handleAcreageFilterChanged(acreageRange) {
			this.$emit("filterchanged", { ...this.filter, acreageRange });
		},

		handleDirectionFilterChanged(directions) {
			this.$emit("filterchanged", { ...this.filter, directions });
		},

		handleBedroomFilterChanged(bedroomOptions) {
			this.$emit("filterchanged", { ...this.filter, bedroomOptions });
		},
	},
};
</script>

<style scoped>
.filter-bar-blank-space {
	height: 42px;
}

.filter-search-bar {
	min-width: 8rem;
	max-width: 12rem;
}

.top-after-header {
	top: 73px;
}

.double-button {
	font-size: 0;
}
</style>
