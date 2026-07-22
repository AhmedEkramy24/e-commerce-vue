import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import "primeicons/primeicons.css";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(Toast);
app.mount("#app");
