<template>
    <div class="vue-expand-panel p-2 h-auto">
        <h1 class="text-center">CHỈNH SỬA DỰ ÁN</h1>
        <br>
        <div class="w-auto h-auto p-2 border-2 m-5" v-for="(project, index) in projects" :key="index">
            <h1>{{project.projectName}}</h1>
            <div class="p-2 h-auto" style="width:1000px;">
                <expand-panel :title="thongtin">
                    <strong>Tên dự án:</strong> {{project.projectName}}
                    <br>
                    <strong>Chủ đầu tư:</strong> {{project.investor}}
                    <br>
                    <strong>Pháp lý:</strong> {{project.juridical}}
                    <br>
                    <strong>Mô tả:</strong> {{project.description}}
                </expand-panel>
                <expand-panel :title="diachi">
                    <strong>Tên đường:</strong> {{project.address.street}}
                    <br>
                    <strong>Quận:</strong> {{project.address.district}}
                    <br>
                    <strong>Thành phố:</strong> {{project.address.city}}
                    <br>
                    <strong>Google Map:</strong> 
                    <iframe :src="project.address.googleMapLocation" width="100%" height="100%" loading="lazy" />
                </expand-panel>
                <expand-panel :title="tienich">
                    <ol>
                        <li v-for="(item, index) in project.utilities" :key="index">
                            {{item}}
                        </li>
                    </ol>
                </expand-panel>
                <expand-panel :title="hinhanh">
                    <div class="container flex">
                        <img class="w-32 h-32 mr-5 ml-5 mt-2 mb-2" v-for="(item, index) in project.images" :key="index" :src="item" alt="alternative text"/>
                    </div>
                </expand-panel>
                <expand-panel :title="thongTinSEO">
                    <div class="container border-2 mb-7" v-for="(item, index) in project.pageInfors" :key="index">
                        <strong>Tiêu đề:</strong> {{item.title}}
                        <br>
                        <strong>Slug: </strong> {{item.slug}} 
                        <br>
                        <strong>Meta Description:</strong> {{item.metaDescription}}   
                    </div> 
                </expand-panel>
            </div>
        </div>
    </div>

</template>

<script>
import gql from "graphql-tag";
import { expandPanel } from 'vue-expand-panel'
// import styles
import '~/assets/css/vue-expander.css';

export default {
    name: "EditProject",
    apollo: {
        projects: { 
            query: gql`query GetProject($condition: ProjectCollectionFilterInput)
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
            }`
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
            thongtin: "Thông tin",
            diachi: "Địa chỉ",
            tienich: "Tiện ích",
            hinhanh: "Hình ảnh",
            thongTinSEO: "Thông tin SEO"
        }
    }
}
</script>

<style scoped>
    </style>
