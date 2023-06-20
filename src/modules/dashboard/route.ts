import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./views/DashboardPage.vue'),
    meta: {
      layout: 'default',
      breadcrumbs: [
        {
          name: 'Dashboard',
        },
      ],
    },
  },
] as RouteRecordRaw[];
