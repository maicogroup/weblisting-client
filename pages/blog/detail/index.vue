<template>
  <div style="">
    <div class="wrapper m-auto h-500 border border-zinc-200 w-1/2 p-2">
      <div class="mb-5">
        {{ blog.id }}
        {{ comments.length }}
        <h1>{{ blog.pageInfor.title }}</h1>
        <span class="font-bold text-sm leading-4 text-stone-900">{{
          blog.author.name
        }}</span>
        ·
        <span class="font-normal text-sm leading-4 text-neutral-400">{{
          blog.createdAt.substring(0, 10)
        }}</span>
      </div>
      <show-editor :editor-content="content" />
      <divider class="my-5" />
      <div class="font-medium text-lg leading-6">
        <p class="mt-7 mb-5">
          Có thể bạn quan tâm:
        </p>
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
        <div class="flex items-start justify-between space-x-2">
          <input
            id="myInput"
            v-model="newComment"
            type="text"
            placeholder="Mời bạn để lại bình luận"
          >
          <button
            id="createComment"
            class="bg-green-600 px-5 py-2 text-white"
            style="border-radius: 5px"
            @click="createComment"
          >
            Bình luận
          </button>
        </div>
        <div class="p-5 border rounded border-stone-200">
          <div v-for="comment in comments" :key="comment.id">
            <template v-if="comment.commentParentId == null">
              <p class="text-base font-bold leading-4">
                {{ comment.author.authorName }}
              </p>
              <span>{{ comment.content }}</span>
              <div class="flex items-start justify-start space-x-2">
                <span class="text-sky-500" @click="replyIsShow = true">Trả lời</span>
                <p>·</p>
                <span>{{ comment.createdAt.substring(0, 10) }}</span>
              </div>
              <div v-if="replyIsShow" class="flex items-start justify-between space-x-2">
                <input
                  id="myInput"
                  v-model="newReply"
                  type="text"
                  placeholder="Mời bạn để lại bình luận"
                >
                <button
                  id="createComment"
                  class="bg-green-600 px-5 py-2 text-white"
                  style="border-radius: 5px"
                  @click="createReply(comment.id)"
                >
                  Bình luận
                </button>
              </div>
              <div
                v-if="comment.replies.length > 0"
                class="p-2 ml-5 my-3 border rounded bg-slate-50"
              >
                <div v-for="reply in comment.replies" :key="reply.id">
                  <div class="flex items-start justify-start space-x-2">
                    <p class="text-base font-bold">
                      {{ reply.author.authorName }}
                    </p>
                    <p>·</p>
                    <span>{{ reply.createdAt.substring(0, 10) }}</span>
                  </div>
                  <p>{{ reply.content }}</p>
                  <divider class="mb-2" />
                </div>
              </div>

              <divider class="my-3" />
            </template>
          </div>
        </div>
      </div>

      <!-- <div class="share" :class="{ stick: !isStick }">oke oke</div> -->
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ShowEditor from '~/components/editor/Show.vue';
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
    commentsWithPagination(where: $condition, order: $order, take: $take, skip: $skip) {
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
  components: { ShowEditor },
  data () {
    return {
      content: {},
      newComment: '',
      newReply: '',
      isStick: true,
      hasId: false,
      replyIsShow: false
    };
  },
  computed: {
    totalItem () {
      if (this.commentsWithPagination == null) {
        return 0;
      }
      return this.commentsWithPagination.totalCount;
    },
    comments () {
      console.log('a');
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
              authorName: item.author.authorName
            },
            replies: item.replies
          };
        });
      }
    }
  },
  mounted () {
    // console.log(this.$route.params.slug);
    this.content = JSON.parse(this.blog.content);
    if (this.blog.id != null) {
      console.log('haha');
      this.$apollo.queries.commentsWithPagination.refetch({
        condition: {
          discussionId: {
            eq: this.blog.id
          }
        },
        order: {
          createdAt: 'DESC'
        },
        take: 10,
        skip: 0
      });
      this.hasId = true;
    }
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  apollo: {
    blog: {
      query: getBlog,
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
    },
    commentsWithPagination: {
      query: getComment,
      variales () {
        return {
          condition: {
            discussionId: {
              eq: this.blog.id
            }
          }
        };
      },
      skip () {
        return !this.hasId;
      },
      update: data => data.commentsWithPagination
    }
  },
  methods: {
    handleScroll (event) {
      const scrollCheck = window.innerHeight - window.scrollY;
      // console.log(scrollCheck);
      if (scrollCheck <= 160) {
        this.isStick = false;
        // console.log("set false");
      } else {
        // console.log("set true");
        this.isStick = true;
      }
    },
    createComment () {
      if (this.newComment != '') {
        const cmt = this.newComment;
        this.$apollo.mutate({
          mutation: createComment,
          variables: {
            input: {
              discussionId: this.blog.id,
              content: this.newComment,
              type: 'Blog',
              author: {
                authorId: '623f0408bf28618e8d3eb0d7',
                authorName: 'Đỗ Minh Nhật'
              }
            }
          },

          update: (store, { data: { createComment } }) => {
            const query = {
              query: getComment,
              variables: {
                condition: {
                  discussionId: {
                    eq: this.blog.id
                  }
                },
                order: {
                  createdAt: 'DESC'
                },
                take: 10,
                skip: 0
              }
            };

            const { commentsWithPagination } = store.readQuery(query);

            const comment = {
              id: createComment.string,
              discussionId: this.blog.id,
              content: cmt,
              type: 'Blog',
              commentParentId: '',
              author: {
                authorId: '623f0408bf28618e8d3eb0d7',
                authorName: 'Đỗ Minh Nhật',
                __typename: 'Author'
              },
              createdAt: Date.now().toString(),
              replies: [],
              __typename: 'CommentCollection'
            };
            commentsWithPagination.items.unshift(comment);
            commentsWithPagination.totalCount += 1;

            store.writeQuery({ ...query, data: { commentsWithPagination } });
          }

        });
        this.$toast.show('Thêm thành công!', {
          type: 'success',
          theme: 'bubble',
          duration: 3000,
          position: 'top-right'
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
        this.newComment = '';
        console.log(this.totalItem);
        console.log(this.comments);
      }
    },
    createReply (commentParentId) {
      console.log(commentParentId);
      if (this.newReply != null) {
        this.$apollo.mutate({
          mutation: createComment,
          variables: {
            input: {
              discussionId: this.blog.id,
              content: this.newReply,
              commentParentId,
              type: 'Blog',
              author: {
                authorId: '623f0440bf28618e8d3eb0d8',
                authorName: 'Cーちゃん'
              }
            }
          }
        });
        this.$toast.show('Thêm thành công!', {
          type: 'success',
          theme: 'bubble',
          duration: 3000,
          position: 'top-right'
        });
        this.replyIsShow = false;
        this.newReply = '';
        this.$apollo.queries.commentsWithPagination.refetch({
          condition: {
            discussionId: {
              eq: this.blog.id
            }
          },
          order: {
            createdAt: 'DESC'
          }
        });
      }
    }
  }
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
</style>
