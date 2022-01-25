import Vue from 'vue';
import Router from 'vue-router';

import PostList from '~/pages/listing/index';
import DetailPost from '~/pages/detail/index'
import EditProject from "~/pages/edit-project/index";


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
        path: '/chinh-sua-du-an',
        component: EditProject
      }
    ]
  });
}
