import Vue from 'vue';
import Router from 'vue-router';

import EditPost from '~/pages/postQueue/edit-post/index';
import PostQueuePage from '~/pages/postQueue/index';
import PostList from '~/pages/listing/index';
import DetailPost from '~/pages/listing/detail/index';
import ProductReview from '~/pages/product-preview/index';
import SpecificProjectReview from '~/pages/product-preview/specific-project/index';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
      // always scroll to top
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    routes: [
      {
        path: '/',
        redirect: '/danh-sach-can-ho/ban-thue-can-ho-chung-cu-the-sun-avenue'
      },
      {
        path: '/chinh-sua-tin-dang/:slug',
        component: EditPost
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
        path: '/review-san-pham',
        component: ProductReview
      },
      {
        path: '/review-san-pham/:slug',
        component: SpecificProjectReview
      }
    ]
  });
}
