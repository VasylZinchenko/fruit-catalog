<script setup lang="ts">
import { useFruitsStore } from "/@/store/fruits";
import BaseFruitCard from "/@/components/ui/BaseFruitCard.vue";
const fruitsStore = useFruitsStore();
</script>

<template>
  <main>
    <TheContainerHeader>Fruits list</TheContainerHeader>
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
