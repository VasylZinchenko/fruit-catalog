<script setup lang="ts">
import { defineProps, toRefs } from "vue";
import { useFruitsStore } from "../../store/fruits.js";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const fruitStore = useFruitsStore();

interface Fruit {
  family: string;
  genus: string;
  id: number;
  isCompared: boolean;
  isFavorited: boolean;
  name: string;
  img: string;
  nutritions: {
    calories: number;
    carbohydrates: number;
    fat: number;
    protein: number;
    sugar: number;
  };
  order: string;
}

interface Props {
  fruit: Fruit;
}

const props = defineProps<Props>();
const { fruit } = toRefs(props);
</script>

<template>
  <div>
    <div class="bg-white shadow-md rounded-lg overflow-hidden dark:bg-#1e1e20">
      <RouterLink
        :to="{
          name: 'detail.show',
          params: { id: fruit.id, name: fruit.name.toLocaleLowerCase() },
        }"
      >
        <div
          class="h-56 bg-center bg-no-repeat bg-contain dark:bg-white"
          :style="`background-image: url(${fruit.img})`"
          :alt="fruit.name"
        ></div>
      </RouterLink>
      <div class="px-4 py-2 bg-gray-200 dark:bg-#1e1e20">
        <h2 class="font-bold text-xl mb-2" dark:text-gray-300>
          {{ t(`fruit-name.${fruit.name}`) }}
        </h2>
        <p class="text-gray-700 text-base dark:text-gray-300">
				{{ t('fruit.family') }}: {{ t(`fruit-family.${fruit.family}`) }}
          <br />
          {{ t('fruit.genus') }}: {{ t(`fruit-genus.${fruit.genus}`) }}
          <br />
         {{ t('fruit.order') }}: {{ t(`fruit-order.${fruit.order}`) }}
        </p>
        <div class="flex justify-end gap-2">
          <CompareIcon
            @click="fruitStore.toggleCompare(fruit.id)"
            :isCompared="fruit.isCompared"
          />
          <FavoriteIcon
            @click="fruitStore.toggleFavorite(fruit.id)"
            :isFavorited="fruit.isFavorited"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
