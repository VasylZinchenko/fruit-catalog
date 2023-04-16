<script setup lang="ts">
import { useFruitsStore } from "/@/store/fruits";
const fruitsStore = useFruitsStore();
</script>

<template>
  <div class="max-w-5xl ml-auto mr-auto mt-15 pl-10 pr-10 ">
    <div class="bg-white shadow-md rounded w-fit">
      <table class="min-w-max w-full table-auto">
        <CompareTableHeaders v-if="fruitsStore.getComparedLength" />
        <CompareTableList
          v-for="fruit in fruitsStore.sortedFruits"
          :key="fruit.id"
          :fruit="fruit"
        />
      </table>
    </div>
  </div>
</template>
