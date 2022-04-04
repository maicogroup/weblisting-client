import Vue from "vue";
import Router from "vue-router";

import EditPost from '~/pages/post-queue/edit-post/index';
import PostQueuePage from '~/pages/post-queue/index';
import PostList from '~/pages/listing/index';
import EditProject from '~/pages/edit-project/index';
import DetailPost from '~/pages/listing/detail/index';
import ProductReview from '~/pages/product-preview/index';
import ProjectOverview from '~/pages/project-overview/index';
import SpecificProjectReview from '~/pages/product-preview/specific-project/index';
import HomePage from '~/pages/home/index';
import ProjectReview from '~/pages/project-review/index';
import BlogPage from '~/Pages/blog/index';
import DetailBlog from '~/pages/blog/detail/index';
import CreateBlog from '~/pages/blog/create/index';
import UpdateBlog from '~/pages/blog/update/index';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
      // always scroll to top
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    routes: [
      {
        path: "/",
        component: HomePage,
      },
      {
        path: "/chinh-sua-tin-dang/:slug",
        component: EditPost,
      },
      {
        path: '/du-an/:slug',
        component: ProjectOverview

      },
      {
        path: "/danh-sach-cho",
        component: PostQueuePage,
      },
      {
        path: "/chi-tiet-can-ho/:slug",
        component: DetailPost,
      },
      {
        path: "/chinh-sua-du-an",
        component: EditProject,
      },
      {
        path: "/review-san-pham",
        component: ProductReview,
      },
      {
        path: "/review-san-pham/:slug",
        component: SpecificProjectReview,
      },
      {
        path: "/blog/:slug",
        component: DetailBlog,
      },
      {
        path: '/blog',
        component: BlogPage
      },
      {
        path: "/blog/khoi-tao/bai-viet",
        component: CreateBlog,
      },
      {
        path: "/blog/khoi-tao/:slug",
        component: UpdateBlog
      },
      {
        path: '/review-du-an/:slug',
        component: ProjectReview
      },
      {
        path: '/danh-sach-san-pham',
        component: PostList
      },
      {
        path: '*',
        component: PostList
      },
    ],
  });
}
