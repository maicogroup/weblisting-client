<template>
    <div class="mt-[5px] text-sm flex justify-start">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="#737373" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-5 5v-5Z"/></svg>
        {{totalCount}} reviews

    </div>
</template>


<script>
import gql from "graphql-tag";
const getReviewCount = gql`query GetReviewCount($condition: ReviewCollectionFilterInput)
                            {
                                reviewsWithPagination(where: $condition) {
                                    totalCount
                                }
                            }`

export default {
    name: "ReviewCount",
    props: {
            projectId: {type: String, default: ""}
        },
    data () {
        return{
            totalCount: 0
        }
    },
    apollo: {
        reviews: {
            query: getReviewCount,
            variables() {
                return {
                    condition: {
                        projectId: {
                            eq: this.projectId,
                        }
                    }
                }
            },
            update: data => data.reviewsWithPagination
        }
    },
    watch:{
        reviews () {
            if (this.reviews.totalCount === 0) {
                this.totalCount = 0;
            }
            else {
                this.totalCount = this.reviews.totalCount;
            }
        }
    },
    // computed: {
    //     totalCount() {
    //         if (this.reviews.totalCount === 0) {
    //             return 0;
    //         }
    //         else {
    //             return this.reviews.totalCount;
    //         }
    //     }
    // }
}
</script>