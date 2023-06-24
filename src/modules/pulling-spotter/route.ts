import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/pulling-spotter',
    name: 'pulling-spotter',
    component: () => import('./views/Index.vue'),
    meta: {
      layout: 'main',
      previousRoute: 'home',
      previousRouteTitle: 'function list',
      routeTitle: 'Pulling Inventory Spotter'
    },
  },
] as RouteRecordRaw[];
