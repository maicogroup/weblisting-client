<template>
  <div class="px-5 w-full max-w-screen-xl mx-5">
    <h1 class="text-3xl font-medium mb-5">
      Chỉnh sửa tin đăng {{post.pageInfor.title}}
    </h1>
    <em class="text-md text-gray-400 mb-5">Trạng thái: {{post.status}}</em>
    <h1 class="font-bold text-lg mb-2">
      Thông tin trang
    </h1>
    <div class="flex flex-col w-full ml-2">
      <div class="my-2">
        <p class="font-medium mr-6 text-md">
          Slug:
        </p>
        <input :placeholder="post.pageInfor.slug" type="text" class="w-full border rounded-md mb-2 pl-4" v-model="post.pageInfor.slug">
      </div>
      <div class="my-2">
        <p class="font-medium mr-6 text-md">
          Title:
        </p>
        <input :placeholder="post.pageInfor.title" type="text" class="w-full border rounded-md mb-2 pl-4" v-model="post.pageInfor.title">
      </div>
      <div class="my-2">
        <p class="font-medium mr-6 text-md">
          Meta: 
        </p>
        <input :placeholder="post.pageInfor.metaDescription" type="text" class="w-full border rounded-md mb-2 pl-4" v-model="post.pageInfor.metaDescription">
      </div>
    </div>
    <h1 class="font-bold text-lg mb-2 mt-6">Thông tin về dự án</h1>
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
    </div>
    <h1 class="font-bold text-lg mb-2 mt-6">
      Mô tả
    </h1>
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
      <h1 class="font-bold">
        Tags
      </h1>
      <div class="flex justify-between items-center">
        <input
          v-model="newTag"
          class="border rounded-md pl-4 w-64 mr-3"
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
    <div class="list row">
      <drag-sortable v-for="(item, index) in listData" v-model="dragData3" :key="item" :index="index" @sortend="sortend($event, listData)" replace-direction="horizontal">
        Item {{ item }}
      </drag-sortable>
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
  height: 400px;
  overflow: auto;
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
</style>

<script>
import gql from "graphql-tag";
import dragSortable from '~/components/drag-sortable.vue';

const getPost = gql`query GetPost($condition: PostCollectionFilterInput)
              {
                post(where: $condition) {
                  id,
                  acreage,
                  apartmentNumber,
                  block,
                  description,
                  floor,
                  gallery,
                  pageInfor {
                    title,
                    slug,
                    metaDescription
                  },
                  status
                  tags
                }
              }`;

const updatePost = gql`mutation deletePostTag($input: UpdatePostInput!)
        {
          updatePost(input: $input)
          {
            string
          }
        }`;
const getAllSlugs = gql`query getPostsSlugs 
  {
    postsWithPagination {
      items {
        pageInfor {
          slug
        }
      },
      totalCount
    }
  }`
export default {
  components: { dragSortable },
  name: 'EditPost',
  comonents: {
    dragSortable
  },
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
    },
    postsWithPagination: {
      query() {
        return getAllSlugs
      },
      update: data => data.postsWithPagination
    }
  },
  mounted() {
    console.log("mounted, static data of the post will be fetched here");
    this.currentPost = {
      id: this.post.id,
      acreage: this.post.acreage,
      apartmentNumber: this.post.apartmentNumber,
      block: this.post.block,
      description: this.post.description,
      floor: this.post.floor,
      gallery: this.post.gallery,
      pageInfor: {
        title: this.post.pageInfor.title,
        slug: this.post.pageInfor.slug,
        metaDescription: this.post.pageInfor.metaDescription
      },
      tags: []
    };
    if (this.post.tags != null) 
    {
      this.post.tags.forEach(tag => this.currentPost.tags.push(tag));
    }
    else {
      this.post.tags = [];
    }
    console.log("All slugs:");
    console.log(this.postsWithPagination);
  },

  data () {
    return {
      modalIsShowing: false,
      dragData3: {},
      listData: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      slugToCheck: "",
      currentPost: {},
      newTag: '',
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

    updatePost() {
      // compare default post with all changes from post
      if ((this.currentPost.pageInfor.title == this.post.pageInfor.title) && (this.currentPost.pageInfor.slug == this.post.pageInfor.slug)
        && (this.currentPost.pageInfor.metaDescription == this.post.pageInfor.metaDescription) && (this.currentPost.apartmentNumber == this.post.apartmentNumber)
        && (this.currentPost.acreage == this.post.acreage) && (this.currentPost.floor == this.post.floor) && (this.currentPost.block == this.post.block)
        && (this.currentPost.description == this.post.description) && (this.currentPost.tags.length == this.post.tags.length))
        {
          this.$toast.show("Cập nhật thất bại, dữ liệu chưa có thay đổi gì!", {
            type: "error",
            theme: "bubble",
            duration: 3000,
            position: "top-right"
          });
          return;
        }
        if ((this.post.acreage == null || this.post.acreage <= 0) || (this.post.floor == null || this.post.floor <= 0)) {
          this.$toast.show("Diện tích và Tầng phải lớn hơn 0!", {
            type: "error",
            theme: "bubble",
            duration: 3000,
            position: "top-right"
          });
          this.$modal.hide("update-before-publish")
          return;
        }
        this.post.acreage = Number(this.post.acreage);
        this.post.floor = Number(this.post.floor);
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
              pageInfor: {
                title: this.post.pageInfor.title,
                slug: this.post.pageInfor.slug,
                metaDescription: this.post.pageInfor.metaDescription
              },
              tags: this.post.tags
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
          floor: this.post.floor,
          gallery: this.post.gallery,
          pageInfor: {
            title: this.post.pageInfor.title,
            slug: this.post.pageInfor.slug,
            metaDescription: this.post.pageInfor.metaDescription
          },
          tags: []
        };
        this.post.tags.forEach(tag => this.currentPost.tags.push(tag));
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
        || (this.currentPost.description != this.post.description) || (this.currentPost.tags.length != this.post.tags.length))
        {
          this.modalIsShowing = true;
          this.$modal.show("update-before-publish");
          return;
        }

        if ((this.post.acreage == null || this.post.acreage <= 0) || (this.post.apartmentNumber == null || this.post.apartmentNumber == "") 
        || (this.post.block == null || this.post.block == "") || (this.post.description == null || this.post.description == "")
        || (this.post.floor == null || this.post.floor <= 0) || (this.post.tags.length == 0)
        || (this.post.pageInfor.title == null || this.post.pageInfor.title == "") || (this.post.pageInfor.slug == null || this.post.pageInfor.slug == "")
        || (this.post.pageInfor.metaDescription == null || this.post.pageInfor.metaDescription == ""))
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
