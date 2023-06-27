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
      employee: {
        "id": 1,
        "name": "Thi Nga Cao",
        "email": "1@gmail.com",
        "address_1": null,
        "address_2": null,
        "phone": "1",
        "created_at": null,
        "updated_at": "2023-06-22 15:54:34",
        "warehouse_id": 1,
        "department": "Pulling",
        "job_title": "Pulling Assistant Leader",
        "code": "10170",
        "is_deleted": 0,
        "performance_report": 1,
        "is_resize_image": 1,
        "avatar": "avatar/employee/10170.jpg",
        "is_leader": 0,
        "token_fcm": "dJo_nJ80mwlYRg4OO_TZVt:APA91bG4fyrB-sGs9EKo3nS5MJMGoWHL8-PvDiwItVQolGj7OnNX5FmaWBU8UsTnPuzs6tSZWj9W6Zl2eOU8yCd-F8CKnjBiy7_3-nCfeiosPgOjdb33ja7m4z8xgXjq8Nwe_41H3BBA"
    } as Employee | null,
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