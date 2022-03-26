import Vue from 'vue';
import Router from 'vue-router';

import EditPost from '~/pages/post-queue/edit-post/index';
import PostQueuePage from '~/pages/post-queue/index';
import PostList from '~/pages/listing/index';
import EditProject from '~/pages/edit-project/index';
import DetailPost from '~/pages/listing/detail/index';
import ProductReview from '~/pages/product-preview/index';
import ProjectOverview from '~/pages/project-overview/index';
import SpecificProjectReview from '~/pages/product-preview/specific-project/index';
import HomePage from '~/pages/home/index';
import BlogPage from '~/Pages/blog-overview/index';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
      // always scroll to top
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    routes: [
      {
        path: '/',
        component: HomePage
      },
      {
        path: '/chinh-sua-tin-dang/:slug',
        component: EditPost

      },
      {
        path: '/tong-quan-du-an/:slug',
        component: ProjectOverview

      },
      {
        path: '/danh-sach-cho',
        component: PostQueuePage
      },
      {
        path: '/danh-sach-can-ho/:slug',
        component: PostList
      },
      {
        path: '/danh-sach-can-ho',
        component: PostList
      },
      {
        path: '/chi-tiet-can-ho/:slug',
        component: DetailPost
      },
      {
        path: '/chinh-sua-du-an',
        component: EditProject
      },
      {
        path: '/review-san-pham',
        component: ProductReview
      },
      {
        path: '/review-san-pham/:slug',
        component: SpecificProjectReview
      },
      {
        path: '/blog-overview',
        component: BlogPage
      }
    ]
  });
}
