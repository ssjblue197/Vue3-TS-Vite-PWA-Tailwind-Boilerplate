import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/LoginPage.vue'),
    meta: {
      layout: 'auth',
    },
  },
] as RouteRecordRaw[];
