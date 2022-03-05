<template>
    <div class="vue-expand-panel p-2 h-auto">
        <h1 class="text-center font-bold text-lg">CHỈNH SỬA DỰ ÁN</h1>
        <br>
        <div class="w-auto h-auto p-2 border-4 rounded m-5" v-for="(project, index) in projects" :key="index">
            <h1 class="font-semidbold text-lg">{{project.projectName}}</h1>
            <div class="p-2 h-auto" style="width:1000px;">
                <expand-panel title="Thông tin">
                    <div>
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
                    </div>
                    <div class="flex justify-end my-2">
                        <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectInformation(project.id)">Cập nhật</button>
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
                            <button @click="showGoogleMapEditModal(project.id, project.address)">
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
                        <textarea type="text" class="w-1/2" rows="4" v-model="project.utilities.locationUtilites"></textarea>
                    </p>
                    <p>
                        <label for="meta" class="font-semibold">Tiện ích nội khu:</label>
                        <textarea type="text" class="w-1/2" rows="4" v-model="project.utilities.internalUtilites"></textarea>
                    </p>
                    <div class="flex justify-end space-x-1">
                        <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectUtilities(project.id)">Cập nhật</button>
                    </div>
                </expand-panel>

                <expand-panel title="Hình ảnh">
                    <div class="flex justify-start items-center">
                        <input type="text" class="w-1/5 my-2" v-model="currentImage" placeholder="Thêm hình ảnh mới">
                        <button @click="addNewProjectImage(project.id, project.images)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="ml-3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </button>
                    </div>
                    <div class="container mt-3" style="float:left;">
                        <div class="w-100 mx-2" style="float:left" v-for="(item, index) in project.images" :key="index">
                            <img class="w-40 h-32 mr-2 my-2" :src="item" alt="alternative text"/>
                            <div class="flex justify-evenly">
                                <button name="edit-button" @click="showUpdateProjectImageModal(project.id, project.images, index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                                </button>
                                <button name="delete" @click="showDeleteProjectImageModal(project.id, project.images, project.images[index])">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </expand-panel>
                <expand-panel title="Thông tin SEO">
                    <div class="my-2">
                            <button class="px-3 py-1 bg-gray-300 rounded" @click="showAddNewPageInforModal(project.id, project.pageInfors)">Thêm thông tin mới</button>
                    </div>
                    <div class="container mb-5" v-for="(item, index) in project.pageInfors" :key="index">
                        <div class="flex justify-between items-center">
                            <p>{{item.title}}</p>
                            <div class="flex justify-around items-center space-x-1">
                                <button @click="showPageInforModal(project.id, project.pageInfors, item, index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                                </button>
                                <button name="delete" @click="showDeletePageInforModal(project.id, item)">
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
                            <button class="text-white px-3 py-1 bg-green-400 rounded relative float-right mt-3.5" @click="updateProjectInformation(project.id)">Cập nhật</button>
                    </div>
                </expand-panel>
            </div>
        </div>
        <modal name="page-information-detail">
            <h2 class="mt-2 text-lg font-semibold text-center">Chỉnh sửa thông tin SEO</h2>
            <div class="p-2 m-2">
                <p class="mb-3">
                    <label for="title" class="font-semibold">Tiêu đề:</label>
                    <input type="text" class="w-1/2" style="width: 50% !important" v-model="currentPageInfor.title">
                </p>
                
                <p class="mb-3">
                    <label for="slug" class="font-semibold">Slug:</label>
                    <input type="text" class="w-1/2" style="width: 50% !important" v-model="currentPageInfor.slug">
                </p>
                
                <p>
                    <label for="meta" class="font-semibold">Meta description:</label>
                    <textarea type="text" class="w-1/2" rows="4" v-model="currentPageInfor.metaDescription"></textarea>
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
                    <input type="text" class="w-1/2" style="width: 50% !important" v-model="currentPageInfor.title" disabled>
                </p>
                
                <p class="mb-3">
                    <label for="slug" class="font-semibold">Slug:</label>
                    <input type="text" class="w-1/2" style="width: 50% !important" v-model="currentPageInfor.slug" disabled>
                </p>
                
                <p>
                    <label for="meta" class="font-semibold">Meta description:</label>
                    <textarea type="text" class="w-1/2" rows="4" v-model="currentPageInfor.metaDescription" disabled></textarea>
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
                    <button class="px-3 py-1 bg-green-400 rounded" @click="addNewPageInfor(newPageInfor.id, currentPageInfor)">Đồng ý</button>
                </div>
            </div>
        </modal>
        <modal name="google-map-edit-modal">
            <div class="pt-12">
                <h2 class="mt-2 text-lg font-semibold text-center">Chỉnh sửa Google Map</h2>
                <p class="m-10">
                    <label for="map" class="font-semibold">Google map:</label> 
                    <input type="text" class="w-1/4" style="width:75% !important" v-model="currentProjectAddress.item">
                </p>
                <div class="flex justify-end space-x-3 m-2 my-2">
                    <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('google-map-edit-modal')">Quay lại</button>
                    <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectGoogleMap(currentProjectAddress.id, currentProjectAddress.street, currentProjectAddress.district, currentProjectAddress.city, currentProjectAddress.googleMapLocation, currentProjectAddress.item)">Đồng ý</button>
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
                    <input type="text" style="width:90% !important" v-model="updateImages.item">
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
                    <button class="text-white px-3 py-1 bg-green-400 rounded" @click="deleteProjectImage(updateImages.id, updateImages.images, updateImages.img)">Đồng ý</button>
                </div>
            </div>
        </modal>
    </div>
</template>

<script type="text/javascript">
import gql from 'graphql-tag';
import { expandPanel } from 'vue-expand-panel';
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
                        internalUtilites,
                        locationUtilites
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
        projects: { 
            query: getProject
        }
    },
    components: {
        expandPanel
    },
    data() {
        return {
            projectId: "",
            newPageInfor: {},
            currentProjectInfor: {},
            currentPageInfor: {},
            pageInfors: {},
            currentProjectAddress: {},
            currentImage: "",
            updateImages: {},
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
    methods: {
      onEditorBlur (editor) {
      console.log('editor blur!', editor);
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor);
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor);
    },
        updateProjectInformation(id) {
            const project = this.projects.filter(x => x.id == id);
            this.$apollo.mutate({
                mutation: gql`mutation UpdateProjectInformation($input: UpdateProjectInput!) {
                    updateProject(input: $input) {
                        string
                    }
                }`,
                variables: {
                    input: { 
                        id: id,
                        projectName: project[0].projectName,
                        investor: project[0].investor,
                        juridical: project[0].juridical,
                        description: project[0].description,
                        sEOContent: project[0].sEOContent
                    }
                }
                
            }),
            this.$toast.show("Thay đổi thành công!", {
                type: "success",
                duration: 2000,
                theme: "bubble",
                position: "top-right"
            });
            this.currentProjectInfor = {};
        },
        updateProjectAddress(id) {
            const project = this.projects.filter(x => x.id == id);
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
                            street: project[0].address.street,
                            district: project[0].address.district,
                            city: project[0].address.city,
                            googleMapLocation: project[0].address.googleMapLocation
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
            this.currentProjectAddress = {};
        },
        showGoogleMapEditModal(id, address) {
            this.currentProjectAddress = {
                id: id,
                street: address.street, 
                district: address.district,
                city: address.city,
                googleMapLocation: address.googleMapLocation,
                item: address.googleMapLocation
            };            
            this.$modal.show("google-map-edit-modal");
        },
        updateProjectGoogleMap(id, street, district, city, googleMapLocation, item)
        {
            if (item == googleMapLocation) {
                this.$toast.show("Dữ liệu chưa thay đổi, vui lòng thử lại!", {
                    type: "error",
                    theme: "bubble",
                    duration: 2000,
                    position: "top-right"
                });
                this.currentProjectAddress = {};
                return;
            }
            if (item == "") {
                this.$toast.show("Dữ liệu không được để trống, vui lòng thử lại!", {
                    type: "error",
                    theme: "bubble",
                    duration: 2000,
                    position: "top-right"
                });
                this.currentProjectAddress = {};
                return;
            }
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
                            googleMapLocation: item
                        }
                    }
                },
                update: (store, {data: {updateProjectGoogleMap}}) => {
                    const query = {
                        query: getProject
                    };
                    const { projects } = store.readQuery(query);
                    const project = projects.filter(x => x.id == id);
                    project[0].address.googleMapLocation = item;
                    store.writeQuery({...query, data: {projects: projects}});
                }
            })
            this.$modal.hide('google-map-edit-modal')
            this.$toast.show("Thay đổi thành công!", {
                type: "success",
                duration: 2000,
                theme: "bubble",
                position: "top-right"
            })
            this.currentProjectAddress = {};
        },
        updateProjectUtilities(id) {
            var project = this.projects.filter(x => x.id == id);
            
            this.$apollo.mutate({
                mutation: gql`mutation UpdateProjectUtilities($input: UpdateProjectInput!) {
                    updateProject(input: $input) {
                        string
                    }
                }`,
                variables: {
                    input: { 
                        id: id,
                        utilities: {
                            internalUtilites: project[0].utilities.internalUtilites,
                            locationUtilites: project[0].utilities.locationUtilites
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
        },
        addNewProjectImage(id, images) {
            if (images.includes(this.currentImage)) 
            {
                this.$toast.show("Hình ảnh đã tồn tại, vui lòng thử lại!", {
                    type: "error",
                    theme: "bubble",
                    duration: 2000,
                    position: "top-right"
                });
                this.currentImage = "";
                return;
            }
            if (this.currentImage == "") {
                this.$toast.show("Chưa có dữ liệu, vui lòng thử lại!", {
                    type: "error",
                    theme: "bubble",
                    duration: 2000,
                    position: "top-right"
                });
                return;
            }
            images.push(this.currentImage);
            this.$apollo.mutate({
                mutation: gql`mutation AddNewProjectImage($input: UpdateProjectInput!)
                {
                    updateProject(input: $input) {
                        string
                    }
                }`,
                variables: {
                    input: {
                        id: id,
                        images: images
                    }
                }
            });
            this.currentImage = "";
            this.$toast.show("Thêm thành công!", {
                type: "success",
                theme: "bubble",
                duration: 2000,
                position: "top-right"
            });
        },
        showUpdateProjectImageModal(id, images, index) {
            this.$modal.show("edit-project-image");
            this.updateImages = {
                id: id,
                images: images,
                item: images[index],
                index: index
            };
        },
        updateProjectImage() {
            var currentImage = this.updateImages.images[this.updateImages.index];
            if (this.updateImages.item == currentImage) {
                this.$toast.show("Dữ liệu chưa có thay đổi, vui lòng thử lại!", {
                    type: "error",
                    theme: "bubble",
                    duration: 2000,
                    position: "top-right"
                });
                return;
            }
            if (this.updateImages.item == "") {
                this.$toast.show("Dữ liệu không được để trống, hoặc bạn có thể xóa đi hình ảnh này", {
                    type: "error",
                    theme: "bubble",
                    duration: 2000,
                    position: "top-right"
                });
                return;
            }
            this.updateImages.images[this.updateImages.index] = this.updateImages.item;
            this.$apollo.mutate({
                mutation: gql`mutation UpdateProjectImage($input: UpdateProjectInput!) {
                    updateProject(input: $input) {
                        string
                    }
                }`,
                variables: {
                    input: {
                        id: this.updateImages.id, 
                        images: this.updateImages.images
                    }
                }
            });
            this.updateImages = {};
            this.$toast.show("Thay đổi thành công!", {
                type: "success",
                theme: "bubble",
                duration: 2000,
                position: "top-right"
            });
            this.$modal.hide("edit-project-image");
        },
        showDeleteProjectImageModal(id, images, img) {
            console.log(id);
            this.updateImages = {
                id: id,
                images: images,
                img: img
            }
            this.$modal.show("delete-project-image");
        },
        deleteProjectImage(id, images, img) {
            images = images.filter(x => x != img);
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
                        id: id,
                        images: images
                    }
                },
                update: (store, {data: {deleteProjectImage}}) => {
                    const query = {
                        query: getProject
                    };
                    const { projects } = store.readQuery(query);
                    const project = projects.filter(x => x.id == id);
                    project[0].images = project[0].images.filter(x => x != img);
                    console.log(projects);
                    store.writeQuery({...query, data: {projects: projects}});
                    
                }
            });
            this.$toast.show("Xóa thành công!", {
                type: "success",
                theme: "bubble",
                duration: 2000,
                position: "top-right"
            });
            this.updateImages = {};
            this.$modal.hide("delete-project-image");
        },
        showAddNewPageInforModal(id) {
            this.$modal.show("add-new-page-information");
            this.newPageInfor = {
                id: id,
                title: "",
                slug: "",
                metaDescription: ""
            };
            
        },
        addNewPageInfor() {
            var project = this.projects.filter(x => x.id == this.newPageInfor.id);
            if ((this.newPageInfor.slug == "") || (project[0].pageInfors.some(x => x.slug == this.newPageInfor.slug) == true)) {
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
            project[0].pageInfors.forEach(x => delete x["__typename"]);   
            project[0].pageInfors.push(pageInfor);
            this.$apollo.mutate({
                mutation: gql`mutation AddNewPageInfor($input: UpdateProjectInput!) 
                {
                    updateProject(input: $input) {
                        string
                    }
                }`,
                variables: {
                    input: {
                        id: this.newPageInfor.id,
                        pageInfors: project[0].pageInfors
                    }
                }
            });
            this.newPageInfor = {};
            this.currentPageInfor = {};
            this.$toast.show("Thêm thành công!", {
                type: "success",
                theme: "bubble",
                duration: 2000,
                position: "top-right"
            });
            this.$modal.hide("add-new-page-information");
        },
        showPageInforModal(id, pageInfors, item, index) {
            this.pageInfors = pageInfors;
            this.pageInfors.forEach(x => delete x["__typename"]);
            this.currentPageInfor = {
                id: id,
                index: index,
                title: item.title,
                slug: item.slug,
                metaDescription: item.metaDescription,
                // obj to compare with
                staticPageInfor: {
                    title: item.title,
                    slug: item.slug,
                    metaDescription: item.metaDescription
                }
            };
            console.log(index);
            console.log(this.pageInfors[this.currentPageInfor.index].slug)
            console.log(this.currentPageInfor.staticPageInfor.slug)
            this.$modal.show("page-information-detail");
        },
        updatePageInformation() {
            if ((this.currentPageInfor.title == this.currentPageInfor.staticPageInfor.title) 
                    && (this.currentPageInfor.slug == this.currentPageInfor.staticPageInfor.slug)
                        && (this.currentPageInfor.metaDescription == this.currentPageInfor.staticPageInfor.metaDescription)) 
            {
                this.$toast.show("Dữ liệu chưa có thay đổi, vui lòng thử lại!", {
                    type: "error",
                    theme: "bubble",
                    duration: 2000,
                    position: "top-right"
                });
                return;
            }
            if (this.pageInfors[this.currentPageInfor.index].slug != this.currentPageInfor.slug) {
                if ((this.currentPageInfor.slug == "") || (this.pageInfors.some(x => x.slug == this.currentPageInfor.slug))) {
                    this.$toast.show("Slug đã tồn tại hoặc chưa có, vui lòng thử lại!", {
                        type: "error",
                        theme: "bubble",
                        duration: 2000,
                        position: "top-right"
                    });
                    return;
                }
            }
            var index = this.pageInfors.indexOf(this.pageInfors.find(x => x.slug == this.currentPageInfor.staticPageInfor.slug));
            this.pageInfors[index].title = this.currentPageInfor.title;
            this.pageInfors[index].slug = this.currentPageInfor.slug;
            this.pageInfors[index].metaDescription = this.currentPageInfor.metaDescription;
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
                        id: this.currentPageInfor.id,
                        pageInfors: this.pageInfors
                    }
                }
            });
            this.$toast.show("Thay đổi thành công!", {
                type: "success",
                theme: "bubble",
                duration: 2000,
                position: "top-right"
            });
            this.currentPageInfor = {};
            this.pageInfors = {};
            this.$modal.hide("page-information-detail");
        },
        showDeletePageInforModal(id, item)
        {
            this.projectId = id;
            this.currentPageInfor = {
                title: item.title,
                slug: item.slug,
                metaDescription: item.metaDescription
            };
            this.$modal.show("delete-page-information");
        },
        deletePageInfor() {
            const project = this.projects.filter(x => x.id == this.projectId);
            project[0].pageInfors = project[0].pageInfors.filter(x => x.slug != this.currentPageInfor.slug);
            project[0].pageInfors.forEach(x => delete x["__typename"]);
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
                        id: this.projectId,
                        pageInfors: project[0].pageInfors
                    }
                }
            });
            this.$toast.show("Xóa thành công!", {
                type: "success",
                theme: "bubble",
                duration: 2000,
                position: "top-right"
            });
            this.projectId = "";
            this.currentPageInfor = {};
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
