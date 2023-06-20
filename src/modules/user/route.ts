import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/user',
    name: 'user',
    component: () => import('./views/UserListPage.vue'),
    meta: {
      layout: 'default',
      breadcrumbs: [
        {
          name: 'User',
        },
      ],
    },
  },
] as RouteRecordRaw[];
