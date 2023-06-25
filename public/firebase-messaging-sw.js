self.__WB_MANIFEST;
importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyB0R0zSFtqIODBauAhO9VjCuM4vBKMvVmI',
  authDomain: 'spod-app-notify.firebaseapp.com',
  projectId: 'spod-app-notify',
  storageBucket: 'spod-app-notify.appspot.com',
  messagingSenderId: '980992459832',
  appId: '1:980992459832:web:7463dd3256f43e751b52cd',
  measurementId: 'G-FKTTTL6K37',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(firebaseApp);
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.data.message;
  const notificationOptions = {
    body: payload.data.message,
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
self.addEventListener('notificationclick', (event) => {
  console.log(event);
  //TODO hanlde event when click notification
});
