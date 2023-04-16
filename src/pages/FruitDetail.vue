<script setup lang="ts">
import { useRoute } from "vue-router";
import { useFruitsStore } from "../store/fruits";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const fruitsStore = useFruitsStore();
const route = useRoute();

const currentFruit = computed(() => {
  return fruitsStore.fruitsData.find((fruit) => fruit.id === +route.params.id);
});

const image = computed(() => {
  return currentFruit.value?.img ? currentFruit.value?.img : "";
});

const styleFavoriteButton = computed(() => {
  return currentFruit.value?.isFavorited
    ? "bg-yellow-500 hover:bg-yellow-600"
    : "bg-yellow-100 hover:bg-yellow-200 text-black";
});

const styleCompareButton = computed(() => {
  return currentFruit.value?.isCompared
    ? "bg-green-500 hover:bg-green-600"
    : "bg-green-100 hover:bg-green-200 text-black";
});
</script>
<template>
  <main>
    <div
      class="flex flex-wrap ml-auto mr-auto mt-10 {{ dark:bg-gray-900 }} text-white p-4 rounded-lg shadow-md max-w-64rem"
    >
      <div class="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 mt-4 md:mt-0">
        <img
          :src="`/${image}`"
          alt="Banana"
          class="w-full object-cover object-center rounded-md shadow-md border-2 border-gray-300"
        />
      </div>
      <div class="w-full md:w-2/3 lg:w-3/4 xl:w-4/5 pl-4">
        <div></div>
        <h2 class="text-4xl font-bold mb-4">
          {{ t(`fruit-name.${currentFruit?.name}`) }}
        </h2>
        <div class="mb-4">
          <h3 class="text-xl font-bold">{{ t('fruit.characteristics') }}:</h3>
          <ul class="list-disc pl-4 mt-2">
            <li>{{ t('fruit.family') }}: {{ t(`fruit-family.${currentFruit?.family}`) }}</li>
            <li>{{ t('fruit.genus') }}: {{ t(`fruit-genus.${currentFruit?.genus}`) }}</li>
            <li>{{ t('fruit.order') }}: {{ t(`fruit-order.${currentFruit?.order}`) }}</li>
          </ul>
        </div>
        <div class="mb-4">
          <h3 class="text-xl font-bold">{{ t('fruit.nutrition') }}:</h3>
          <ul class="list-disc pl-4 mt-2">
            <li>{{ t('fruit.calories') }}: {{ currentFruit?.nutritions.calories }}</li>
            <li>
              {{ t('fruit.carbohydrates') }}: {{ currentFruit?.nutritions.carbohydrates }}g
            </li>
            <li>{{ t('fruit.fat') }}: {{ currentFruit?.nutritions.fat }}g</li>
            <li>{{ t('fruit.protein') }}: {{ currentFruit?.nutritions.protein }}g</li>
            <li>{{ t('fruit.sugar') }}: {{ currentFruit?.nutritions.calories }}g</li>
          </ul>
        </div>
        <div class="flex space-x-2">
          <button
            @click="fruitsStore.toggleFavorite(+route.params.id)"
            class="text-white px-4 py-2 rounded-md"
            :class="styleFavoriteButton"
          >
            {{ t('buttons.favorite') }}
            <FavoriteIcon :isFavorited="currentFruit?.isFavorited" />
          </button>

          <button
            @click="fruitsStore.toggleCompare(+route.params.id)"
            class="text-white px-4 py-2 rounded-md"
            :class="styleCompareButton"
          >
            {{ t('buttons.compare') }}
            <CompareIcon :isCompared="currentFruit?.isCompared" />
          </button>
        </div>

        <div class="flex justify-end gap-2"></div>
      </div>
      <div class="mt pt-4 border-t-2 border-gray-300">
        <h3 class="text-xl font-semibold mb-2">{{ t('fruit.description') }}</h3>
        <p class="text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor
          condimentum tortor eu rutrum. Vestibulum rhoncus varius nibh, id
          vestibulum enim aliquam nec. Cras tincidunt, velit a cursus vulputate,
          tellus turpis viverra turpis, at dictum justo risus non lacus. Aliquam
          dapibus malesuada tortor, et vulputate ex interdum id.
        </p>
      </div>
      <p class="mt-4"></p>
    </div>
  </main>
</template>

<style scoped></style>
