<template>
	<div class="lg:px-5 w-full max-w-screen-xl">
		<div class="relative flex justify-between w-full">
			<detail-post
				v-if="post !== undefined"
				:post="post"
				class="lg:w-9/12 lg:mr-9 w-full"
			/>
			<div v-else class="lg:w-9/12 lg:mr-9 w-full">
				<div class="lg:w-[930px] lg:h-[400px] bg-slate-100 animate-pulse"></div>
			</div>
			<div class="lg:block hidden">
				<contact-infor class="sticky-contact-infor" />
			</div>
		</div>

		<recommended-posts
			title="Có thể bạn quan tâm"
			v-if="recommendedPosts !== undefined && recommendedPosts.length > 0"
			class="mb-4"
			:posts="recommendedPosts"
		/>
	</div>
</template>

<script>
import { gql } from "graphql-tag";
import DetailPost from "./components/detail-post.vue";
import ContactInfor from "./components/contract-infor.vue";
// import RecommendedPosts from './components/recommended-posts.vue';
const getPostQuery = gql`
	query GetPost($condition: PostCollectionFilterInput) {
		post(where: $condition) {
			id
			block
			gallery
			acreage
			price
			type
			totalBedRoom
			totalWC
			direction
			description
			ownerId
			furnitures
			apartmentNumber
			floor
			demand
			status
			tags
			usageAcreage
			otherSpecification
			view
			doorDirection
			pageInfor {
				title
				slug
				metaDescription
			}
			project {
				id
				address {
					street
					district
					city
					googleMapLocation
				}
				juridical
				projectName
				utilities {
					locationUtilities
					internalUtilities
				}
				pageInfors {
					slug
				}
			}
		}
	}
`;

const getRecommendedPosts = gql`
	query GetRecommendedPosts($filter: PostCollectionFilterInput!) {
		postsWithPagination(
			take: 10
			where: $filter
			order: { lastUpdatedAt: DESC }
		) {
			items {
				demand
				id
				price
				totalBedRoom
				totalWC
				acreage
				gallery
				pageInfor {
					title
					slug
				}
				project {
					id
					address {
						street
						district
						city
					}
				}
				lastUpdatedAt
			}
		}
	}
`;

export default {
	name: "DetailApartmentPage",
	components: { ContactInfor, DetailPost },
	apollo: {
		post: {
			query: getPostQuery,
			update(data) {
				if (data.post === null) {
					this.$router.push({ path: "/" }).catch(() => {});
					return;
				}

				return data.post;
			},

			variables() {
				return {
					condition: {
						pageInfor: {
							slug: {
								eq: this.$route.params.slug,
							},
						},
					},
				};
			},
		},

		recommendedPosts: {
			query: getRecommendedPosts,
			update: data => data.postsWithPagination.items,
			skip() {
				return this.post === undefined;
			},
			variables() {
				return {
					filter: {
						id: { neq: this.post.id },
						demand: { eq: this.post.demand },
						projectId: { eq: this.post.project.id },
					},
				};
			},
		},
	},

	head() {
		return {
			title: this.post?.pageInfor.title,
			meta: [
				{
					hid: "description",
					name: "description",
					content: this.post?.pageInfor.metaDescription,
				},
				{
					property: "og:image",
					content:
						"https://weblisting.ss-hn-1.bizflycloud.vn/" +
						this.post?.gallery[0],
				},
				{
					name: "robots",
					content: "noindex",
				},
			],
		};
	},
};
</script>

<style scoped>
.sticky-contact-infor {
	position: sticky;
	top: 128px;
	left: 75%;
}
</style>
