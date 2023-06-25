// self.__WB_MANIFEST;
// importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging-compat.js');

// const firebaseConfig = {
//   apiKey: 'AIzaSyB0R0zSFtqIODBauAhO9VjCuM4vBKMvVmI',
//   authDomain: 'spod-app-notify.firebaseapp.com',
//   projectId: 'spod-app-notify',
//   storageBucket: 'spod-app-notify.appspot.com',
//   messagingSenderId: '980992459832',
//   appId: '1:980992459832:web:7463dd3256f43e751b52cd',
//   measurementId: 'G-FKTTTL6K37',
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging(firebaseApp);
// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   const notificationTitle = payload.data.message;
//   const notificationOptions = {
//     body: payload.data.message,
//   };
//   return self.registration.showNotification(notificationTitle, notificationOptions);
// });
// self.addEventListener('notificationclick', (event) => {
//   console.log(event);
//   //TODO hanlde event when click notification
// });

declare let self: ServiceWorkerGlobalScope;

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';


import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing'
// import { clientsClaim } from 'workbox-core';


precacheAndRoute(self.__WB_MANIFEST || []);

cleanupOutdatedCaches()
// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { denylist: [/^\/backoffice/] }, //List page will display No internet connection when request without internet, example: /backoffice
))



self.addEventListener('install', () => void self.skipWaiting());
self.addEventListener('activate', () => void self.clients.claim());

self.addEventListener('notificationclick', (event) => {
	event.waitUntil(self.clients.openWindow(event.notification.tag));
	event.notification.close();
});

//Enable this code when use prompt registerType
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING')
    self.skipWaiting()
})

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
const app = initializeApp(firebaseConfig);
// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

console.log(messaging);

//Enable this code when use autoupdate registerType
// self.skipWaiting()
// clientsClaim()


