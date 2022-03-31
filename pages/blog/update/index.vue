<template>
  <div class="flex flex-row w-full justify-center mb-72">
    <div class="flex flex-col items-center w-[52.25rem] mr-2">
      <h1 class="text-3xl font-bold mb-10">Chỉnh sửa bài viết</h1>
      <textbox class="mb-6" title="Tiêu đề" v-model="blog.pageInfor.title" />
      <h2 class="mb-2 text-zinc-800 font-medium"></h2>
      <Editor
        :existingContent="editorContent"
        @contentChanged="onChange"
        v-if="editorContent.blocks.length > 0"
        title="Nội dung"
        class="mb-5"
      />
      <button-basic :handleClick="handleSubmit" class="self-end"
        >Cập nhật</button-basic
      >
    </div>
    <div
      class="
        flex flex-col
        w-[22rem]
        mt-[214px]
        items-center
        rounded-md
        border border-neutral-300
        h-fit
        p-5
      "
    >
      <h2 class="mb-7 text-stone-900 font-bold text-lg">Thiết lập bài viết</h2>
      <textbox class="mb-7" title="Slug" v-model="slug" />
      <textbox
        title="Meta description"
        v-model="blog.pageInfor.metaDescription"
      />
    </div>
  </div>
</template>

<script>
import Editor from "~/components/editor/Editor.vue";
import Textbox from "~/components/textbox/index.vue";
import ButtonBasic from "~/components/button-basic/index.vue";
import gql from "graphql-tag";

const getBlog = gql`
  query GetBlog($condition: BlogCollectionFilterInput) {
    blog(where: $condition) {
      id
      content
      pageInfor {
        title
        slug
        metaDescription
      }
      authorId
      author {
        id
        name
      }
    }
  }
`;

const updateBlog = gql`
  mutation UpdateBlog($input: UpdateBlogInput!) {
    updateBlog(input: $input) {
      string
    }
  }
`;

export default {
  components: { Editor, Textbox, ButtonBasic },
  apollo: {
    blog: {
      query() {
        return getBlog;
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
  },
  watch: {
    blog: function () {
      this.editorContent = JSON.parse(this.blog.content);
    },
  },
  data() {
    return {
      editorContent: { time: "", blocks: [], version: "2.22.2" },
      values: {
        pageInfor: {
          slug: "",
          title: "",
          metaDescription: "",
        },
        content: "",
        authorId: "61c52c3102484fd0faf91b50",
        blogId: "",
      },
    };
  },
  head() {
    return {
      script: [
        {
          once: true,
          hid: "s3-sdk",
          src: "https://sdk.amazonaws.com/js/aws-sdk-2.1095.0.min.js",
          body: true,
        },
      ],
    };
  },
  computed: {
    slug: function () {
      return `${this.blog.pageInfor.title
        .toLowerCase()
        .normalize("NFD")
        .replaceAll("đ", "d")
        .replace(/[\u0300-\u036f]|[^\w\s]/g, "")
        .split(" ")
        .join("-")}`;
    },
  },
  methods: {
    onChange(data) {
      this.editorContent = data;
    },
    handleSubmit() {
      // const ObjectId = ((
      //   m = Math,
      //   d = Date,
      //   h = 16,
      //   s = (s) => m.floor(s).toString(h)
      // ) =>
      //   s(d.now() / 1000) +
      //   " ".repeat(h).replace(/./g, () => s(m.random() * h)))();
      const urlModified = [];

      const imageUrlArray = this.editorContent.blocks
        .filter(
          (block) =>
            block.type === "image" && block.data.file.url.includes("blob")
        )
        .map((block) => ({
          id: block.id,
          url: block.data.file.url,
          file: block.data.file.file,
        }));

      AWS.config.update({
        accessKeyId: "8EL21GNHMRNZYW8488OV",
        secretAccessKey: "xBjwyBdSYz91ADgV9TH8oeTnAuZapmAJ8ycmrCiD",
        region: "hn",
        endpoint: "https://hn.ss.bfcplatform.vn",
        apiVersions: {
          s3: "2006-03-01",
        },
      });

      const uploadImageToS3 = (file, id) => {
        const s3 = new AWS.S3();

        var uploadParams = {
          Bucket: "weblisting",
          Key: `blog/${this.blog.id}/${file.name}`,
          Body: file,
          ACL: "public-read",
          ContentType: file.type,
        };

        var uploadOptions = {
          partSize: 10 * 1024 * 1024,
          queueSize: 1,
        };

        var upload = s3.upload(uploadParams, uploadOptions);

        upload.send((err, data) => {
          if (err) {
            console.error("Upload lỗi:", err);
          } else if (data) {
            console.log("Upload thành công:", data);
          }
        });

        urlModified.push({
          id,
          url: `https://weblisting.hn.ss.bfcplatform.vn/blog/${this.blog.id}/${file.name}`,
        });
        // upload.on("httpUploadProgress", function (evt) {
        //   var progress = parseInt((evt.loaded * 100) / evt.total);
        //   console.log(progress + "%");
        // });
      };

      imageUrlArray.map((img) => uploadImageToS3(img.file, img.id));

      const contentData = this.editorContent.blocks.map((block) => {
        urlModified.map((img) => {
          if (img.id === block.id) {
            block = {
              ...block,
              data: {
                ...block.data,
                file: {
                  url: img.url,
                },
              },
            };
          }
        });
        return block;
      });

      //FIXME: Data ở đây nha <3
      // const submitData = {
      //   ...this.values,
      //   blogId: ObjectId,
      //   pageInfor: {
      //     ...this.values.pageInfor,
      //     slug: this.slug,
      //   },
      //   content: JSON.stringify({ ...this.editorContent, blocks: contentData }),
      // };
      // console.log(submitData);
      this.$apollo
        .mutate({
          mutation: updateBlog,
          variables: {
            input: {
              blogId: this.blog.id,
              authorId: this.blog.authorId,
              content: JSON.stringify({
                ...this.editorContent,
                blocks: contentData,
              }),
              pageInfor: {
                title: this.blog.pageInfor.title,
                slug: this.slug,
                metaDescription: this.blog.pageInfor.metaDescription,
              },
            },
          },
        })
        .then((data) => {
          this.$toast.show("Đăng thành công!", {
            type: "success",
            theme: "bubble",
            duration: 3000,
            position: "top-right",
          });
        })
        .catch((error) => {
          this.$toast.show("Slug đã tồn tại", {
            type: "error",
            theme: "bubble",
            duration: 3000,
            position: "top-right",
          });
        });
    },
  },
};
</script>

<style lang="scss">
.ce-block {
  h1 {
    display: block;
    font-size: 2em;
    margin-top: 0.67em;
    margin-bottom: 0.67em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }

  h2 {
    display: block;
    font-size: 1.5em;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }

  h3 {
    display: block;
    font-size: 1.17em;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }

  h4 {
    display: block;
    font-size: 1em;
    margin-top: 1.33em;
    margin-bottom: 1.33em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }

  h5 {
    display: block;
    font-size: 0.83em;
    margin-top: 1.67em;
    margin-bottom: 1.67em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }

  h6 {
    display: block;
    font-size: 0.67em;
    margin-top: 2.33em;
    margin-bottom: 2.33em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }

  & img {
    margin: auto;
  }
}
</style>
