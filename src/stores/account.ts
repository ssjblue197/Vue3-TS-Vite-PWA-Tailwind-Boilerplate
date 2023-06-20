import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

import { type AuthParams, login, me } from "@/api/auth";
import type { AxiosError } from "axios";
import axios from "axios";
import http from "@/api/http";
import router from "@/router";
import { flatten } from "@/utils/flatten";

export interface Permission {
  id: number;
  display_name?: string;
  guard_name?: string;
  name: string;
  parent_id?: string;
  children?: Permission[];
  active?: boolean;
}

export interface UserPermission {
  is_superadmin: boolean;
  permissions: string[];
}

export type Profile = {
  id?: number;
  name: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  permissions?: Permission[];
  is_superadmin?: boolean;
};

export type Account = {
  profile?: Profile;
};

const toast = useToast();

const initAccount: Account = {
  profile: {
    name: "",
    token: undefined,
  },
};

export const useAccountStore = defineStore({
  id: "account",
  state: () => initAccount,
  getters: {
    isLogged: (state) => Boolean(state.profile?.token),
    userPermission: (state): UserPermission => {
      const permissions = state?.profile?.permissions || [];
      const isSupperAdmin = state.profile?.is_superadmin || false;
      if (!permissions?.length) {
        return {
          is_superadmin: isSupperAdmin,
          permissions: [],
        };
      }
      let convertedPermissions: string[] = [];
      for (let i = 0; i < permissions.length; i++) {
        convertedPermissions = [
          ...convertedPermissions,
          ...flatten<Permission>(permissions[i]).map(
            (item: Permission) => item.name
          ),
        ];
      }
      return {
        is_superadmin: isSupperAdmin,
        permissions: convertedPermissions,
      };
    },
  },
  actions: {
    async login(params: AuthParams) {
      try {
        const { data: responseData } = await login(params);
        const { data } = responseData;

        if (!data.token) return;

        this.profile = {
          name: "",
          token: data.token,
        };
        http.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        await this.getProfile();
        toast.success(data.message);
        router.push("/");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.error?.message ?? "");
        } else console.error(error);
      }
    },
    logout() {
      this.profile = undefined;
    },
    async getProfile() {
      try {
        const { data: responseData } = await me();
        const { data } = responseData;
        this.profile = {
          ...this.profile,
          name: data.first_name + " " + data.last_name,
          firstName: data.first_name,
          lastName: data.last_name,
          permissions: data.permissions,
          id: data.id,
          is_superadmin: data.is_superadmin,
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            (error as AxiosError<{ error: string }>).response?.data?.error ??
              error.message
          );
        } else console.error(error);
      }
    },
  },
  persist: {
    key: "account",
  },
});
