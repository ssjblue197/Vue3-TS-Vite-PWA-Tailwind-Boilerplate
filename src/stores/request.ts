import { defineStore } from 'pinia';
import type { Request} from '@/modules/fullfill-request/types';
import type { RequestParams, ReceivePayload } from '@/api/request';
import { getList, receiveRequest, getCurrentPickingUp } from '@/api/request';
import { useNotificationStore } from  '@/stores/notification';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const authStore = useAuthStore();
const notificationStore = useNotificationStore();
export const ITEMS_PER_PAGE = 10;

export const useRequestStore = defineStore('request', {
  state: () => {
    return {
      requestList: [] as Array<Request>,
      total: 0,
      filter: {
        employee: authStore.employee?.id || '',
        location: '',
        device: 'ipad'
      } as RequestParams,
      selectRequest: undefined as Request | undefined
    }
  },
  actions: {
    async getCurrentPickingUp(payload: ReceivePayload) {
      try {
        const { data } = await getCurrentPickingUp(payload);
        return data;
      } catch (error) {}
    },
    async getListRequest(params: RequestParams) {
      try {
        const { data } = await getList(params);
        this.total = data.length || 0;
        return data || [];
      } catch (error) {
        if (axios.isAxiosError(error)) {
          notificationStore.showMessage({
            title: 'Get request failed!',
            message: error?.response?.data?.message
          });
        }
      }
    },
    async receiveRequest(payload: ReceivePayload) {
      try {
        const { data } = await receiveRequest(payload);
        return data.data || [];
      } catch (error) {
        if (axios.isAxiosError(error)) {
          notificationStore.showMessage({
            title: 'Pickup error!',
            message: error?.response?.data?.message
          });
        }
      }
    },
    setDefaultFilter() {
      this.filter = {
        employee: authStore.employee?.id || '',
        location: '',
        device: 'ipad'
      }
    }
  },
  persist: {
    storage: localStorage,
    key: "request-storage-spod-app",
    paths: ['filter', 'total', 'selectRequest'] /*Define states can persisted*/
  },
});