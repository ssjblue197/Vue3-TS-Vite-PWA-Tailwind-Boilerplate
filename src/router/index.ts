// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { flatten } from 'ramda';
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

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

  next();
});

export default router;
