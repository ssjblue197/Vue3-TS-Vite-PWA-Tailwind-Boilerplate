import type { App, Plugin } from "vue";
import type { UserPermission } from "@/stores/account";

const state: { userPermission: UserPermission | undefined } = {
  userPermission: undefined,
};

const can = (
  permissions: string | string[],
  userPermission?: UserPermission | undefined
): boolean => {
  if (state.userPermission !== undefined) {
    userPermission = state.userPermission;
  }

  if (userPermission === undefined) {
    throw new Error("User not permission");
  }

  if (userPermission.is_superadmin) {
    return true;
  }
  const newUserPermission = [...userPermission.permissions];

  if (!permissions?.length) return false;
  if (typeof permissions === "string") {
    permissions = [permissions];
  }

  let count = 0;
  for (let i = 0; i <= permissions.length; i++) {
    const permission = permissions[i];
    const index = newUserPermission.findIndex((item) => item === permission);
    if (index !== -1) {
      count++;
      newUserPermission.splice(index, 1);
    }
  }

  return count === permissions.length;
};

const canNot = (
  permissions: string | string[],
  userPermission?: UserPermission | undefined
): boolean => {
  return !can(permissions, userPermission);
};

type ParamsFunc = (
  permissions: string | string[],
  userPermission?: UserPermission | undefined
) => boolean;

export interface PermissionPlugin {
  setUserPermission: (newUserPermission: UserPermission | undefined) => void;
  can: ParamsFunc;
  canNot: ParamsFunc;
}

const permission: PermissionPlugin = {
  setUserPermission: (newUserPermission) => {
    state.userPermission = newUserPermission;
  },
  can,
  canNot,
};

export default {
  install: (app: App) => {
    app.config.globalProperties.$permission = permission;
    app.provide("permission", permission);
  },
} as Plugin;
