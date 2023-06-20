import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string;
    group?: string;
    breadcrumbs?: BreadcrumbItem[];
  }

  interface BreadcrumbItem {
    name: string;
    active?: boolean;
    router?: {
      name: string;
    };
  }
}
