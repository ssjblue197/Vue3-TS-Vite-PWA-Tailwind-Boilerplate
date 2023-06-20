// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { App } from "vue";
const svgIcons = import.meta.glob("@/assets/**/svg-icon/**/*.svg", {
  eager: true,
});

const handle = (app: App) => {
  Object.entries(svgIcons).forEach(([path, definition]) => {
    const svgName = path
      .split("/")
      .pop()
      ?.replace(/\.\w+$/, "")
      ?.replaceAll("-", " ")
      ?.replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase())
      ?.replaceAll(" ", "");

    app.config.globalProperties["icon" + svgName] = definition.default;
    // EX: dashboard -> iconDashboard, t-shirt -> iconTShirt
  });
};

export default handle;
