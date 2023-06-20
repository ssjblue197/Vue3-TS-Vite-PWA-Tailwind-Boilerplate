import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/role',
    name: 'role',
    component: () => import('./views/RoleListPage.vue'),
    meta: {
      layout: 'default',
      breadcrumbs: [
        {
          name: 'Role',
        },
      ],
    },
  },
] as RouteRecordRaw[];
