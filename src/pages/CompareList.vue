<script setup lang="ts">
import { useFruitsStore } from "../store/fruits";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const fruitsStore = useFruitsStore();
</script>
<template>
  <main>
    <TheContainerHeader>{{ t("menu.compare-list") }}</TheContainerHeader>
    <CompareTable />
    <BaseNotFoundFruit v-if="!fruitsStore.getComparedLength">
      <h2>{{ t("message.compare-empty") }}</h2>
    </BaseNotFoundFruit>
  </main>
</template>
