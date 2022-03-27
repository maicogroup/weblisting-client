<template>
  <div style="">
    <div class="wrapper m-auto border border-zinc-500 w-1/2 p-2">
      <show-editor :editorContent="editorContent" />
      <div class="share" :class="{ stick: !isStick }">oke oke</div>
      <!-- {{blog}} -->
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import ShowEditor from "~/components/editor/Show.vue";
const editorContent = {
  time: 1648348627510,
  blocks: [
    {
      id: "_bPq9GmmKI",
      type: "header",
      data: {
        text: "Editor.js",
        level: 1,
      },
    },
    {
      id: "ClvkRJ4NXI",
      type: "paragraph",
      data: {
        text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
      },
    },
    {
      id: "f8uFco0olo",
      type: "header",
      data: {
        text: "Key features",
        level: 3,
      },
    },
    {
      id: "BpkGTadmYa",
      type: "list",
      data: {
        style: "unordered",
        items: [
          "It is a block-styled editor",
          "It returns clean data output in JSON",
          "Designed to be extendable and pluggable with a simple API",
        ],
      },
    },
    {
      id: "HAUkskNnjT",
      type: "header",
      data: {
        text: "What does it mean «block-styled editor»",
        level: 3,
      },
    },
    {
      id: "REa5Gat-gF",
      type: "paragraph",
      data: {
        text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
      },
    },
    {
      id: "cdkSdNkzKE",
      type: "paragraph",
      data: {
        text: 'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.',
      },
    },
    {
      id: "GOHBphKJPW",
      type: "header",
      data: {
        text: "What does it mean clean data output",
        level: 3,
      },
    },
    {
      id: "J19k0K0dKX",
      type: "paragraph",
      data: {
        text: "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below",
      },
    },
    {
      id: "dk8hxghEoC",
      type: "paragraph",
      data: {
        text: 'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.',
      },
    },
    {
      id: "Vx5hOHG63h",
      type: "paragraph",
      data: {
        text: "Clean data is useful to sanitize, validate and process on the backend.",
      },
    },
    {
      id: "q8vFefjLWx",
      type: "delimiter",
      data: {},
    },
    {
      id: "5135zdy565",
      type: "paragraph",
      data: {
        text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
      },
    },
    {
      id: "gI-oIenZN-",
      type: "image",
      data: {
        file: {
          url: "https://codex.so/public/app/img/external/codex2x.png",
        },
        caption: "",
        withBorder: false,
        stretched: false,
        withBackground: false,
      },
    },
  ],
  version: "2.23.1",
};
const getBlog = gql`
  query GetBlog($condition: BlogCollectionFilterInput) {
    blog(where: $condition) {
      id
      content
      createdAt
      pageInfor {
        title
        slug
        metaDescription
      }
      status
      authorId
      author {
        name
        phoneNumber
        email
      }
    }
  }
`;

export default {
  mounted() {
    //console.log(this.$route.params.slug);
    //this.c = JSON.parse(this.blog.content);
    //console.log(this.c);

    //hadnle scroll\
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  //apollo: {
    //blog: {
      //query: getBlog,
      //variables() {
        //return {
          //condition: {
            //pageInfor: {
              //slug: {
                //eq: this.$route.params.slug,
              //},
            //},
          //},
        //};
      //},
    //},
  //},
  data() {
    return {
      isStick: true,
      editorContent,
      a,
      b: "",
      c: {},
    };
  },
  methods: {
    handleScroll(event) {
      const scrollCheck = window.innerHeight - window.scrollY;
      console.log(scrollCheck);
      if (scrollCheck <= 160) {
        this.isStick = false;
        console.log("set false");
      } else {
        console.log("set true");
        this.isStick = true;
      }
    },
  },
  components: { ShowEditor },
};
</script>

<style lang="scss" scoped>
.share {
  position: fixed;
  top: 50%;
  left: 75%;
  transform: translateX(100%) translateY(-50%);
  height: 250px;
  width: 50px;
  background-color: #000;
}
html {
  position: relative;
}
.stick {
  position: absolute;
  left: 75%;
  transform: translateX(100%) translateY(-50%);
  top: calc(100% - 360px);
}
</style>