<template>
  <div class="px-5 w-full max-w-screen-xl mx-5">
    <h1 class="text-3xl font-medium mb-7">
      Chỉnh sửa tin đăng {{post.pageInfor.title}}
    </h1>
    <h1 class="font-bold mb-2">
      Thông tin trang
    </h1>
    <div class="flex flex-col w-full ml-2">
      <div class="flex">
        <p class="font-medium mr-6 text-sm">
          Slug:
        </p>
        <input v-model="post.pageInfor.slug" type="text" class="w-full border rounded-md mb-2 pl-4" value="">
      </div>
      <div class="flex">
        <p class="font-medium mr-6 text-sm">
          Title:
        </p>
        <input v-model="post.pageInfor.title" type="text" class="w-full border rounded-md mb-2 pl-4" value="">
      </div>
      <div class="flex">
        <p class="font-medium mr-6 text-sm">
          Meta:
        </p>
        <input v-model="post.pageInfor.metaDescription" type="text" class="w-full border rounded-md mb-2 pl-4" value="">
      </div>
    </div>
    <h1 class="font-bold mb-2 mt-6">
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
    <div class=" mb-2 mt-16 flex justify-between">
      <h1 class="font-bold">
        Các tin liên quan
      </h1>
      <div class="flex">
        <input
          v-model="tempTag"
          class="border rounded-md pl-4 w-64 mr-3"
          placeholder="thêm tag cho bài viết.."
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 hover:text-green-500 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="addTag()"
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
            @click="() => deleteTag(item)"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ item }}
        </li>
      </ul>
    </div>
    <button @click="updatePost()" class="float-right bg-green-500 hover:bg-green-700 text-white font-bold h-10 py-2 px-4 rounded flex items-center mt-10">
      <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Đăng
    </button>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';

const getPostQuery = gql`
  query GetPost($condition: PostCollectionFilterInput) {
        post( where: $condition ) {
          id
          description
          tags
          pageInfor {
            title
            slug
            metaDescription
          }
          }
      }`;

export default {
  name: 'EditPost',
  apollo: {
    post: {
      query () {
        return getPostQuery;
      },
      variables () {
        return {
          condition: {
            pageInfor: {
              slug: {
                eq: this.$route.params.slug
              }
            }
          }
        };
      }
    }
  },
  data () {
    return {
      tempTag: '',
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
    };
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
    deleteTag (tag) {
      this.post.tags.splice(this.post.tags.indexOf(tag), 1);
    },
    addTag () {
      if (!this.post.tags.includes(this.tempTag)) {
        this.post.tags.push(this.tempTag);
        this.tempTag = '';
      }
    },
    updatePost () {
      this.$apollo.mutate({
        mutation: gql`mutation updatePost($input: UpdatePostInput) {
  updatePost(input: $input){
    string
  }
}`,
        variables: {
          input: {
            id: this.post.id,
            demand: 'hahahahaha'
          }
        }
      });
      this.post.description = this.post.id;
    }
  }
};
</script>

<style scoped>
.bgc-cornflowerblue{
  background-color: cornflowerblue;
}
</style>
