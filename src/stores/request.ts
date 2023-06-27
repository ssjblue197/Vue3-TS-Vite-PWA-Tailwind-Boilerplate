import { defineStore } from 'pinia';
import type { Request} from '@/modules/fullfill-request/types';
import type { RequestParams } from '@/api/request';
import { getList } from '@/api/request';
import axios from 'axios';

export const ITEMS_PER_PAGE = 10;

export const useRequestStore = defineStore('request', {
  state: () => {
    return {
      requestList: [] as Array<Request>,
      total: 0,
      filter: {
        employee: '',
        limit: ITEMS_PER_PAGE,
        page: 1,
        // type: 'load-more',
        type: '',
        location: '',
      } as RequestParams,
      selectRequest: undefined as Request | undefined
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
    },
    setDefaultFilter() {
      this.filter = {
        employee: '',
        limit: ITEMS_PER_PAGE,
        page: 1,
        // type: 'load-more',
        type: '',
        location: '',
      }
    }
  },
  persist: {
    storage: localStorage,
    key: "request-storage-spod-app",
    paths: ['filter', 'total', 'selectRequest'] /*Define states can persisted*/
  },
});