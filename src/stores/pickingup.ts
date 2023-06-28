import { defineStore } from 'pinia';
import { getCurrentPickingUp, cancelPickup, fulfillRequest, getAllMissingBox, reportMissingBox } from '@/api/pickingup';
import type { ReceivePayload, FulFillRequestPayload, ParamsGetMissingBox } from '@/api/types';
import { useNotificationStore } from  '@/stores/notification';
import { getErrorMessage } from '@/utils/helper';
import axios from 'axios';

const notificationStore = useNotificationStore();

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
    async cancelPickup(payload: ReceivePayload) {
      try {
        const { data } = await cancelPickup(payload);
        notificationStore.showMessage({
          title: 'Pickup cancelled successfully!',
          message: 'Successfully cancelled pickup request.'
        });
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          notificationStore.showMessage({
            title: 'Pickup cancelled failed!',
            message: getErrorMessage(error)
          });
        }
      }
    },
    async fulfillRequest(payload: FulFillRequestPayload) {
      try {
        const { data } = await fulfillRequest(payload);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          notificationStore.showMessage({
            title: 'Fulfill request failed!',
            message: getErrorMessage(error)
          });
        }
      }
    },
    async getAllMissingBox(params: ParamsGetMissingBox) {
      try {
        const { data } = await getAllMissingBox(params);
        return data?.output;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          notificationStore.showMessage({
            title: 'Failed to get missing box!',
            message: getErrorMessage(error)
          });
        }
      }
    },
    async reportMissingBox(payload: ParamsGetMissingBox) {
      try {
        const { data } = await reportMissingBox(payload);
        notificationStore.showMessage({
          title: 'Reported successfully!',
          message: data?.output?.message || 'Successfully reported missing box.'
        });
        return data?.output;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          notificationStore.showMessage({
            title: 'Failed to report missing box!',
            message: getErrorMessage(error)
          });
        }
      }
    }
  },
  // persist: {
  //   storage: localStorage,
  //   key: "pickup-storage-spod-app",
  //   paths: ['filter', 'total', 'selectRequest'] /*Define states can persisted*/
  // },
});