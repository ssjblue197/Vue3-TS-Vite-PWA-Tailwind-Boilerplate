import http from '@/api/http';
import { defineStore } from 'pinia';
import type { Request} from '@/modules/fullfill-request/types';
import type { RequestParams } from '@/api/request';
import { getList } from '@/api/request';
import axios from 'axios';

export const useRequestStore = defineStore('request', {
  state: () => {
    return {
      requestList: [] as Array<Request>,
      total: 0,
    }
  },
  actions: {
    async getListRequest(params: RequestParams) {
      try {
        const { data } = await getList(params);
        this.total = data?.total || 0;
        return data.data || [];
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
          
        }
      }
    }
  },
  // persist: {
  //   storage: localStorage,
  //   key: "request-storage-app",
  //   paths: [] /*Define states can persisted*/
  // },
});