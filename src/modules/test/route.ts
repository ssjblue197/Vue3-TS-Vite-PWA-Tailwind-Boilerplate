import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/test',
    name: 'test',
    component: () => import('./views/Index.vue'),
    meta: {
      layout: 'default',
    },
  },
] as RouteRecordRaw[];
