import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/picking-up',
    name: 'picking-up',
    component: () => import('./views/Index.vue'),
    meta: {
      layout: 'main',
      hideNavigate: true,
      routeTitle: 'Picking up',
    },
  },
] as RouteRecordRaw[];
