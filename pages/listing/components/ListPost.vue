<template>
    <div class="max-w-full" id="post-subinfor">
            <div class="flex justify-between items-center mt-2 mb-2" style="height: 2.5rem;">
              <p class="md:text-sm text-xs truncate mar-address">
                    Hiện có: {{totalItem}} bất động sản
              </p>
              <div>
                  <p class="inline text-sm truncate mar-address">
                      Sắp xếp theo:
                  </p>
                  <Dropdown itemWidth="150px" class="text-sm md:mr-9"> 
                      <DropdownItem v-on:click="order(0)">
                          Giá cao nhất
                      </DropdownItem>
                      <DropdownItem v-on:click="order(1)">
                          Giá thấp nhất
                      </DropdownItem>
                      <DropdownItem v-on:click="order(2)">
                          Mới nhất
                      </DropdownItem>
                  </Dropdown>
              </div>
            </div>
   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="pb-6 md:pt-0 pt-6  md:border-none border-b border-black" v-for="post in posts" :key="post.id">
                <div class="">
                    <NuxtLink :to="`/chi-tiet-can-ho/${post.pageInfor.slug}`" class="md:hidden truncate ... font-bold text-lg leading-6 ov-flow-hidden mb-3">
                            {{post.pageInfor.title}}
                    </NuxtLink>
                <div class="flex item-flex-start space-x-4 md:rounded-md md:border">
                        <img class="w-28 h-28 md:w-60 md:h-40 rounded-md border" :src="post.srcimage" alt="Bonnie image">
                   <div class="flex-1 min-w-0">
                        <NuxtLink :to="`/chi-tiet-can-ho/${post.pageInfor.slug}`" class="hidden md:block font-bold text-lg leading-6 mar-title h-12 ov-flow-hidden">
                            {{post.pageInfor.title}}
                        </NuxtLink>
                        <p class="font-price md:mt-0 md:mb-4 mt-2 mb-5">
                            {{post.price}}
                        </p>
                        <p class="text-sm color-858585 md:mb-3 mb-6">
                            {{post.address}}
                        </p>
                        <p class="text-sm color-a7a7a7">
                            {{post.date}}
                        </p>
                    </div>
                </div>
                </div>
            </li>
        </ul>
   </div>
    <pagination :total="totalItem" :perPage="10" :currentPage="pageIndex" @pagechanged="pageNavigationTo"></pagination>
    </div>
  
</template>

<style scoped>
.w-h-100 {
  width: 100px;
  height: 100px;
}

.item-flex-start {
  align-items: flex-start;
}

.font-price {
  line-height: 16.43px;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
}

.mar-title {
  margin: 10px 76px 14px 0;
}

.ov-flow-hidden {
  overflow: hidden;
}

.color-858585{
    color: #858585;
}

.color-a7a7a7{
    color: #a7a7a7;
}

.border-none {
  border: none;
}
</style>
<script>
import { computed } from '@vue/composition-api';
import {gql} from 'graphql-tag';
// import pagination from '~/pages/components/pagination.vue';
// import Dropdown from '~/pages/components/Dropdown/Dropdown.vue';
// import DropdownItem from '~/pages/components/Dropdown/DropdownItem.vue';

const getPostsQuery = gql`
          query GetPostWithPagination($condition: PostCollectionFilterInput, $skipItems: Int, $take: Int, $order : [PostCollectionSortInput!]) {
            postsWithPagination(take: $take, skip: $skipItems, where: $condition, order : $order) {
              items{
                id
                pageInfor{
                  title
                  slug
                  metaDescription
                }
                gallery
                price
                description
                demand
                status,
                acreage,
                roomStructure,
                apartmentState,
                tags
                project{
                    address{
                        street
                        city
                        district
                        googleMapLocation
                    }
                }
                lastUpdatedAt
              }
              totalCount
            }
          }
        `;

export default { 
    props:[
        "projectId"
    ],
    name: 'ListPost', 
    data(){
        return{
            pageIndex: 1,
            pageOfItems: []
        }
    },
    apollo:{
        postsData:{
            query(){
                return getPostsQuery
            },
            update: data => data.postsWithPagination,
            skip(){
                return this.projectId == null;
            },
            variables(){
                return{
                    condition: {
                        projectId:{
                            eq : this.projectId
                        }
                    },
                    take: 10,
                }
            }
        },
    },
    methods:{
        pageNavigationTo: function(index){
            
            this.$apollo.queries.postsData.refetch ({
                condition: {
                    projectId:{
                        eq : this.projectId
                    }
                },
                take: 10,
                skipItems: 10 * (index - 1)
            });
            this.pageIndex = index;
            // const yOffset = -10; 
            // const element = document.getElementById('post-subinfor');
            // const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            // window.scrollTo({top: y, behavior: 'smooth'});
            document.getElementById("post-subinfor").scrollIntoView(true);
        },
        order:function(orderConditionIndex){
            const orderCondition = {};
            if(orderConditionIndex == 0) orderCondition['price'] = 'DESC';
            else if(orderConditionIndex == 1) orderCondition['price'] = 'ASC';
            else orderCondition['lastUpdatedAt'] = 'DESC';
            this.$apollo.queries.postsData.refetch ({
                condition: {
                    projectId:{
                        eq : this.projectId
                    }
                },
                take: 10,
                order: orderCondition
            });
            this.pageIndex = 1;
        }
    },
    computed:{
        posts(){
            if(this.postsData == null) return []
            else
                return this.postsData.items.map(function(item){
                    return {
                        srcimage: 'https://maico-hub-record.ss-hn-1.bizflycloud.vn/' + (item.gallery.find(c => !c.includes('.mp4'))|| 'apartment-resource/00800a5f-eb0c-4c6f-93ad-1c28e03b70dc/17-01-2022_0953/image/z3116547105303_32a851d4f5d44bca12e64ac1a09e6a6d.jpg'),
                        pageInfor: item.pageInfor,
                        price: item.price + ' ' + item.acreage + ' ' + item.roomStructure,
                        address: item.project.address.street + ' ' + item.project.address.district + ' ' + item.project.address.city,
                        date: 'Cập nhật lần cuối: ' + item.lastUpdatedAt,
                        id: item.id
                    }
                });
        },
        totalItem(){
            if(this.postsData == null) return 0
            else
                return this.postsData.totalCount;
        }
    }
};
</script>
