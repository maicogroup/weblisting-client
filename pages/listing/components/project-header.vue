<template>
	<div v-if="project != null" class="w-full">
		<div class="w-full">
			<img
				class="w-full h-60 object-cover lg:h-80"
				:alt="`Căn hộ chung cư ${project.projectName}`"
				:src="project.images[0]"
			/>
			<h3 class="mt-4 sm:mt-3 text-2xl font-bold lg:mt-2">
				Căn hộ chung cư {{ project.projectName }}
			</h3>
			<h4 class="mt-0 sm:mt-1 color-A3A3A3">
				{{ projectAddress }}
			</h4>
			<nuxt-link
				:to="`/du-an/${projectUrl}`"
				class="mt-3 sm:mt-2 hover:text-green-500"
			>
				Xem chi tiết về chung cư {{ project.projectName }} >>
			</nuxt-link>
		</div>
	</div>
</template>

<script>
export default {
	name: "ProjectHeader",

	props: {
		project: { type: Object, require: true, default: null },
	},

	computed: {
		projectAddress() {
			const address = this.project.address;
			return `${address.street}, ${address.district}, ${address.city}`;
		},
		projectUrl() {
			return this.project.pageInfors.filter(
				c => !c.slug.includes("ban") && !c.slug.includes("cho-thue"),
			)[0].slug;
		},
	},
};
</script>

<style>
.color-A3A3A3 {
	color: #a3a3a3;
}
</style>
