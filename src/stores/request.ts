import { defineStore } from 'pinia';
import type { Request} from '@/modules/fullfill-request/types';
import type { RequestParams, ReceivePayload } from '@/api/types';
import { getList, receiveRequest } from '@/api/request';
import { useNotificationStore } from  '@/stores/notification';
import axios from 'axios';

const notificationStore = useNotificationStore();


export const useRequestStore = defineStore('request', {
  state: () => {
    return {
      requestList: [] as Array<Request>,
      total: 0,
      filter: {
        employee: undefined,
        location: '',
        device: 'ipad',
        keyword: {
          type: '',
          value: '',
          title: ''
        }
      } as RequestParams,
      selectRequest: undefined as Request | undefined,
      fulfillSuccessModal: false as boolean
    }
  },
  actions: {
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
        ...this.filter,
        employee: undefined,
        location: '',
        device: 'ipad',
      }
    },
    setDefaultFilterKeyword() {
      this.filter = {
        ...this.filter,
        keyword: {
          value: '',
          title: ''
        }
      }
    }
  },
  persist: {
    storage: localStorage,
    key: "request-storage-spod-app",
    paths: ['filter', 'total', 'selectRequest'] /*Define states can persisted*/
  },
});