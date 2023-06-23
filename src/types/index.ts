import type { ConfigType, Dayjs, OptionType } from "dayjs";
// import type { PermissionPlugin } from "@/plugins/permission";
import type { IconPlugin } from "@/plugins/icon";
import type { DisplayPlugin } from "@/plugins/display";
import type { FormPlugin } from "@/plugins/form";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $dayJS(date?: ConfigType, option?: OptionType, locale?: string): Dayjs;
    // $permission: PermissionPlugin;
    $icon: IconPlugin;
    $display: DisplayPlugin;
    $form: FormPlugin;
  }
}

export {};
