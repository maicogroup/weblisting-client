<template>
  <div
    class="wrapper flex w-full flex-row justify-center px-5 sm:px-[15%] md:px-[23%]"
  >
    <div v-if="!content.blocks.length" class="m-auto h-500 p-2 w-full">
      <div class="mb-5">
        <div class="loading h-[60px] mb-4 bg-stone-500 rounded-3xl"></div>
        <span class="font-bold text-sm leading-4 text-stone-900">
          <div
            class="loading w-[50px] h-[16px] bg-stone-400 inline-block rounded-3xl"
          ></div>
          <div
            class="loading w-[50px] h-[16px] bg-stone-200 inline-block rounded-3xl"
          ></div>
          <span class="font-normal text-neutral-400"></span>
        </span>
      </div>
      <div class="w-full">
        <div
          class="loading w-[50%] h-[40px] mb-5 bg-stone-400 rounded-3xl"
        ></div>
        <div
          class="loading w-[100%] mb-5 h-[400px] bg-stone-200 rounded-3xl"
        ></div>
        <div
          class="loading w-[70%] h-[40px] mb-5 bg-stone-400 rounded-3xl"
        ></div>
        <div class="loading w-[100%] h-[400px] bg-stone-200 rounded-3xl"></div>
      </div>
    </div>
    <div
      v-if="content.blocks.length > 0"
      class="wrapper m-auto h-500 p-2 w-full"
    >
      <div class="mb-5">
        <h1>{{ blog.pageInfor.title }}</h1>
        <span class="font-bold text-sm leading-4 text-stone-900"
          >{{ blog.author.name }}
          <span class="font-normal text-neutral-400">{{
            `· ${blog.createdAt.substring(0, 10)}`
          }}</span>
        </span>
      </div>
      <show-editor :editorContent="content" />
      <divider class="my-5" />
      <div class="font-medium text-lg leading-6">
        <p class="mt-7 mb-5">Có thể bạn quan tâm:</p>
        <ul class="">
          <li>Hơn 90% team Công nghệ toàn mấy thằng lầy.</li>
          <li>Phát hiện chấn động: ăn cơm nhiều có thể khiến bạn no!</li>
          <li>
            Nếu lấy 50% dân số trái đất cộng 50% dân số trên trái đất sẽ ra toàn
            bộ dân số thế giới.
          </li>
          <li>Nhắm mắt lại thì thấy tối thui - dấu hiệu của bệnh trầm cảm?</li>
        </ul>
      </div>
      <div class="space-y-3 mt-5">
        <p>{{ totalItem }} bình luận</p>
        <new-comment v-model="newComment" :handleSubmit="createComment" />
        <div class="p-5 border rounded border-stone-200">
          <div v-for="comment in comments" :key="comment.id">
            <comment-component :comment="comment" :createReply="createReply" />
          </div>
        </div>
      </div>
    </div>
    <div class="sticky hidden sm:inline-flex flex-col top-1/2 p-3 h-fit">
      <p>Chia sẻ</p>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import ShowEditor from "~/components/editor/Show.vue";
import NewComment from "~/components/comment/new-comment.vue";
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

const getComment = gql`
  query GetComments(
    $condition: CommentCollectionFilterInput
    $order: [CommentCollectionSortInput!]
    $take: Int
    $skip: Int
  ) {
    commentsWithPagination(
      where: $condition
      order: $order
      take: $take
      skip: $skip
    ) {
      totalCount
      items {
        id
        commentParentId
        discussionId
        content
        createdAt
        author {
          authorName
        }
        replies {
          author {
            authorName
          }
          content
          createdAt
        }
      }
    }
  }
`;

const createComment = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      string
    }
  }
`;
export default {
  mounted() {
    this.content = JSON.parse(this.blog.content);
    if (this.blog.id != null) {
      console.log("haha");
      this.$apollo.queries.commentsWithPagination.refetch({
        condition: {
          discussionId: {
            eq: this.blog.id,
          },
        },
        order: {
          createdAt: "DESC",
        },
        take: 10,
        skip: 0,
      });
      this.hasId = true;
    }
  },
  apollo: {
    blog: {
      query: getBlog,
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
    commentsWithPagination: {
      query: getComment,
      variales() {
        return {
          condition: {
            discussionId: {
              eq: this.blog.id,
            },
          },
        };
      },
      skip() {
        return !this.hasId;
      },
      update: (data) => data.commentsWithPagination,
    },
  },
  data() {
    return {
      content: { blocks: [] },
      newComment: "",
      newReply: "",
      isStick: true,
      hasId: false,
      replyIsShow: false,
    };
  },
  computed: {
    totalItem() {
      if (this.commentsWithPagination == null) {
        return 0;
      }
      return this.commentsWithPagination.totalCount;
    },
    comments() {
      console.log("a");
      if (this.commentsWithPagination == null) {
        return [];
      } else {
        console.log(this.commentsWithPagination.items);
        return this.commentsWithPagination.items.map((item) => {
          return {
            id: item.id,
            commentParentId: item.commentParentId,
            dicussionId: item.discussionId,
            content: item.content,
            createdAt: item.createdAt,
            author: {
              authorName: item.author.authorName,
            },
            replies: item.replies,
          };
        });
      }
    },
  },
  methods: {
    createComment: function () {
      if (this.newComment != "") {
        const cmt = this.newComment;
        this.$apollo.mutate({
          mutation: createComment,
          variables: {
            input: {
              discussionId: this.blog.id,
              content: this.newComment,
              type: "Blog",
              author: {
                authorId: "623f0408bf28618e8d3eb0d7",
                authorName: "Đỗ Minh Nhật",
              },
            },
          },

          update: (store, { data: { createComment } }) => {
            const query = {
              query: getComment,
              variables: {
                condition: {
                  discussionId: {
                    eq: this.blog.id,
                  },
                },
                order: {
                  createdAt: "DESC",
                },
                take: 10,
                skip: 0,
              },
            };

            const { commentsWithPagination } = store.readQuery(query);

            var comment = {
              id: createComment.string,
              discussionId: this.blog.id,
              content: cmt,
              type: "Blog",
              commentParentId: "",
              author: {
                authorId: "623f0408bf28618e8d3eb0d7",
                authorName: "Đỗ Minh Nhật",
                __typename: "Author",
              },
              createdAt: Date.now().toString(),
              replies: [],
              __typename: "CommentCollection",
            };
            commentsWithPagination.items.unshift(comment);
            commentsWithPagination.totalCount += 1;

            store.writeQuery({
              ...query,
              data: { commentsWithPagination: commentsWithPagination },
            });
          },
        });
        this.$toast.show("Thêm thành công!", {
          type: "success",
          theme: "bubble",
          duration: 3000,
          position: "top-right",
        });
        // this.$apollo.queries.commentsWithPagination.refetch({
        //   condition: {
        //     discussionId: {
        //       eq: this.blog.id
        //     }
        //   },
        //   order: {
        //     createdAt: "DESC"
        //   }
        // })
        this.newComment = "";
        console.log(this.totalItem);
        console.log(this.comments);
      }
    },
    createReply(commentParentId, comment) {
      console.log(commentParentId);
      if (this.newReply != null) {
        this.$apollo.mutate({
          mutation: createComment,
          variables: {
            input: {
              discussionId: this.blog.id,
              content: comment,
              commentParentId: commentParentId,
              type: "Blog",
              author: {
                authorId: "623f0440bf28618e8d3eb0d8",
                authorName: "Cーちゃん",
              },
            },
          },
        });
        this.$toast.show("Thêm thành công!", {
          type: "success",
          theme: "bubble",
          duration: 3000,
          position: "top-right",
        });
        this.replyIsShow = false;
        this.$apollo.queries.commentsWithPagination.refetch({
          condition: {
            discussionId: {
              eq: this.blog.id,
            },
          },
          order: {
            createdAt: "DESC",
          },
        });
      }
    },
  },
  components: { ShowEditor, NewComment },
};
</script>

<style lang="scss" scoped>
html {
  position: relative;
}

h1 {
  font-family: "Source Serif Pro";
  font-style: normal;
  font-weight: 700;
  font-size: 41px;
  line-height: 51px;
  text-align: center;

  /* stone-900 */

  color: #1c1917;
}

ul {
  list-style-type: disc;
  list-style-position: inside;
}

ul li {
  color: cornflowerblue;
}

textarea {
  width: 83%;
  height: 60px;
  padding: 12px 10px;
  box-sizing: border-box;
  border: 1px solid #e7e5e4;
  border-radius: 5px;
  background-color: #ffffff;
  font-size: 16px;
  resize: none;
}
input {
  width: 83%;
  height: 60px;
  padding-inline: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}

.loading {
  opacity: 0.5;
  animation: fade-in 0.8s infinite ease alternate;
}

.wrapper {
  opacity: 0;
  animation: fade-in 0.5s 1 forwards ease-out;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>
