import { i18n, loadLanguageAsync } from "@/i18n";

import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
loadLanguageAsync("uz");

app.mount("#app");
