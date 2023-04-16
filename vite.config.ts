import { defineConfig } from "vite";
import { resolve } from "pathe";
import Vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import Components from "unplugin-vue-components/vite";
import ViteFonts from "vite-plugin-fonts";
import Unocss from "unocss/vite";
import VueI18n from "@intlify/vite-plugin-vue-i18n";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "/@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    Vue(),
    // https://github.com/jpkleemans/vite-svg-loader
    svgLoader(),
    // https://github.com/antfu/vite-plugin-components
    Components({
      extensions: ["vue"],
      dts: "src/components.d.ts",
    }),
    // https://github.com/stafyniaksacha/vite-plugin-fonts#readme
    ViteFonts({
      google: {
        families: ["Open Sans", "Montserrat", "Fira Sans"],
      },
    }),

    Unocss({
      /* options */
    }),

    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18n({
      include: [resolve(__dirname, "./locales/**")],
    }),
  ],
  optimizeDeps: {
    include: ["vue", "vue-router", "@vueuse/core"],
    exclude: ["vue-demi"],
  },
});
