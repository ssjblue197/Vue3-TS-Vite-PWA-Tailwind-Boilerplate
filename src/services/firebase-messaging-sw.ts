import { initializeApp } from 'firebase/app';
import { getToken, MessagePayload } from 'firebase/messaging';
import { onBackgroundMessage } from 'firebase/messaging/sw';
import { getMessaging } from 'firebase/messaging';

declare const chrome: any;

const firebaseConfig = {
  apiKey: 'AIzaSyDIJ1kSREsYsa32jA65ok4XaJPhmYfNbq0',
  authDomain: 'swiftpod-noti.firebaseapp.com',
  projectId: 'swiftpod-noti',
  storageBucket: 'swiftpod-noti.appspot.com',
  messagingSenderId: '520641201951',
  appId: '1:520641201951:web:1d4c687536c1ea70ca122a',
  measurementId: 'G-BX6VS9Y6D0',
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

chrome.runtime.onInstalled.addListener(async () => {
  const token = await getToken(messaging);
  console.log("Token", token);
})

messaging.onBackgroundMessage(messaging), (
  payload: MessagePayload,
) => {
  console.log('Payload', payload);
}));