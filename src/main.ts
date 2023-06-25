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

import { registerSW } from 'virtual:pwa-register'
// const updateSW = registerSW({
//   onNeedRefresh() {},
//   onOfflineReady() {},
// })

const intervalMS = 60 * 60 * 1000

registerSW({
  onRegisteredSW(swUrl: any, r: any) {
    r && setInterval(async () => {
      if (!(!r.installing && navigator))
        return

      if (('connection' in navigator) && !navigator.onLine)
        return

      const resp = await fetch(swUrl, {
        cache: 'no-store',
        headers: {
          'cache': 'no-store',
          'cache-control': 'no-cache',
        },
      })

      if (resp?.status === 200)
        await r.update()
    }, intervalMS)
  }
})

const app = createApp(App);
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
  // setTimeout(() => {
  //   notificationStore.newNotification = null;
  // }, 4000);
});


app.mount("#app");
