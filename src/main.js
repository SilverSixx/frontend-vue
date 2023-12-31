import { createApp } from "vue";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueToast from "vue-toastification";

Vue.use(VueToast);
Vue.prototype.$axios = axios;
const app = createApp(App);
app.use(router);
app.mount("#app");

