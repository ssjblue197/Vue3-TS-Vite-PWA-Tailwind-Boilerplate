/// <reference lib="WebWorker" />

// export empty type because of tsc --isolatedModules flag
// Import the functions you need from the SDKs you need
// import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { initializeApp, getApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { onBackgroundMessage } from 'firebase/messaging/sw';
import 'firebase/messaging';
import { MessagePayload } from 'firebase/messaging';

export type {};
// declare const chrome: any;
declare const self: ServiceWorkerGlobalScope;
declare module 'firebase/messaging' {
  interface FirebaseMessaging {
    onBackgroundMessage(handler: (payload: any) => Promise<any> | void): void;
  }
}


// precacheAndRoute(self.__WB_MANIFEST);


const firebaseConfig = {
  apiKey: 'AIzaSyDIJ1kSREsYsa32jA65ok4XaJPhmYfNbq0',
  authDomain: 'swiftpod-noti.firebaseapp.com',
  projectId: 'swiftpod-noti',
  storageBucket: 'swiftpod-noti.appspot.com',
  messagingSenderId: '520641201951',
  appId: '1:520641201951:web:1d4c687536c1ea70ca122a',
  measurementId: 'G-BX6VS9Y6D0',
};

// Initialize Firebase
initializeApp(firebaseConfig);

// const token = await getToken(messaging);
// console.log("Token", token);
// chrome.runtime.onInstalled.addListener(async () => {
//   //TODO Save token into storage
// })

onBackgroundMessage(getMessaging(getApp()), (payload: MessagePayload) => {

  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload?.data?.message || '';
  const notificationOptions = {
    body: payload?.data?.message,
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event: any) => {
  console.log(event);
  //TODO hanlde event when click notification
});

self.skipWaiting()
clientsClaim()
// cleanupOutdatedCaches()
