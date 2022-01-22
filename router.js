import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '~/pages/index';
import ListingPage from '~/pages/listing/index';
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
        path: '/danh-sach-can-ho/:slug',
        component: ListingPage
      },
      {
        path: '/danh-sach-cho',
        component: PostQueuePage
      }
    ]
  });
}
