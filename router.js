import Vue from 'vue';
import Router from 'vue-router';

import PostList from '~/pages/listing/index';
import DetailPost from '~/pages/detail/index';
import ProductReview from '~/pages/product-preview/index';
import SpecificProjectReview from '~/pages/product-preview/specific-project/index';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/danh-sach-can-ho/ban-thue-can-ho-chung-cu-the-sun-avenue'
      },
      {
        path: '/danh-sach-can-ho/:slug',
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
