import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import mdiVue from "mdi-vue/v3";
import * as mdijs from "@mdi/js";
import messages from "@intlify/unplugin-vue-i18n/messages";
import { Router } from "./router";
import "@unocss/reset/tailwind.css";
import "uno.css";
import "./styles/base.css";

const i18n = createI18n({
  locale: "en",
  messages,
});
const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(i18n)
  .use(Router)
  .use(mdiVue, {
    icons: mdijs,
  })
  .mount("#app");
