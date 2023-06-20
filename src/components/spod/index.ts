// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { App } from "vue";

const components = import.meta.glob("./**/*.vue", { eager: true });

const handle = (app: App) => {
  Object.entries(components).forEach(([path, definition]) => {
    const componentName = path
      .split("/")
      .pop()
      ?.replace(/\.\w+$/, "");

    componentName && app.component(`S${componentName}`, definition.default);
  });
};
export default handle;
