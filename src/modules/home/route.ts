import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('./views/Index.vue'),
    meta: {
      layout: 'default',
    },
  },
] as RouteRecordRaw[];
