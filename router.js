import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '~/pages/index';
import EditPost from '~/pages/edit-post/index';
import PostQueuePage from '~/pages/postQueue/index';

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: HomePage
      },
      {
        path: '/chi-tiet-chinh-sua/slug',
        component: EditPost
      },
      {
        path: '/danh-sach-cho',
        component: PostQueuePage
      }
    ]
  });
}
