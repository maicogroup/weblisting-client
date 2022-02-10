import Vue from 'vue';
import Router from 'vue-router';

import EditPost from '~/pages/edit-post/index';
import PostQueuePage from '~/pages/postQueue/index';
import PostList from '~/pages/listing/index';
import DetailPost from '~/pages/detail/index';
import Home from '~/pages/home/index';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Home
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
