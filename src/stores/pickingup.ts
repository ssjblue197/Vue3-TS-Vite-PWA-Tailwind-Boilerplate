import { defineStore } from 'pinia';
// import type { Request} from '@/modules/fullfill-request/types';
import { getCurrentPickingUp } from '@/api/pickingup';
import type { ReceivePayload } from '@/api/types';
// import { useNotificationStore } from  '@/stores/notification';
// import axios from 'axios';

// const notificationStore = useNotificationStore();

export const usePickingUpStore = defineStore('pickingup', {
  state: () => {
    return {
      // currentPickingUp: undefined as Request | undefined
    }
  },
  actions: {
    async getCurrentPickingUp(payload: ReceivePayload) {
      try {
        const { data } = await getCurrentPickingUp(payload);
        return data;
      } catch (error) {}
    },
  },
  // persist: {
  //   storage: localStorage,
  //   key: "pickup-storage-spod-app",
  //   paths: ['filter', 'total', 'selectRequest'] /*Define states can persisted*/
  // },
});