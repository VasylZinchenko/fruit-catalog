<script setup lang="ts">
import { useFruitsStore } from "/@/store/fruits";
import BaseFruitCard from "/@/components/ui/BaseFruitCard.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const fruitsStore = useFruitsStore();
</script>

<template>
  <main>
    <TheContainerHeader>{{ t("menu.wish-list") }}</TheContainerHeader>
    <div class="fruits-list">
      <BaseFruitCard
        v-for="fruit in fruitsStore.getFavorited"
        :key="fruit.id"
        :fruit="fruit"
      />
    </div>
    <BaseNotFoundFruit v-if="!fruitsStore.getFavoritedLength">
      <h2>{{ t("message.favorite-empty") }}</h2>
    </BaseNotFoundFruit>
  </main>
</template>

<style></style>
