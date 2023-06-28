import { defineStore } from 'pinia';
import type { Employee } from '@/modules/fullfill-request/types';
import { login } from '@/api/auth';
import type { AuthParams } from '@/api/auth';
import { useNotificationStore } from  '@/stores/notification';
import axios from 'axios';
import { getErrorMessage } from '@/utils/helper';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      employee: null as Employee | null,
      time_checking_id: null as number | null
    }
  },
  actions: {
    async login(payload: AuthParams) {
      const notificationStore = useNotificationStore();
      try {
        const { data } = await login(payload);
        this.employee = data?.employee || null;
        this.time_checking_id = data?.time_checking_id || null;
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          notificationStore.showMessage({
            title: 'Scanning Error!',
            message: getErrorMessage(error)
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