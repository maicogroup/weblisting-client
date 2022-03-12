<template>
    <div class="vue-expand-panel p-2 h-auto">
        <h1 class="text-center font-bold text-lg mb-5">CHỈNH SỬA DỰ ÁN</h1>
        <div class="flex items-center justify-center">
            <project-filter-dropdown :selected-option="inputFilter.project" @optionchanged="handleProjectFilterChanged"></project-filter-dropdown>
        </div>
        <div class="w-auto h-auto p-2 border-2 rounded m-5">
            <h1 class="font-semidbold text-lg">{{project.projectName}}</h1>
            <div class="p-2 h-auto" style="width:1000px;">
                <expand-panel title="Thông tin">
                    <div>
                        <p class="mb-2">
                            <label class="font-semibold">Tên dự án:</label>
                            <input type="text" class="w-1/2" v-model="project.projectName" @onfocusout="() => flag = true">
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
                    </div>
                    <div class="flex justify-end my-2">
                        <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectInformation">Cập nhật</button>
                    </div>
                </expand-panel>
                <expand-panel title="Địa chỉ">
                    <div>
                        <p class="mb-2">
                            <label class="font-semibold">Tên đường:</label>
                            <input type="text" class="w-1/2" v-model="project.address.street">
                        </p>
                        <p class="mb-2">
                            <label class="font-semibold">Quận:</label>
                            <input type="text" class="w-1/2" v-model="project.address.district">
                        </p>
                        <p class="mb-2">
                            <label class="font-semibold">Thành phố: </label>
                            <input type="text" class="w-1/2" v-model="project.address.city">
                        </p>
                    </div>
                    <div>
                        <label class="font-semibold flex items-center">
                            Google Map: &nbsp;&nbsp;
                            <button @click="() => $modal.show('google-map-edit-modal')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                            </button>
                        </label>
                        <div v-if="project.address.googleMapLocation !== null && project.address.googleMapLocation.includes('https')">
                            <iframe :src="project.address.googleMapLocation" width="100%" height="400px" loading="lazy" />
                        </div>
                        <div v-else>
                            <em>{{project.address.googleMapLocation}}<br>
                                chưa có hoặc sai!
                            </em>
                        </div>
                    </div>
                    <div class="flex justify-end my-2">
                        <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectAddress(project.id, currentProjectAddress.street, currentProjectAddress.district, currentProjectAddress.city, currentProjectAddress.googleMapLocation)">Cập nhật</button>
                    </div>
                </expand-panel>

                <expand-panel title="Tiện ích">
                    <p>
                        <label for="meta" class="font-semibold">Tiện ích vị trí:</label>
                        <textarea type="text" class="w-1/2" rows="4" v-model="project.utilities.locationUtilities"></textarea>
                    </p>
                    <p>
                        <label for="meta" class="font-semibold">Tiện ích nội khu:</label>
                        <textarea type="text" class="w-1/2" rows="4" v-model="project.utilities.internalUtilities"></textarea>
                    </p>
                    <div class="flex justify-end space-x-1">
                        <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectUtilities">Cập nhật</button>
                    </div>
                </expand-panel>

                <expand-panel title="Hình ảnh">
                    <div class="flex justify-start items-center">
                        <input type="text" class="w-1/5 my-2" v-model="newImage" placeholder="Thêm hình ảnh mới">
                        <button @click="addNewProjectImage">
                                <svg xmlns="http://www.w3.org/2000/svg" class="ml-3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </button>
                    </div>
                    <div class="container mt-3" style="float:left;">
                        <div class="w-100 mx-2" style="float:left" v-for="(item, index) in project.images" :key="index">
                            <img class="w-40 h-32 mr-2 my-2" :src="item" alt="alternative text"/>
                            <div class="flex justify-evenly">
                                <button name="edit-button" @click="showUpdateProjectImageModal(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                                </button>
                                <button name="delete" @click="showDeleteProjectImageModal(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </expand-panel>
                <expand-panel title="Thông tin SEO">
                    <div class="my-2">
                            <button class="px-3 py-1 bg-gray-300 rounded" @click="() => $modal.show('add-new-page-information')">Thêm thông tin mới</button>
                    </div>
                    <div class="container mb-5" v-for="(item, index) in project.pageInfors" :key="index">
                        <div class="flex justify-between items-center">
                            <p>{{item.title}}</p>
                            <div class="flex justify-around items-center space-x-1">
                                <button name="edit-page-infor" @click="showPageInforModal(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                                </button>
                                <button name="delete" @click="showDeletePageInforModal(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </button>
                            </div>
                        </div>
                    </div> 
                </expand-panel>

                <expand-panel title="Nội dung SEO">
                    <div>
                        <client-only>
                            <quill-editor
                                ref="myQuillEditor"
                                v-model="project.sEOContent"
                                class="h-52 mb-11"
                                :options="editorOption"
                                @blur="onEditorBlur($event)"
                                @focus="onEditorFocus($event)"
                                @ready="onEditorReady($event)"
                            />
                            </client-only>
                            <button class="text-white px-3 py-1 bg-green-400 rounded relative float-right mt-3.5" @click="updateProjectInformation">Cập nhật</button>
                    </div>
                </expand-panel>
            </div>
        </div>
        <modal name="page-information-detail">
            <h2 class="mt-2 text-lg font-semibold text-center">Chỉnh sửa thông tin SEO</h2>
            <div class="p-2 m-2">
                <p class="mb-3">
                    <label for="title" class="font-semibold">Tiêu đề:</label>
                    <input type="text" class="w-1/2" style="width: 50% !important" v-model="project.pageInfors[pageInforIndex].title">
                </p>
                
                <p class="mb-3">
                    <label for="slug" class="font-semibold">Slug:</label>
                    <input type="text" class="w-1/2" style="width: 50% !important" v-model="project.pageInfors[pageInforIndex].slug">
                </p>
                
                <p>
                    <label for="meta" class="font-semibold">Meta description:</label>
                    <textarea type="text" class="w-1/2" rows="4" v-model="project.pageInfors[pageInforIndex].metaDescription"></textarea>
                </p>
                <div class="flex justify-end space-x-3 my-2">
                    <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('page-information-detail')">Quay lại</button>
                    <button class="px-3 py-1 bg-green-400 rounded" @click="updatePageInformation">Đồng ý</button>
                </div>
            </div>
        </modal>
        <modal name="delete-page-information">
            <h2 class="mt-2 text-lg font-semibold text-center">Bạn có chắc chắn muốn xóa?</h2>
            <div class="p-2 m-2">
                <p class="mb-3">
                    <label for="title" class="font-semibold">Tiêu đề:</label>
                    <input type="text" class="w-1/2" style="width: 50% !important" v-model="project.pageInfors[pageInforIndex].title" disabled>
                </p>
                
                <p class="mb-3">
                    <label for="slug" class="font-semibold">Slug:</label>
                    <input type="text" class="w-1/2" style="width: 50% !important" v-model="project.pageInfors[pageInforIndex].slug" disabled>
                </p>
                
                <p>
                    <label for="meta" class="font-semibold">Meta description:</label>
                    <textarea type="text" class="w-1/2" rows="4" v-model="project.pageInfors[pageInforIndex].metaDescription" disabled></textarea>
                </p>
                <div class="flex justify-end space-x-3 my-2">
                    <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('delete-page-information')">Quay lại</button>
                    <button class="px-3 py-1 bg-green-400 rounded" @click="deletePageInfor">Đồng ý</button>
                </div>
            </div>
        </modal>
        <modal name="add-new-page-information">
            <h2 class="mt-2 text-lg font-semibold text-center">Thêm thông tin SEO mới</h2>
            <div class="p-2 m-2">
                <p class="mb-3">
                    <label for="title" class="font-semibold">Tiêu đề:</label>
                    <input type="text" class="w-1/2" style="width: 50% !important" v-model="newPageInfor.title">
                </p>
                
                <p class="mb-3">
                    <label for="slug" class="font-semibold">Slug:</label>
                    <input type="text" class="w-1/2" style="width: 50% !important" v-model="newPageInfor.slug">
                </p>
                
                <p>
                    <label for="meta" class="font-semibold">Meta description:</label>
                    <textarea type="text" class="w-1/2" rows="4" v-model="newPageInfor.metaDescription"></textarea>
                </p>
                <div class="flex justify-end space-x-3 my-2">
                    <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('add-new-page-information')">Quay lại</button>
                    <button class="px-3 py-1 bg-green-400 rounded" @click="addNewPageInfor">Đồng ý</button>
                </div>
            </div>
        </modal>
        <modal name="google-map-edit-modal">
            <div class="pt-12">
                <h2 class="mt-2 text-lg font-semibold text-center">Chỉnh sửa Google Map</h2>
                <p class="m-10">
                    <label for="map" class="font-semibold">Google map:</label> 
                    <input type="text" class="w-1/4" style="width:75% !important" v-model="project.address.googleMapLocation">
                </p>
                <div class="flex justify-end space-x-3 m-2 my-2">
                    <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('google-map-edit-modal')">Quay lại</button>
                    <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectAddress">Đồng ý</button>
                </div>
            </div>
        </modal>
        <modal name="delete-project-utilities">
            <div class="pt-14">
                <h2 class="mt-2 text-xl font-bold text-center">Bạn có chắc chắn muốn xóa?</h2>
                <p class="px-2 my-3">Lưu ý, sau khi xóa, hành động này sẽ không thể hoàn tác!</p>
                <div class="flex justify-end space-x-3 m-2 my-2">
                    <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('delete-project-utilities')">Quay lại</button>
                    <button class="text-white px-3 py-1 bg-green-400 rounded" @click="deleteProjectUtilities(projectId)">Đồng ý</button>
                </div>
            </div>
        </modal>
        <modal name="edit-project-image">
            <div class="pt-12">
                <h2 class="mt-2 text-lg font-semibold text-center">Chỉnh sửa hình ảnh</h2>
                <p class="m-10">
                    <label class="font-semibold">Url: </label> 
                    <input type="text" style="width:90% !important" v-model="project.images[imageIndex]">
                </p>
                <div class="flex justify-end space-x-3 m-2 my-2">
                    <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('edit-project-image')">Quay lại</button>
                    <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectImage">Đồng ý</button>
                </div>
            </div>
        </modal>
        <modal name="delete-project-image">
            <div class="pt-14">
                <h2 class="mt-2 text-xl font-bold text-center">Bạn có chắc chắn muốn xóa?</h2>
                <p class="px-2 my-3">Lưu ý, sau khi xóa, hành động này sẽ không thể hoàn tác!</p>
                <div class="flex justify-end space-x-3 m-2 my-2">
                    <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('delete-project-image')">Quay lại</button>
                    <button class="text-white px-3 py-1 bg-green-400 rounded" @click="deleteProjectImage">Đồng ý</button>
                </div>
            </div>
        </modal>
    </div>
</template>

<script type="text/javascript">
import gql from 'graphql-tag';
import { expandPanel } from 'vue-expand-panel';
import ProjectFilterDropdown from "./components/project-filter-dropdown.vue";
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
                    utilities {
                        internalUtilities,
                        locationUtilities
                    },
                    images,
                    sEOContent,
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
        project: { 
            query: getProject,
            variables: {
                condition: { 
                    id: { 
                        eq: "61c528268219c0a4653086bc"
                    }
                }
            },
            update: data => data.projects[0]

        }
    },
    mounted() {
        this.currentProject = {
            id: this.project.id,
            projectName: this.project.projectName,
            investor: this.project.investor,
            juridical: this.project.juridical,
            description: this.project.description,
            address: {
                street: this.project.address.street,
                district: this.project.address.district,
                city: this.project.address.city,
                googleMapLocation: this.project.address.googleMapLocation
            },
            utilities: {
                internalUtilities: this.project.utilities.internalUtilities,
                locationUtilities: this.project.utilities.locationUtilities
            },
            images: [],
            sEOContent: this.project.sEOContent,
            pageInfors: []
        }
        this.project.images.forEach(x => this.currentProject.images.push(x));
        for (let i = 0; i < this.project.pageInfors.length; i++) {
            var pageInfor = {
                slug: this.project.pageInfors[i].slug,
                title: this.project.pageInfors[i].title,
                metaDescription: this.project.pageInfors[i].metaDescription
            }
            this.currentProject.pageInfors.push(pageInfor);
        }
        console.log(this.currentProject);
    },
    components: {
        expandPanel,
        ProjectFilterDropdown
    },
    data() {
        return {
            flag: false,
            currentProject: {},
            inputFilter: {},
            newPageInfor: {},
            newImage: "",
            imageIndex: 0,
            pageInforIndex: 0,
            editorOption: {
                // Some Quill options...
                theme: 'snow',
                modules: {
                toolbar: [
                    [{ font: [] }],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                    ['blockquote', 'code-block'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
                    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    ['clean'] // remove formatting button
                ]
                }
            }
        }
    },
    watch: {
        // project: { 
        //     handler(data, newData) {
        //         console.log("watch start");
        //     },
        //     deep: true,
        // },
        inputFilter: function(filter) {
            console.log(filter);
            console.log(this.inputFilter);
            console.log("Project name berfore refetch: ", this.project.projectName);
            if (filter.project) {
                this.$apollo.queries.project.refetch({
                    condition: { 
                        id: {
                            eq: this.inputFilter.project.id
                        }
                    },
                });
                setTimeout(() => {
                    this.currentProject = {
                    id: this.project.id,
                    projectName: this.project.projectName,
                    investor: this.project.investor,
                    juridical: this.project.juridical,
                    description: this.project.description,
                    address: {
                        street: this.project.address.street,
                        district: this.project.address.district,
                        city: this.project.address.city,
                        googleMapLocation: this.project.address.googleMapLocation
                    },
                    utilities: {
                        internalUtilities: this.project.utilities.internalUtilities,
                        locationUtilities: this.project.utilities.locationUtilities
                    },
                    images: [],
                    sEOContent: this.project.sEOContent,
                    pageInfors: {
                        slug: this.project.pageInfors.slug,
                        title: this.project.pageInfors.title,
                        metaDescription: this.project.pageInfors.metaDescription
                    }
                }
                this.project.images.forEach(x => this.currentProject.images.push(x));
                for (let i = 0; i < this.project.pageInfors.length; i++) {
                    var pageInfor = {
                        slug: this.project.pageInfors[i].slug,
                        title: this.project.pageInfors[i].title,
                        metaDescription: this.project.pageInfors[i].metaDescription
                    }
                    this.currentProject.pageInfors.push(pageInfor);
                }
                }, 1000);
                this.pageInforIndex = 0;
                this.imageIndex = 0;
            }  
        }
    },
    methods: {
        handleProjectFilterChanged(project) {
            this.inputFilter = {...this.inputFilter, project};
        },
        onEditorBlur (editor) {
        //console.log('editor blur!', editor);
        },
        onEditorFocus (editor) {
        //console.log('editor focus!', editor);
        },
        onEditorReady (editor) {
        //console.log('editor ready!', editor);
        },
        updateProjectInformation() {
            if ((this.currentProject.projectName == this.project.projectName) && (this.currentProject.investor == this.project.investor)
                && (this.currentProject.juridical == this.project.juridical) && (this.currentProject.description == this.project.description)
                && (this.currentProject.sEOContent == this.project.sEOContent))
                {
                    this.$toast.show("Dữ liệu chưa có thay đổi!", {
                        type: "error",
                        theme: "bubble",
                        duration: 3000,
                        position: "top-right"
                    });
                    return;
                }
            this.$apollo.mutate({
                mutation: gql`mutation UpdateProjectInformation($input: UpdateProjectInput!) {
                    updateProject(input: $input) {
                        string
                    }
                }`,
                variables: {
                    input: { 
                        id: this.project.id,
                        projectName: this.project.projectName,
                        investor: this.project.investor,
                        juridical: this.project.juridical,
                        description: this.project.description,
                        sEOContent: this.project.sEOContent
                    }
                }
                
            }),
            this.$toast.show("Thay đổi thành công!", {
                type: "success",
                duration: 2000,
                theme: "bubble",
                position: "top-right"
            });
            this.currentProject.projectName = this.project.projectName;
            this.currentProject.investor = this.project.investor;
            this.currentProject.juridical = this.project.juridical;
            this.currentProject.description = this.project.description;
            this.currentProject.sEOContent = this.project.sEOContent; 
        },
        updateProjectAddress() {
            if ((this.currentProject.address.street == this.project.address.street) && (this.currentProject.address.district == this.project.address.district)
                && (this.currentProject.address.city == this.project.address.city) && (this.currentProject.address.googleMapLocation == this.project.address.googleMapLocation)){
                    this.$toast.show("Dữ liệu chưa có thay đổi", {
                        type: "error",
                        theme: "bubble",
                        duration: 3000,
                        position: "top-right"
                    });
                    return;
                }
            // if (this.project.address.googleMapLocation == "") {
            //     this.$toast.show("Google map không được để trống, vui lòng thử lại!", {
            //         type: "error",
            //         theme: "bubble",
            //         duration: 2000,
            //         position: "top-right"
            //     });
            //     return;
            // }    
            this.$apollo.mutate({
                mutation: gql`mutation UpdateProjectAddress($input: UpdateProjectInput!) {
                    updateProject(input: $input) {
                        string
                    }
                }`,
                variables: {
                    input: {
                        id: this.project.id,
                        address: {
                            street: this.project.address.street,
                            district: this.project.address.district,
                            city: this.project.address.city,
                            googleMapLocation: this.project.address.googleMapLocation
                        }
                    }
                }
            });
            this.$toast.show("Thay đổi thành công!", {
                type: "success",
                theme: "bubble",
                duration: 2000,
                postition: "top-right"
            });
            if (this.currentProject.address.googleMapLocation != this.project.address.googleMapLocation) {
                this.$modal.hide('google-map-edit-modal');
            }
            this.currentProject.address.street = this.project.address.street;
            this.currentProject.address.district = this.project.address.district;
            this.currentProject.address.city = this.project.address.city;
            this.currentProject.address.googleMapLocation = this.project.address.googleMapLocation;
            
        },
        updateProjectUtilities() {
            if ((this.currentProject.utilities.locationUtilities == this.project.utilities.locationUtilities) 
                && (this.currentProject.utilities.internalUtilities == this.project.utilities.internalUtilities))
            {
                this.$toast.show("Dữ liệu chưa có thay đổi", {
                    type: "error",
                    theme: "bubble",
                    duration: 3000,
                    position: "top-right"
                });
                return;            
            }
            
            this.$apollo.mutate({
                mutation: gql`mutation UpdateProjectUtilities($input: UpdateProjectInput!) {
                    updateProject(input: $input) {
                        string
                    }
                }`,
                variables: {
                    input: { 
                        id: this.project.id,
                        utilities: {
                            internalUtilities: this.project.utilities.internalUtilities,
                            locationUtilities: this.project.utilities.locationUtilities
                        }
                    }
                }
            })
            this.$toast.show("Cập nhật thành công!", {
                type: "success",
                theme: "bubble",
                duration: 2000,
                postition: "top-right"
            });
            this.currentProject.utilities.locationUtilities = this.project.utilities.locationUtilities;
            this.currentProject.utilities.internalUtilities = this.project.utilities.internalUtilities;
        },
        addNewProjectImage() {
            if (this.currentProject.images.includes(this.newImage)) 
            {
                this.$toast.show("Hình ảnh đã tồn tại, vui lòng thử lại!", {
                    type: "error",
                    theme: "bubble",
                    duration: 2000,
                    position: "top-right"
                });
                this.newImage = "";
                return;
            }
            if (this.newImage == "") {
                this.$toast.show("Chưa có dữ liệu, vui lòng thử lại!", {
                    type: "error",
                    theme: "bubble",
                    duration: 2000,
                    position: "top-right"
                });
                return;
            }
            this.project.images.push(this.newImage);
            this.currentProject.images.push(this.newImage);
            console.log(this.currentProject.images.length)
            this.$apollo.mutate({
                mutation: gql`mutation AddNewProjectImage($input: UpdateProjectInput!)
                {
                    updateProject(input: $input) {
                        string
                    }
                }`,
                variables: {
                    input: {
                        id: this.project.id,
                        images: this.project.images
                    }
                }
            });
            this.newImage = "";
            this.$toast.show("Thêm thành công!", {
                type: "success",
                theme: "bubble",
                duration: 2000,
                position: "top-right"
            });
        },
        showUpdateProjectImageModal(index) {
            this.$modal.show("edit-project-image");
            this.imageIndex = index;
        },
        updateProjectImage() {
            if (this.currentProject.images[this.imageIndex] == this.project.images[this.imageIndex]) {
                this.$toast.show("Dữ liệu chưa có thay đổi gì", {
                    type: "error",
                    theme: "bubble",
                    duration: 2000,
                    position: "top-right"
                });
                return;
            }
            if (this.project.images[this.imageIndex] == "") {
                this.$toast.show("Dữ liệu không được để trống, hoặc bạn có thể xóa đi hình ảnh này", {
                    type: "error",
                    theme: "bubble",
                    duration: 2000,
                    position: "top-right"
                });
                return;
            }
            this.$apollo.mutate({
                mutation: gql`mutation UpdateProjectImage($input: UpdateProjectInput!) {
                    updateProject(input: $input) {
                        string
                    }
                }`,
                variables: {
                    input: {
                        id: this.project.id,
                        images: this.project.images
                    }
                }
            });
            this.currentProject.images[this.imageIndex] = this.project.images[this.imageIndex];
            this.$toast.show("Thay đổi thành công!", {
                type: "success",
                theme: "bubble",
                duration: 2000,
                position: "top-right"
            });
            this.$modal.hide("edit-project-image");
        },
        showDeleteProjectImageModal(index) {
            this.imageIndex = index;
            this.$modal.show("delete-project-image");
        },
        deleteProjectImage() {
            this.project.images = this.project.images.filter(x => x != this.project.images[this.imageIndex]);
            this.currentProject.images = this.currentProject.images.filter(x => x != this.currentProject.images[this.imageIndex]);
            console.log(this.currentProject.images.length);
            this.$apollo.mutate({
                mutation: gql`mutation DeleteProjectImage($input: UpdateProjectInput!) 
                {
                    updateProject(input: $input)
                    {
                        string
                    }
                }`,
                variables: {
                    input: { 
                        id: this.project.id,
                        images: this.project.images
                    }
                }
            });
            this.$toast.show("Xóa thành công!", {
                type: "success",
                theme: "bubble",
                duration: 2000,
                position: "top-right"
            });
            this.$modal.hide("delete-project-image");
        },
        addNewPageInfor() {
            if ((this.newPageInfor.slug == "") || (this.currentProject.pageInfors.some(x => x.slug == this.newPageInfor.slug) == true)) {
                this.$toast.show("Slug đã tồn tại hoặc chưa có, vui lòng thử lại!", {
                    type: "error",
                    theme: "bubble",
                    duration: 2000,
                    position: "top-right"
                });
                this.newPageInfor = {};
                this.$modal.hide("add-new-page-information");
                return;
            }
            var pageInfor = {
                title: this.newPageInfor.title,
                slug: this.newPageInfor.slug,
                metaDescription: this.newPageInfor.metaDescription
            };
            this.project.pageInfors.forEach(x => delete x["__typename"]);
            this.project.pageInfors.push(pageInfor);
            this.$apollo.mutate({
                mutation: gql`mutation AddNewPageInfor($input: UpdateProjectInput!) 
                {
                    updateProject(input: $input) {
                        string
                    }
                }`,
                variables: {
                    input: {
                        id: this.project.id,
                        pageInfors: this.project.pageInfors
                    }
                }
            });
            this.newPageInfor = {};
            this.currentProject.pageInfors.push(pageInfor);
            console.log(this.currentProject.pageInfors.length);
            this.$toast.show("Thêm thành công!", {
                type: "success",
                theme: "bubble",
                duration: 2000,
                position: "top-right"
            });
            this.$modal.hide("add-new-page-information");
        },
        showPageInforModal(index) {
            this.pageInforIndex = index;
            this.$modal.show("page-information-detail");
        },
        updatePageInformation() {
            var index = this.pageInforIndex;
            console.log(this.currentProject.pageInfors[index]);
            console.log(this.project.pageInfors[index]);
            if ((this.currentProject.pageInfors[index].slug == this.project.pageInfors[index].slug)
                && (this.currentProject.pageInfors[index].title == this.project.pageInfors[index].title)
                && (this.currentProject.pageInfors[index].metaDescription == this.project.pageInfors[index].metaDescription))  
            {
                this.$toast.show("Dữ liệu chưa có thay đổi gì", {
                    type: "error",
                    theme: "bubble",
                    duration: 2000,
                    position: "top-right"
                });
                return;
            }
            if (this.currentProject.pageInfors[index].slug != this.project.pageInfors[index].slug) {
                if ((this.project.pageInfors[index].slug == "") || (this.currentProject.pageInfors.some(x => x.slug == this.project.pageInfors[index].slug))) {
                    this.$toast.show("Slug đã tồn tại hoặc chưa có, vui lòng thử lại!", {
                        type: "error",
                        theme: "bubble",
                        duration: 2000,
                        position: "top-right"
                    });
                    this.project.pageInfors[index].slug = this.currentProject.pageInfors[index].slug;
                    this.project.pageInfors[index].title = this.currentProject.pageInfors[index].title;
                    this.project.pageInfors[index].metaDescription = this.currentProject.pageInfors[index].metaDescription;
                    return;
                }
            }
            this.project.pageInfors.forEach(x => delete x["__typename"]);
            this.$apollo.mutate({
                mutation: gql`mutation UpdatePageInformation($input: UpdateProjectInput!)
                {
                    updateProject(input: $input) 
                    {
                        string
                    }
                }`,
                variables: {
                    input: {
                        id: this.project.id,
                        pageInfors: this.project.pageInfors
                    }
                }
            });
            this.$toast.show("Thay đổi thành công!", {
                type: "success",
                theme: "bubble",
                duration: 2000,
                position: "top-right"
            });
            this.currentProject.pageInfors[index].slug = this.project.pageInfors[index].slug;
            this.currentProject.pageInfors[index].title = this.project.pageInfors[index].title;
            this.currentProject.pageInfors[index].metaDescription = this.project.pageInfors[index].metaDescription;
            this.$modal.hide("page-information-detail");
        },
        showDeletePageInforModal(index)
        {
            this.pageInforIndex = index;
            this.$modal.show("delete-page-information");
        },
        deletePageInfor() {
            var index = this.pageInforIndex;
            this.project.pageInfors = this.project.pageInfors.filter(x => x.slug != this.project.pageInfors[index].slug);
            this.currentProject.pageInfors = this.currentProject.pageInfors.filter(x => x.slug != this.currentProject.pageInfors[index].slug);
            this.project.pageInfors.forEach(x => delete x["__typename"]);
            this.$apollo.mutate({
                mutation: gql`mutation deleteProjectPageInfor($input: UpdateProjectInput!) 
                {
                    updateProject(input: $input)
                    {
                        string
                    }
                }`,
                variables: {
                    input: {
                        id: this.project.id,
                        pageInfors: this.project.pageInfors
                    }
                }
            });
            this.$toast.show("Xóa thành công!", {
                type: "success",
                theme: "bubble",
                duration: 2000,
                position: "top-right"
            });
            this.pageInforIndex = 0;
            this.$modal.hide("delete-page-information");
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
        width: 25%;
        padding-inline: 10px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 14px;
        resize: none;
    }
    ul .uti {
        list-style-type: disc;
    }
</style>
