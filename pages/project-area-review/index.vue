<template>
	<div>
		<div
			v-for="project in projects"
			:key="project.projectName"
			class="flex flex-row mb-[15px] bg-white mx-[10px] rounded-md border border-stone-200 overflow-hidden"
		>
			<nuxt-link
				class="shrink-0"
				:to="'/review-du-an/' + project.pageInfors[0].slug"
			>
				<img
					:src="project.images[0]"
					alt="hacdietdevuong"
					class="h-[120px] w-[120px] md:w-[180px] md:h-[180px]"
				/>
			</nuxt-link>
			<div class="md:mt-10 py-2 pr-2 pl-3 w-[370px] md:w-[600px]">
				<nuxt-link
					:to="'/review-du-an/' + project.pageInfors[0].slug"
					class="font-source-serif-pro font-bold text-xl mb-[5px] leading-[30px]"
				>
					<h3>{{ project.projectName }}</h3>
				</nuxt-link>
				<div class="text-sm text-neutral-400 flex justify-start">
					<div>
						{{
							`${project.address.street}, ${project.address.district}, ${project.address.city}`
						}}
					</div>
				</div>
				<review-count :projectId="project.id"></review-count>
			</div>
		</div>
	</div>
</template>

<script>
import gql from "graphql-tag";
import ReviewCount from "./components/review-count.vue";
const getProjects = gql`
	query GetProjects {
		projects {
			id
			projectName
			pageInfors {
				slug
			}
			address {
				street
				district
				city
			}
			images
		}
	}
`;
export default {
	components: { ReviewCount },
	name: "ProjectAreaReview",
	apollo: {
		projects: {
			query: getProjects,
			update(data) {
				data.projects.forEach(element => {
					element.pageInfors = element.pageInfors.filter(
						c => !c.slug.includes("ban") && !c.slug.includes("cho-thue"),
					);
				});
				return data.projects;
			},
		},
	},
};
</script>

<style scoped>
h3 {
	font-family: Roboto;
}
</style>
