<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { useTheme } from "/@/composables";
import { useFruitsStore } from "/@/store/fruits";
import { useRoute } from "vue-router";
const route = useRoute();

const { t, availableLocales, locale } = useI18n();

const toggleLocales = () => {
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};

const { toggleDark } = useTheme();

const show = ref<boolean>(false);
const fruitsStore = useFruitsStore();

setTimeout(() => {
  show.value = true;
}, 1000);
</script>
<template>
  <header class="text-center border-b-4 border-slate-200 bg-white dark:bg-gray-900">
    <nav
      class="bg-white border-gray-200 max-w-5xl px-6 m-auto dark:bg-gray-900"
    >
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <RouterLink class="cursor-pointer text-2xl" to="/fruits">
          {{ t("menu.fruits") }}
        </RouterLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        ></button>
        <div class="w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <SearchBar class="mb-5 md:mb-0" v-if="!route.params.id" />
            </li>
            <div class="flex items-center gap-4">
              <li>
                <RouterLink to="/compare">
                  <div class="relative">
                    <i
                      class="i-ph-scales text-cyan-700 text-2xl hover:text-cyan-500"
                    />
                    <BaseFruitLength v-if="fruitsStore.getComparedLength">
                      {{ fruitsStore.getComparedLength }}
                    </BaseFruitLength>
                  </div>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/favorite">
                  <div class="relative">
                    <i
                      class="i-ph-heart text-cyan-700 text-2xl hover:text-cyan-500"
                    />
                    <BaseFruitLength v-if="fruitsStore.getFavoritedLength">
                      {{ fruitsStore.getFavoritedLength }}
                    </BaseFruitLength>
                  </div>
                </RouterLink>
              </li>
              <li>
                <a
                  href="#"
                  @click="toggleLocales"
                  class="text-cyan-700 text-2xl hover:text-cyan-500"
                  :title="t('toggle_language')"
                >
                  <i class="i-ph-translate-bold" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  @click="toggleDark()"
                  class="text-cyan-700 text-2xl hover:text-cyan-500"
                  :title="t('toggle_theme')"
                >
                  <i i="ph-sun dark:ph-moon" />
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style>
a,
.footer-link {
  @apply transition-all ease-out duration-100;
}

.footer-link {
  opacity: 0.8;
}
</style>
