<template>
    <div class="vue-expand-panel p-2 h-auto">
        <h1 class="text-center font-bold text-lg">CHỈNH SỬA DỰ ÁN</h1>
        <br>
        <div class="w-auto h-auto p-2 border-4 rounded m-5" v-for="(project, index) in projects" :key="index">
            <h1 class="font-semidbold text-lg">{{project.projectName}}</h1>
            <div class="p-2 h-auto" style="width:1000px;">
                <expand-panel title="Thông tin">
                    <p class="mb-2">
                        <label class="font-semibold">Tên dự án:</label>
                        <input type="text" class="w-1/2" v-model="project.projectName">
                    </p>
                    <p class="mb-2">
                        <label class="font-semibold">Chủ đầu tư:</label>
                        <input type="text" class="w-1/2" v-model="project.investor">
                    </p>
                    <p class="mb-2">
                        <label class="font-semibold">Pháp lý:</label>
                        <input type="text" class="w-1/2" v-model="project.juridical">
                    </p>
                    <p>
                        <label class="font-semibold">Mô tả:</label>
                        <textarea type="text" class="w-1/2" rows="4" v-model="project.description"></textarea>
                    </p>
                    <div class="flex justify-end my-2">
                        <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectInformation(project.id, project.projectName, project.investor, project.juridical, project.description)">Cập nhật</button>
                    </div>
                </expand-panel>
                <expand-panel title="Địa chỉ">
                    <p class="mb-2">
                        <label class="font-semibold">Tên đường:</label>
                        <input type="text" class="w-1/2" v-model="project.address.street">
                    </p>
                    <p class="mb-2">
                        <label class="font-semibold">Quận:</label>
                        <input type="text" class="w-1/2" v-model="project.address.district">
                    </p>
                    <p class="mb-2">
                        <label class="font-semibold">Thành phố: 
                        </label>
                        <input type="text" class="w-1/2" v-model="project.address.city">
                    </p>
                    <div class="flex justify-end my-2">
                        <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectAddress(project.id, project.address.street, project.address.district, project.address.city, project.address.googleMapLocation)">Cập nhật</button>
                    </div>
                    <p>
                        <label class="font-semibold flex items-center">
                            Google Map: &nbsp;&nbsp;
                            <button @click="showGoogleMapEditModal(project.id, project.address)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                            </button>
                        </label>
                        <iframe v-if="project.address.googleMapLocation.includes('https')" :src="project.address.googleMapLocation" width="100%" height="100%" loading="lazy" />
                    </p>
                </expand-panel>
                <expand-panel title="Tiện ích">
                    <ol>
                        <li v-for="(item, index) in project.utilities" :key="index">
                            {{item}}
                        </li>
                    </ol>
                </expand-panel>
                <expand-panel title="Hình ảnh">
                    <div class="container flex w-50">
                        <div class="w-100 mx-2" v-for="(item, index) in project.images" :key="index">
                            <img class="w-40 h-32 mr-3 ml-2 my-2" :src="item" alt="alternative text"/>
                            <div class="flex justify-center space-between">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </div>
                        </div>
                    </div>
                </expand-panel>
                <expand-panel title="Thông tin SEO">
                    <div class="container mb-5" v-for="(item, index) in project.pageInfors" :key="index">
                        <p class="font-medium flex justify-between items-center">
                            {{item.title}}
                            <button @click="showPageInforModal(item)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                            </button>
                        </p>
                        
                    </div> 
                </expand-panel>
            </div>
        </div>
        <modal name="page-information-detail">
            <h2 class="mt-2 text-lg font-semibold text-center">Chỉnh sửa thông tin SEO</h2>
            <div class="p-2 m-2">
                <p class="mb-3">
                    <label for="title" class="font-semibold">Tiêu đề:</label>
                    <input type="text" class="w-1/2" :value="currentPageInfor.title">
                </p>
                
                <p class="mb-3">
                    <label for="slug" class="font-semibold">Slug:</label>
                    <input type="text" class="w-1/2" :value="currentPageInfor.slug">
                </p>
                
                <p>
                    <label for="meta" class="font-semibold">Meta:</label>
                    <textarea type="text" class="w-1/2" rows="4" :value="currentPageInfor.metaDescription"></textarea>
                </p>
                <div class="flex justify-end space-x-3 my-2">
                    <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('page-information-detail')">Quay lại</button>
                    <button class="px-3 py-1 bg-green-400 rounded">Đồng ý</button>
                </div>
            </div>
        </modal>
        <modal name="google-map-edit-modal">
            <div class="pt-12">
                <h2 class="mt-2 text-lg font-semibold text-center">Chỉnh sửa Google Map</h2>
                <p class="m-10">
                    <label for="map" class="font-semibold">Google map:</label> 
                    <input type="text" class="w1/2" v-model="currentProjectAddress.googleMapLocation">
                </p>
                <div class="flex justify-end space-x-3 m-2 my-2">
                    <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('google-map-edit-modal')">Quay lại</button>
                    <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectAddress(currentProjectAddress.id, currentProjectAddress.street, currentProjectAddress.district, currentProjectAddress.city, currentProjectAddress.googleMapLocation)">Đồng ý</button>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import gql from "graphql-tag";
import { expandPanel } from 'vue-expand-panel'
// import styles
import '~/assets/css/vue-expander.css';

const getProject = gql`query GetProject($condition: ProjectCollectionFilterInput)
            {
                projects(where: $condition) {
                    id,
                    projectName,
                    investor,
                    juridical,
                    description,
                    address {
                        street,
                        district,
                        city,
                        googleMapLocation
                    },
                    utilities
                    images,
                    pageInfors {
                        title,
                        slug,
                        metaDescription
                    }
                }
            }`;

export default {
    name: "EditProject",
    apollo: {
        projects: { 
            query: getProject
        }
    },
    components: {
        expandPanel
    },
    data() {
        return {
            data: [
                {title: "Learning"},
                {title: "Reading"}
            ],
            currentPageInfor: {},
            currentProjectAddress: {},
            currentImage: {}
        }
    },
    methods: {
        showPageInforModal(item) {
            this.currentPageInfor = item;
            this.$modal.show("page-information-detail");
        },
        showGoogleMapEditModal(id, address) {
            this.currentProjectAddress = {
                id,
                street: address.street, 
                district: address.district,
                city: address.city,
                googleMapLocation: address.googleMapLocation
            };
            this.$modal.show("google-map-edit-modal");
        },
        updateProjectInformation(id, projectName, investor, juridical, description) {
            this.$apollo.mutate({

                mutation: gql`mutation UpdateProjectInformation($input: UpdateProjectInput!) {
                    updateProject(input: $input) {
                        string
                    }
                }`,
                variables: {
                    input: { 
                        id: id,
                        projectName: projectName,
                        investor: investor,
                        juridical: juridical,
                        description: description
                    }
                },
                
            }),
            alert("Thay đổi thành công!!")
        },
        updateProjectAddress(id, street, district, city, googleMapLocation) {
            console.log(street);
            console.log(district);
            console.log(city);
            console.log(googleMapLocation);
            this.$apollo.mutate({
                mutation: gql`mutation UpdateProjectAddress($input: UpdateProjectInput!) {
                    updateProject(input: $input) {
                        string
                    }
                }`,
                variables: {
                    input: {
                        id: id,
                        address: {
                            street: street,
                            district: district,
                            city: city,
                            googleMapLocation: googleMapLocation
                        }
                    }
                }
            })
            this.$modal.hide('google-map-edit-modal')
        }
    }
}
</script>

<style scoped>
    textarea {
        width: 100%;
        height: 90px;
        padding: 12px 10px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 16px;
        resize: none;
    }
    input {
        width: 75%;
        padding-inline: 10px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 14px;
        resize: none;
    }
</style>
