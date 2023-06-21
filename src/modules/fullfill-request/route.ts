import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/fullfill-request',
    name: 'fullfill-request',
    component: () => import('./views/Index.vue'),
    meta: {
      layout: 'main',
      previousRoute: 'home',
      previousRouteTitle: 'function list',
      routeTitle: 'Fullfill request'
    },
  },
] as RouteRecordRaw[];
