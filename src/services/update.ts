declare let self: ServiceWorkerGlobalScope;

import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { clientsClaim } from 'workbox-core';

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
// self.addEventListener('message', (event) => {
//   if (event.data && event.data.type === 'SKIP_WAITING')
//     self.skipWaiting()
// })

//Enable this code when use autoupdate registerType
self.skipWaiting()
clientsClaim()