<script setup lang="ts">
import { useFruitsStore } from "/@/store/fruits";
import BaseFruitCard from "/@/components/ui/BaseFruitCard.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const fruitsStore = useFruitsStore();
</script>

<template>
  <main>
    <TheContainerHeader>{{ t("menu.fruits-list") }}</TheContainerHeader>
    <div class="flex">
      <!-- <TheFilter /> -->
      <div class="fruits-list">
        <BaseFruitCard
          v-for="fruit in fruitsStore.getSearchedFruit"
          :key="fruit.id"
          :fruit="fruit"
        />
      </div>
    </div>
  </main>
</template>

<style></style>
