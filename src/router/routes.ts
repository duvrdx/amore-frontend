import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name: 'home', path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/checkout',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name: 'checkout',path: '', component: () => import('pages/CartCheckout.vue') }],
  },
  {
    path: '/account',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'login',path: 'login', component: () => import('pages/LoginUser.vue') },
      { name: 'register',path: 'register', component: () => import('pages/RegisterUser.vue') },
      { name: 'logout',path: 'logout', component: () => import('pages/UserProfile.vue') },
    ],

  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
