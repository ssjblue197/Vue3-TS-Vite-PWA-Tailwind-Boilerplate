import { defineStore } from 'pinia';
// import axios from 'axios';


export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Array<any>,
    newNotification: null as any,
    firebaseToken: null as string | null,
  }),
  actions: {
    addNotification(notification: any) {
      this.notifications.push(notification);
    },
    resetNotificationStore() {
      this.notifications = [];
      this.newNotification = null;
      this.firebaseToken = null;
    },
  },
  persist: {
    // paths: ['notifications'],
    key: 'firebase-storage-spod-app',
    storage: localStorage,
  },
});
