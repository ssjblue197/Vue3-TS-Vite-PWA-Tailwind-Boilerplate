import "nprogress/nprogress.css";

import axios from "axios";
import NProgress from "nprogress";
// import router from "@/router";
// import { useAccountStore } from "@/stores/account";
import { API_URL } from "@/const";

const http = axios.create({ baseURL: API_URL });

http.defaults.headers.post["Content-Type"] = "application/json";

http.interceptors.request.use((config) => {
  // const account = useAccountStore();
  // if (account.profile?.token)
  //   config.headers["Authorization"] = `Bearer ${account.profile?.token}`;
  NProgress.start();
  return config;
});

http.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    // const currentRouteName = router.currentRoute.value.name;
    // const authRouteNames = ["login"];
    // if (
    //   currentRouteName &&
    //   !authRouteNames.includes(currentRouteName.toString()) &&
    //   error.response.status === 401
    // ) {
    //   const { logout } = useAccountStore();
    //   logout();
    // }
    return Promise.reject(error);
  }
);
export default http;

export const initGetParams = {
  paging: {
    limit: 10,
    page: 1,
  },
  filters: {},
  sorter: {},
};

export const multipartFormData = {
  "Content-Type": "multipart/form-data",
};
