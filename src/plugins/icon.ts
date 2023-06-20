import type { App, Plugin } from "vue";

import { getCurrentInstance } from "vue";

const render = (iconName: string) => {
  return getCurrentInstance()?.appContext.config.globalProperties[iconName];
};

export interface IconPlugin {
  render: (iconName: string) => string;
}

const icon: IconPlugin = {
  render,
};

export default {
  install: (app: App) => {
    app.config.globalProperties.$icon = icon;
    app.provide("icon", icon);
  },
} as Plugin;
