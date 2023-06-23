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

app.mount("#app");
