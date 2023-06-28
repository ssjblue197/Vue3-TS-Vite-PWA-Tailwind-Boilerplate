import "vue-toastification/dist/index.css";
import "./assets/index.scss";

import { createApp } from "vue";
import Toast, { POSITION, useToast } from "vue-toastification";

import spod from "./components/spod";

import App from "./App.vue";
import router from "./router";
import stores from "./stores";
import date from "./plugins/date";
import display from "./plugins/display";
import icon from "./plugins/icon";
import form from "./plugins/form";
import svgIcon from "./svgIcon";
import ImageLoading from "./components/ImageLoading.vue";
import loading from "./directives/loading";

import { messaging } from '@/services/firebase';
import { onMessage } from 'firebase/messaging';
import { FIREBASE_EVENTS } from '@/utils/const';

import EventBus from '@/utils/eventbus';

// @ts-ignore
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const app = createApp(App);

app.component("infinite-loading", InfiniteLoading);


spod(app);
svgIcon(app);

app.use(router);
app.use(stores);
app.use(Toast, { position: POSITION.TOP_RIGHT });
app.use(date);
app.use(icon);
app.use(form);
app.use(display);

app.component("ImageLoading", ImageLoading);

app.directive("loading", loading);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.config.errorHandler = (err: any) => {
  const toast = useToast();
  toast.error(err.message);
  console.log(err);
};

// Handle incoming messages
onMessage(messaging, (payload) => {
  console.log('Message received:', payload);
  if (payload.data) {
    switch (payload.data.event_name) {
      case FIREBASE_EVENTS.EVENT_CREATE:
        EventBus.$emit(FIREBASE_EVENTS.EVENT_CREATE);  
      break;
      case FIREBASE_EVENTS.EVENT_RECEIVE:
        EventBus.$emit(FIREBASE_EVENTS.EVENT_RECEIVE);  
      break;
      case FIREBASE_EVENTS.EVENT_FULFILL:
        EventBus.$emit(FIREBASE_EVENTS.EVENT_FULFILL);  
      break;
      case FIREBASE_EVENTS.EVENT_REJECT:
        EventBus.$emit(FIREBASE_EVENTS.EVENT_REJECT);  
      break;
      case FIREBASE_EVENTS.EVENT_RELEASE:
        EventBus.$emit(FIREBASE_EVENTS.EVENT_RELEASE);  
      break;
      case FIREBASE_EVENTS.EVENT_TIMEOUT:
        EventBus.$emit(FIREBASE_EVENTS.EVENT_TIMEOUT);  
      break;
      case FIREBASE_EVENTS.EVENT_CONFIRM:
        EventBus.$emit(FIREBASE_EVENTS.EVENT_CONFIRM);  
      break;
      case FIREBASE_EVENTS.EVENT_UPDATE_PRIORITY:
        EventBus.$emit(FIREBASE_EVENTS.EVENT_UPDATE_PRIORITY);  
      break;
      case FIREBASE_EVENTS.EVENT_REPORT_MISSING_BOX:
        EventBus.$emit(FIREBASE_EVENTS.EVENT_REPORT_MISSING_BOX);  
      break;
      default:
        break;
    }
  }
  // const notificationStore = useNotificationStore();
  // const scanStore = useScanStore();
  // notificationStore.addNotification(payload);
  // notificationStore.newNotification = payload;
  // if (payload.data && payload.data.status) {
  //   scanStore.printingStatus = {
  //     ...scanStore.printingStatus,
  //     status: payload.data.status,
  //   };
  // }
});

app.mount("#app");
