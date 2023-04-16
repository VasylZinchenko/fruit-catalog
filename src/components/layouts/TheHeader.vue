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

const show = ref(false);
const fruitsStore = useFruitsStore();

setTimeout(() => {
  show.value = true;
}, 1000);
</script>
<template>
  <header class="text-center border-b-4 border-slate-200">
    <div class="flex items-center justify-between max-w-5xl m-auto px-10 py-5">
      <RouterLink class="cursor-pointer text-2xl" to="/fruits">
        {{ t("menu.fruits") }}
      </RouterLink>
      <SearchBar v-if="!route.params.id"/>

      <ul class="flex gap-10">
        <li class="cursor-pointer text-2xl">
          <RouterLink to="/compare">
            <div class="relative">
              <i class="i-ph-scales text-cyan-700 hover:text-cyan-500" />
              <BaseFruitLength v-if="fruitsStore.getComparedLength">
                {{ fruitsStore.getComparedLength }}
              </BaseFruitLength>
            </div>
          </RouterLink>
        </li>

        <li class="cursor-pointer text-2xl">
          <RouterLink to="/favorite">
            <div class="relative">
              <i class="i-ph-heart text-cyan-700 hover:text-cyan-500" />
              <BaseFruitLength v-if="fruitsStore.getFavoritedLength">
                {{ fruitsStore.getFavoritedLength }}
              </BaseFruitLength>
            </div>
          </RouterLink>
        </li>

        <li class="cursor-pointer text-2xl">
          <a
            href="#"
            @click="toggleLocales"
            class="text-cyan-700 hover:text-cyan-500"
            :title="t('toggle_language')"
          >
            <i class="i-ph-translate-bold" />
          </a>
        </li>

        <li class="cursor-pointer text-2xl">
          <a
            href="#"
            @click="toggleDark()"
            class="text-cyan-700 hover:text-cyan-500"
            :title="t('toggle_theme')"
          >
            <i i="ph-sun dark:ph-moon" />
          </a>
        </li>
      </ul>
    </div>
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
