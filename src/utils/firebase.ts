// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export { messaging };
