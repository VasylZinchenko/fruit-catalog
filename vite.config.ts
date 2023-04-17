import { defineConfig } from "vite";
import Unocss from "unocss/vite";
import { resolve } from "pathe";
import vue from "@vitejs/plugin-vue";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import path from "path";
import Components from "unplugin-vue-components/vite";
import ViteFonts from "vite-plugin-fonts";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "/@": resolve(__dirname, "./src"),
      "vue-i18n": "vue-i18n/dist/vue-i18n.runtime.esm-bundler.js",
    },
  },
  plugins: [
    vue(),
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
    VueI18nPlugin({
      include: path.resolve(__dirname, "./locales/**"),
    }),
  ],
  optimizeDeps: {
    include: ["vue", "vue-router", "@vueuse/core"],
    exclude: ["vue-demi"],
  },
});
