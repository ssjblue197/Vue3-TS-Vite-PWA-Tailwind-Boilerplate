import type { App, Plugin } from "vue";

const formatNumber = (number: number, toFixed = 0): string => {
  if (!number) return "0";

  let newNumber = number
    .toFixed(toFixed)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  newNumber = newNumber.replace(/(\.\d*?[1-9])0+|\.0+$/g, "$1");

  if (newNumber.endsWith(".")) {
    newNumber = newNumber.slice(0, -1);
  }

  return newNumber;
};

export interface DisplayPlugin {
  formatNumber: (number: number, toFixed?: number) => string;
}

const display: DisplayPlugin = {
  formatNumber,
};

export default {
  install: (app: App) => {
    app.config.globalProperties.$display = display;
    app.provide("display", display);
  },
} as Plugin;
