<template>
  <div class="px-5 w-full max-w-screen-xl mx-5">
    <h1 class="text-3xl font-medium mb-5">
      Chỉnh sửa tin đăng {{post.pageInfor.title}}
    </h1>
    <em class="text-md text-gray-400 mb-5">Trạng thái: {{post.status}}</em>
    <h2 class="font-bold text-lg mb-2">
      Thông tin trang
    </h2>
    <div class="flex flex-col w-full ml-2">
      <div class="my-2">
        <p class="font-medium mr-6 text-md">
          Slug:
        </p>
        <em class="text-sm text-gray-400 mb-5">Độ dài tối đa: 51</em>
        <br>
        <div class="flex justify-between items-center">
          <input :placeholder="post.pageInfor.slug" maxlength="51" type="text" class="w-11/12 border rounded-md mb-2 pl-4" v-model="post.pageInfor.slug">
          <p class="content" :value="this.post.pageInfor.slug.length">{{this.post.pageInfor.slug.length}}/51</p>
        </div>
      </div>
      <div class="my-2">
        <p class="font-medium mr-6 text-md">
          Title:
        </p>
        <em class="text-sm text-gray-400 mb-5">Độ dài tối đa: 63 - Độ dài tối thiểu: 30</em>
        <br>
        <div class="flex justify-between items-center">
          <input :placeholder="post.pageInfor.title" type="text" maxlength="63" class="w-11/12 border rounded-md mb-2 pl-4" v-model="post.pageInfor.title">
          <p class="content" :value="this.post.pageInfor.title.length">{{this.post.pageInfor.title.length}}/63</p>
        </div>
      </div>
      <div class="my-2">
        <p class="font-medium mr-6 text-md">
          Meta: 
        </p>
        <em class="text-sm text-gray-400 mb-5">Độ dài tối đa: 155 ký tự - Độ dài tối thiểu: 70 ký tự</em>
        <br>
        <div class="flex justify-between items-center">
          <input :placeholder="post.pageInfor.metaDescription" maxlength="155" type="text" class="w-11/12 border rounded-md mb-2 pl-4" v-model="post.pageInfor.metaDescription">
          <p class="content" :value="this.post.pageInfor.metaDescription.length">{{this.post.pageInfor.metaDescription.length}}/155</p>
        </div>
      </div>
    </div>
    <h2 class="font-bold text-lg mb-2 mt-6">Thông tin về tin đăng</h2>
    <div class="flex flex-col w-full ml-2">
      <div class="my-2">
        <p class="font-medium mr-6 text-md">
          Mã căn: 
          </p>
        <input :placeholder="post.apartmentNumber" type="text" class="w-full border rounded-md mb-2 pl-4" v-model="post.apartmentNumber">
      </div>
      <div class="my-2">
        <p class="font-medium mr-6 text-md">
          Diện tích (m<sup>2</sup>): 
        </p>
        <input :placeholder="post.acreage" type="number" class="w-full border rounded-md mb-2 pl-4" v-model="post.acreage">
      </div>
      <div class="my-2">
        <p class="font-medium mr-6 text-md">
          Diện tích sử dụng (m<sup>2</sup>): 
        </p>
        <input :placeholder="post.usageAcreage" type="number" class="w-full border rounded-md mb-2 pl-4" v-model="post.usageAcreage">
      </div>
      <div class="my-2">
        <p class="font-medium mr-6 text-md">
          Số tầng:
        </p>
        <input :placeholder="post.floor" type="number" class="w-full border rounded-md mb-2 pl-4" v-model="post.floor">
      </div>
      <div class="my-2">
        <p class="font-medium mr-6 text-md">
          Block:
        </p>
        <input :placeholder="post.block" type="text" class="w-full border rounded-md mb-2 pl-4" v-model="post.block">
      </div>
      <div class="my-2">
        <p class="font-medium mr-6 text-md">
          Hướng nhà:
        </p>
        <input :placeholder="post.viewDirection" type="text" class="w-full border rounded-md mb-2 pl-4" v-model="post.viewDirection">
      </div>
      <div class="my-2">
        <p class="font-medium mr-6 text-md">
          Hướng cửa:
          <input :placeholder="post.direction" type="text" class="w-full border rounded-md mb-2 pl-4" v-model="post.direction">
        </p>
      </div>
      <div class="my-2">
        <p class="font-medium mr-6 text-md">
          Đặc điểm khác:
        </p>
        <input :placeholder="post.otherSpecification" type="text" class="w-full border rounded-md mb-2 pl-4" v-model="post.otherSpecification">
      </div>
      <div class="my-2">
        <p class="font-medium mr-6 text-md">
          View:
        </p>
        <input :placeholder="post.view" type="text" class="w-full border rounded-md mb-2 pl-4" v-model="post.view">
      </div>
    </div>
    <div class=" mb-2 mt-8 text-lg flex justify-between">
      <h2 class="font-bold">
        Nội thất
      </h2>
      <div class="flex justify-between items-center">
        <input
          v-model="newFurniture"
          class="border rounded-md pl-2 w-64 mr-3"
          placeholder="Thêm nội thất mới cho bài viết..."
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 hover:text-green-500 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="addNewFurniture"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
    <div class="mt-4 rounded-lg border-8 py-3 px-5">
      <ul>
        <li v-for="item in post.furnitures" :key="item" class="bgc-cornflowerblue rounded-lg inline-flex mr-4 mt-2 mb-3 bg-lime-300 p-2 list-none" title="xóa nội thất">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 cursor-pointer mr-2 text-slate-400 hover:text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            @click="deleteFurniture(item)"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ item }}
        </li>
      </ul>
    </div>
    <h2 class="font-bold text-lg mb-2 mt-6">
      Mô tả
    </h2>
    <client-only>
      <quill-editor
        ref="myQuillEditor"
        v-model="post.description"
        class="h-52"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      />
    </client-only>
    <div class=" mb-2 mt-16 text-lg flex justify-between">
      <h2 class="font-bold">
        Tags
      </h2>
      <div class="flex justify-between items-center">
        <input
          v-model="newTag"
          class="border rounded-md pl-2 w-64 mr-3"
          placeholder="Thêm tag mới cho bài viết..."
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 hover:text-green-500 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="addNewTag"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
    <div class="mt-4 rounded-lg border-8 py-3 px-5">
      <ul>
        <li v-for="item in post.tags" :key="item" class="bgc-cornflowerblue rounded-lg inline-flex mr-4 mt-2 mb-3 bg-lime-300 p-2 list-none" title="xóa tag">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 cursor-pointer mr-2 text-slate-400 hover:text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            @click="deleteTag(item)"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ item }}
        </li>
      </ul>
    </div>
    
    <h1 class="font-bold text-lg my-2">
      Hình ảnh
      </h1>
      <em class="mb-2">Bạn có thể kéo để thay đổi vị trí ảnh</em>
    <div class="pannel mt-10" style="width:100%">
      
      <div class="list row ">
        <drag-sortable v-for="(item, index) in post.gallery" v-model="dragData2" :key="item" :index="index" @sortend="sortend($event, post.gallery)" replace-direction="horizontal">
          <div v-if="item.includes('.mp4')">
            <video controls>
              <source :src="imgUrl + item" type="video/mp4">
            </video>
          </div>
          <div v-else>
            <img style="user-drag:none; -webkit-user-drag:none;" :src="imgUrl + item">
          </div>
        </drag-sortable>
      </div>
    </div>
    <div class="flex justify-end mt-5 space-x-2">
      <button @click="updatePost" class="bg-blue-400 hover:bg-blue-600 text-white font-bold h-10 py-2 px-4 rounded flex item-center">
        Cập nhật
      </button>
      <button @click="publishPost" class="bg-green-500 hover:bg-green-700 text-white font-bold h-10 py-2 px-4 rounded flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Đăng
      </button>
    </div>
    <modal name="update-before-publish">
      <div class="p-2 mt-10">
        <h1 class="font-bold text-2xl">Dữ liệu có thay đổi, bạn có muốn cập nhật không?</h1>
        <p class="text-lg mt-5">Sau khi cập nhật, tin sẽ tự động đăng nhé!</p>
      </div>
      <div class="flex justify-center space-x-5 mt-5">
          <button @click="cancelUpdateBeforePublish" class="bg-blue-400 hover:bg-blue-600 text-white font-bold h-10 py-2 px-4 rounded flex item-center">Quay lại</button>
          <button @click="updatePost" class="bg-green-400 hover:bg-green-600 text-white font-bold h-10 py-2 px-4 rounded flex item-center">Cập nhật</button>
        </div>
      
    </modal>
  </div>
  
</template>

<style scoped>
.bgc-cornflowerblue{
  background-color: cornflowerblue;
  color: white;
}
.pannel > h1 {
  font-size: 16px;
}
.pannel {
  display: inline-block;
  vertical-align: top;
  width: 160px;
}
.list {
  position: relative;
  height: 500px;
  overflow: auto;
}
.list img {
  width:190px;
  height:215px;
  object-fit: contain;
}
.list video {
  width: 190px;
  height: 215px;
}
.list > * {
  width: 100px;
  height: 100px;
  background: white;
  border: 1px solid #f0f0f0;
}
.list > .dragging {
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
}
.list.row > * {
  display: inline-block;
}
.content {
    font-family: Roboto;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #999999;
  }
  
</style>

<script>
import gql from "graphql-tag";
import dragSortable from '~/components/drag-sortable.vue';

const getPost = gql`query GetPost($condition: PostCollectionFilterInput)
              {
                post(where: $condition) {
                  id,
                  acreage,
                  direction
                  usageAcreage,
                  otherSpecification,
                  view
                  viewDirection
                  apartmentNumber,
                  block,
                  description,
                  floor,
                  furnitures,
                  gallery,
                  pageInfor {
                    title,
                    slug,
                    metaDescription
                  },
                  status,
                  tags,
                }
              }`;

const updatePost = gql`mutation deletePostTag($input: UpdatePostInput!)
        {
          updatePost(input: $input)
          {
            string
          }
        }`;
export default {
  components: { dragSortable },
  name: 'EditPost',
  apollo: {
    post: { 
      query() {
        return getPost
      },
      update: data => data.post,
      variables() {
        return {
          condition: {
            pageInfor: { 
              slug: { 
                eq: this.$route.params.slug
              }
            }
          }
        }
      }
    }
  },
  mounted() {
    console.log("mounted, static data of the post will be fetched here");
    console.log(this.post.gallery);
    this.currentPost = {
      id: this.post.id,
      acreage: this.post.acreage,
      apartmentNumber: this.post.apartmentNumber,
      block: this.post.block,
      description: this.post.description,
      floor: this.post.floor,
      furnitures: [],
      gallery: [],
      otherSpecification: this.post.otherSpecification,
      pageInfor: {
        title: this.post.pageInfor.title,
        slug: this.post.pageInfor.slug,
        metaDescription: this.post.pageInfor.metaDescription
      },
      tags: [],
      usageAcreage: this.post.usageAcreage,
      view: this.post.view,
      viewDirection: this.post.viewDirection
    };
    if (this.post.tags != null) 
    {
      this.post.tags.forEach(tag => this.currentPost.tags.push(tag));
    }
    else {
      this.post.tags = [];
    }
    if (this.post.furnitures != null) {
      this.post.furnitures.forEach(x => this.currentPost.furnitures.push(x));
    }
    else {
      this.post.furnitures = [];
    }
    if (this.post.gallery != null) { 
      this.post.gallery.forEach(c => this.currentPost.gallery.push(c));
    }
    else {
      this.post.gallery = [];
    }
  },

  data () {
    return {
      modalIsShowing: false,
      dragData2: {},
      dragData3: {},
      imgUrl: "https://maico-hub-record.ss-hn-1.bizflycloud.vn/",
      listData: [1,2,3,4,5],
      slugToCheck: "",
      imageIsChanged: false,
      currentPost: {},
      newTag: '',
      newFurniture: '',
      editorOption: {
        // Some Quill options...
        theme: 'snow',
        modules: {
          toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block', "link"],
            [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            ['clean'] // remove formatting button
          ]
        }
      }
    };
  },
  methods: {
    sortend (e, list) {
      this.imageIsChanged = true;
      const { oldIndex, newIndex } = e;
      this.rearrange(list, oldIndex, newIndex);
    },
    rearrange (array, oldIndex, newIndex) {
      if (oldIndex > newIndex) {
        array.splice(newIndex, 0, array[oldIndex]);
        array.splice(oldIndex + 1, 1);
      }
      else {
        array.splice(newIndex + 1, 0, array[oldIndex]);
        array.splice(oldIndex, 1);
      }
    },
    onEditorBlur (editor) {
      console.log('editor blur!');
    },
    onEditorFocus (editor) {
      console.log('editor focus!');
    },
    onEditorReady (editor) {
      console.log('editor ready!');
    },
    addNewTag() 
    {
      console.log(this.newTag);
      if (this.newTag == "" || this.currentPost.tags.includes(this.newTag)) {
        this.$toast.show("Tag đã tồn tại hoặc đang trống, vui lòng thử lại!", {
          type: "error",
          theme: "bubble",
          duration: 3000,
          position: "top-right"
        });
        return;
      }
      this.post.tags.push(this.newTag);
      this.newTag = "";
      this.$toast.show("Thêm thành công! Nhớ cập nhật nha!!!", {
        type: "success",
        theme: "bubble",
        duration: 3000,
        position: "top-right"
      });
    },
    deleteTag(tag) {
      var index = this.currentPost.tags.indexOf(tag);
      this.post.tags.splice(index, 1);
      this.$toast.show("Xóa thành công! Nhớ cập nhật nha!!!!", {
        type: "success",
        theme: "bubble",
        duration: 3000,
        position: "top-right"
      });
    },
    addNewFurniture() {
      if (this.newFurniture == '' || this.post.furnitures.includes(this.newFurniture)) {
        this.$toast.show("Nội thất đã tồn tại, vui lòng thử lại!",
        {
          type: "error",
          theme: "bubble",
          duration: 3000,
          position: "top-right"
        });
        return;
      }
      this.post.furnitures.push(this.newFurniture);
      this.newFurniture = '';
      this.$toast.show("Thêm thành công! Nhớ cập nhật nha!!!", {
        type: "success",
        theme: "bubble",
        duration: 3000,
        position: "top-right"
      });
    },
    deleteFurniture(item) {
      var index = this.currentPost.furnitures.indexOf(item);
      this.post.furnitures.splice(index, 1);
      this.$toast.show("Xoá thành công! Nhớ cập nhật nha!!!", {
        type: "success",
        theme: "bubble",
        duration: 3000,
        position: "top-right",
      });
    },

    updatePost() {
      console.log(this.post);
      console.log(this.currentPost);
      // compare default post with all changes from post
      if ((this.currentPost.pageInfor.title == this.post.pageInfor.title) && (this.currentPost.pageInfor.slug == this.post.pageInfor.slug)
        && (this.currentPost.pageInfor.metaDescription == this.post.pageInfor.metaDescription) && (this.currentPost.apartmentNumber == this.post.apartmentNumber)
        && (this.currentPost.acreage == this.post.acreage) && (this.currentPost.floor == this.post.floor) && (this.currentPost.block == this.post.block)
        && (this.currentPost.description == this.post.description) && (this.currentPost.tags.length == this.post.tags.length)
        && (this.currentPost.otherSpecification == this.post.otherSpecification) && (this.currentPost.usageAcreage == this.post.usageAcreage) 
        && (this.currentPost.view == this.post.view) && (this.currentPost.viewDirection == this.post.viewDirection)
        && (this.currentPost.furnitures.length == this.post.furnitures.length) && (this.imageIsChanged == false))
        {
        
          this.$toast.show("Cập nhật thất bại, dữ liệu chưa có thay đổi gì!", {
            type: "error",
            theme: "bubble",
            duration: 3000,
            position: "top-right"
          });
          return;
        }
        if ((this.post.acreage == null || this.post.acreage <= 0) || (this.post.floor == null || this.post.floor <= 0) || (this.post.usageAcreage <= 0)) {
          this.$toast.show("Diện tích, Diện tích sử dụng và Tầng phải lớn hơn 0!", {
            type: "error",
            theme: "bubble",
            duration: 3000,
            position: "top-right"
          });
          this.$modal.hide("update-before-publish")
          return;
        }
        if (this.post.pageInfor.title.length < 30 || this.post.pageInfor.title.length > 63) {
          this.$toast.show("Tiêu đề có độ dài từ 30 đến 63 ký tự!", {
            type: "error",
            theme: "bubble",
            duration: 3000,
            position: "top-right"
          });
          return;
        }
        if (this.post.pageInfor.slug.length > 51) {
          this.$toast.show("Slug có độ dài bằng 51 ký tự!", {
            type: "error",
            theme: "bubble",
            duration: 3000,
            position: "top-right"
          });
          return;
        }
        if (this.post.pageInfor.metaDescription.length < 70 || this.post.pageInfor.metaDescription.length > 155) {
          this.$toast.show("Meta description có độ dài từ 70 đến 155 ký tự!", {
            type: 'error',
            theme: 'bubble',
            duration: 3000,
            position: 'top-right'
          });
          return;
        }
        this.post.acreage = Number(this.post.acreage);
        this.post.floor = Number(this.post.floor);
        this.post.usageAcreage = Number(this.post.usageAcreage);
        this.$apollo.mutate({
          mutation: updatePost,
          variables: {
            input: {
              id: this.post.id,
              acreage: this.post.acreage,
              apartmentNumber: this.post.apartmentNumber,
              block: this.post.block,
              description: this.post.description,
              floor: this.post.floor,
              furniture: this.post.furnitures,
              gallery: this.post.gallery,
              otherSpecification: this.post.otherSpecification,
              pageInfor: {
                title: this.post.pageInfor.title,
                slug: this.post.pageInfor.slug,
                metaDescription: this.post.pageInfor.metaDescription
              },
              tags: this.post.tags,
              usageAcreage: this.post.usageAcreage,
              view: this.post.view,
              viewDirection: this.post.viewDirection
            }
          }
        }).then((data) => {
          this.slugToCheck = this.currentPost.pageInfor.slug;
          this.$toast.show("Cập nhật thành công!", {
          type: "success",
          theme: "bubble",
          duration: 3000,
          position: "top-right"
        });
        this.currentPost = {
          id: this.post.id,
          acreage: this.post.acreage,
          apartmentNumber: this.post.apartmentNumber,
          block: this.post.block,
          description: this.post.description,
          furnitures: [],
          floor: this.post.floor,
          gallery: this.post.gallery,
          otherSpecification: this.post.otherSpecification,
          pageInfor: {
            title: this.post.pageInfor.title,
            slug: this.post.pageInfor.slug,
            metaDescription: this.post.pageInfor.metaDescription
          },
          tags: [],
          usageAcreage: this.post.usageAcreage,
          view: this.post.view,
          viewDirection: this.post.viewDirection
        };
        this.imageIsChanged = false;
        this.post.tags.forEach(tag => this.currentPost.tags.push(tag));
        this.post.furnitures.forEach(c => this.currentPost.furnitures.push(c));
        if (this.modalIsShowing == true) { 
          this.publishPost();
        }
        else {
          if (this.slugToCheck != this.post.pageInfor.slug) {
            location.replace(this.post.pageInfor.slug);
          }
        }
        this.$modal.hide("update-before-publish");
        }).catch((error) => {
          console.log(error);
          this.post.pageInfor.slug = this.currentPost.pageInfor.slug;
          this.$toast.show("Slug đã tồn tại", {
            type: "error",
            theme: "bubble",
            duration: 3000,
            position: "top-right"
          });
          return;
        })
        
      }, 
      publishPost() {
        console.log(this.currentPost);
        console.log(this.post);
        if ((this.currentPost.pageInfor.title != this.post.pageInfor.title) || (this.currentPost.pageInfor.slug != this.post.pageInfor.slug)
        || (this.currentPost.pageInfor.metaDescription != this.post.pageInfor.metaDescription) || (this.currentPost.apartmentNumber != this.post.apartmentNumber)
        || (this.currentPost.acreage != this.post.acreage) || (this.currentPost.floor != this.post.floor) || (this.currentPost.block != this.post.block)
        || (this.currentPost.description != this.post.description) || (this.currentPost.tags.length != this.post.tags.length)
        || (this.currentPost.gallery.forEach(x => this.post.gallery.forEach(c => x != c))) || (this.currentPost.furnitures.length != this.post.furnitures.length)
        || (this.currentPost.otherSpecification != this.post.otherSpecification) || (this.currentPost.usageAcreage != this.post.usageAcreage) 
        || (this.currentPost.view != this.post.view) || (this.currentPost.viewDirection != this.post.viewDirection)|| (this.imageIsChanged == true))
        {
          this.modalIsShowing = true;
          this.$modal.show("update-before-publish");
          return;
        }
        console.log(this.post);
        if ((this.post.acreage == null || this.post.acreage <= 0) || (this.post.apartmentNumber == null || this.post.apartmentNumber == "") 
        || (this.post.block == null || this.post.block == "") || (this.post.description == null || this.post.description == "")
        || (this.post.floor == null || this.post.floor <= 0) || (this.post.tags.length == 0)
        || (this.post.pageInfor.title == null || this.post.pageInfor.title == "") || (this.post.pageInfor.slug == null || this.post.pageInfor.slug == "")
        || (this.post.pageInfor.metaDescription == null || this.post.pageInfor.metaDescription == "")
        || (this.post.gallery.length == 0) || (this.post.furnitures.length == 0) || (this.post.usageAcreage == null || this.post.usageAcreage <= 0)
        || (this.post.otherSpecification == null || this.post.otherSpecification == "") || (this.post.view == null || this.post.view == "")
        || (this.post.viewDirection == null || this.post.viewDirection == ""))
        {
          this.$toast.show("Tất cả dữ liệu không được để trống, vui lòng cập nhật và kiểm tra lại!", {
            type: "error",
            theme: "bubble",
            duration: 3000,
            position: "top-right"
          });
          return;
        }
        this.$apollo.mutate({
          mutation: gql`mutation PublishPost($input: UpdatePostStatusInput!)
          {
            updatePostStatus(input: $input)
            {
              string
            }
          }`,
          variables: {
            input: { 
              id: this.post.id
            }
          }
        });
        this.$toast.show("Đăng tin thành công, trang sẽ điều hướng sau 3 giây!", {
          type: "success",
          theme: "bubble",
          duration: 3000,
          position: "top-right"
        });
        setTimeout(() => this.$router.push({path: "/danh-sach-cho"}), 3000);
      },
      cancelUpdateBeforePublish() {
        this.$modal.hide("update-before-publish");
        this.$toast.show("Nhớ cập nhật dữ liệu trước khi đăng nha!", {
          type: "info",
          theme: "bubble",
          duration: 3000,
          position: "top-right"
        });
        this.modalIsShowing = false;
      },
      

  }
};
</script>
