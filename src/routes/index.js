import React from 'react';
import Loadable from 'components/Loadable';
//import Admin from './admin/';

import Login from './login/';

import Designer from './designer/';
import Home from './home/';
// const Home = () => <div>Home</div>;

const AsyncAdmin = Loadable({
  loader: () => import(/* webpackChunkName: "admin" */'./admin/')
});
const AsyncUI = Loadable({
  loader: () => import(/* webpackChunkName: "ui" */'./ui/')
});
const routes = [
  {
    exact: true,
    path: '/',
    component: Login,
  },
  {
    name: "网站管理",
    path: '/admin',
    component: AsyncAdmin
  },
  {
    name: "UI规范",
    path: '/ui',
    component: AsyncUI
  },
  {
    name: "设计器",
    path: '/designer',
    component: Designer
  },
  {
    exact: true,
    path: '/home',
    component: Home,

  }


];
export  default routes;
