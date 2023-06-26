import { defineStore } from 'pinia';
import type { Employee } from '@/modules/fullfill-request/types';
import { login } from '@/api/auth';
import type { AuthParams } from '@/api/auth';
import axios from 'axios';

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
        console.log(data);
        
        this.employee = data?.data;
        return data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
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