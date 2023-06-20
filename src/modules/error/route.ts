import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/403',
    name: 'forbidden',
    component: () => import('./views/ForbiddenPage.vue'),
    meta: {
      layout: 'default',
      breadcrumbs: [
        {
          name: 'Forbidden',
        },
      ],
    },
  },
  {
    path: '/:path(.*)',
    component: () => import('./views/NotFoundPage.vue'),
    name: 'notfound',
    meta: {
      layout: 'default',
      breadcrumbs: [
        {
          name: 'NotFound',
        },
      ],
    },
  },
] as RouteRecordRaw[];
