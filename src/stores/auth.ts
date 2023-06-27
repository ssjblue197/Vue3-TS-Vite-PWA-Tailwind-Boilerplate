import { defineStore } from 'pinia';
import type { Employee } from '@/modules/fullfill-request/types';
import { login } from '@/api/auth';
import type { AuthParams } from '@/api/auth';
import { useNotificationStore } from  '@/stores/notification';
import axios from 'axios';

const notificationStore = useNotificationStore();
export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      employee: null as Employee | null,
    }
  },
  actions: {
    async login(payload: AuthParams) {
      try {
        const { data } = await login(payload);
        this.employee = data;
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          notificationStore.showMessage({
            title: 'Login failed!',
            message: error?.response?.data?.message
          });
        }
      }
    }
  },
  persist: {
    storage: localStorage,
    key: "auth-storage-pod-app",
    // paths: [] /*Define states can persisted*/
  },
});