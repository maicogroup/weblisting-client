import Vue from 'vue';
import Router from 'vue-router';

import EditPost from '~/pages/postQueue/edit-post/index';
import EditPost from '~/pages/edit-post/index';
import PostQueuePage from '~/pages/postQueue/index';
import PostList from '~/pages/listing/index';
import DetailPost from '~/pages/detail/index'


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
        path: '/chi-tiet-can-ho/:slug',
        component: DetailPost
      }
    ]
  });
}
