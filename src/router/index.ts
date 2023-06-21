// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { flatten } from 'ramda';
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

import { useAccountStore } from '@/stores/account';

import http from '@/api/http';
import { acceptRouteNames } from '@/utils/sidebar';

const routes = import.meta.glob('@/modules/**/route.ts', { eager: true });

const convertRoutes = flatten(
  Object.keys(routes).map((item) => routes[item].default)
).map((route) => {
  const routeMeta = route.meta || {};
  const layout = routeMeta.layout || '';
  if (!layout) {
    routeMeta.layout = 'default';
  }
  return {
    ...route,
    meta: routeMeta,
  } as RouteRecordRaw;
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: convertRoutes,
  scrollBehavior() {
    const element = document.getElementById('main');
    if (element?.scrollTop > 0) {
      element.scrollTop = 0;
    }
    return;
  },
});

router.beforeEach((to, from, next) => {
  // const account = useAccountStore();
  // const { userPermission } = useAccountStore();

  // if (to.path === '/logout') account.logout();

  // const authRequired = !['/login'].includes(to.path);

  // const token = account.profile?.token;
  // if (authRequired && !token) {
  //   return next('/login');
  // }

  // if (!authRequired && token) {
  //   return next('/');
  // }

  // if (token) http.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  // if (account.profile?.is_superadmin || ['dashboard'].includes(to.name)) {
  //   return next();
  // }

  // if (
  //   !acceptRouteNames(userPermission).includes(to.name) &&
  //   !['login', 'forbidden', 'notfound'].includes(to.name)
  // ) {
  //   return next('/403');
  // }

  next();
});

export default router;
