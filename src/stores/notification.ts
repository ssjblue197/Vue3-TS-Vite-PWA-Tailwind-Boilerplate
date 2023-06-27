import { defineStore } from 'pinia';
// import axios from 'axios';

export interface Message {
  title?: string;
  message?: string
}

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Array<any>,
    newNotification: null as any,
    firebaseToken: null as string | null,
    newMessage: null as Message | null,
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
    showMessage(message: Message) {
      this.newMessage = message;
      setTimeout(() => {
        this.newMessage = null;
      }, 3000)
    }
  },
  persist: {
    paths: ['firebaseToken', 'notifications'],
    key: 'firebase-storage-spod-app',
    storage: localStorage,
  },
});
