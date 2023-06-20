import { inject, type App, type Plugin } from "vue";

import dayjs from "dayjs";
import { Dayjs, type ConfigType, type OptionType } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.prototype.formatLocalDate = function () {
  return this.utc().local().format("lll");
};

declare module "dayjs" {
  interface Dayjs {
    formatLocalDate(): string;
  }
}

interface DayJS {
  (date?: ConfigType, option?: OptionType, locale?: string): Dayjs;
}

export const useDayJS = () => {
  return inject<DayJS>("dayJS", dayjs);
};

export default {
  install: (app: App) => {
    app.config.globalProperties.$dayJS = dayjs;
    app.provide("dayJS", dayjs);
  },
} as Plugin;
