<script setup lang="ts">
import { useFruitsStore } from "/@/store/fruits";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const fruitsStore = useFruitsStore();
</script>
<template>
  <fieldset class="flex flex-wrap">
    <legend>{{ t("fruit.family") }}</legend>
    <hr />
    <div class="flex items-center" v-for="item in fruitsStore.getFamilyFilterList" :key="item">
      <input
        type="checkbox"
        :id="item"
        :value="item"
        v-model="fruitsStore.checkedFamily"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
      />
      <label :for="item" class="pl-1 pr-4">{{ item }}</label>
    </div>
  </fieldset>
</template>
