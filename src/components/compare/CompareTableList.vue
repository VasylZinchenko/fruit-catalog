<script setup lang="ts">
import { toRefs } from "vue";
import { useFruitsStore } from "/@/store/fruits";
import { SortType } from "/@/types/enum";
import type { Nutritions, Fruits, MainFruitInfo } from "/@/types/model";

interface Props {
  fruit: Fruits;
}

const props = defineProps<Props>();
const { fruit } = toRefs(props);

const fruitStore = useFruitsStore();
</script>

<template>
  <tbody class="text-gray-600 text-sm font-light">
    <tr class="border-b border-gray-200 hover:bg-gray-100">
      <td>
        <div class="flex items-center">
          <div
            class="w-6 h-6 rounded-full bg-no-repeat bg-contain ml-2"
            :style="`background-image: url(${fruit.img})`"
            :alt="fruit.name"
          ></div>
        </div>
      </td>
      <td v-for="value in SortType" class="p-2 text-center">
        <span v-if="value !== 'actions'" class="font-medium"
          >{{
            fruit.nutritions[value as keyof Nutritions] ||
            fruit[value as keyof MainFruitInfo]
          }}
        </span>
        <div v-else class="flex items-center justify-center">
          <FavoriteIcon
            @click="fruitStore.toggleFavorite(fruit.id)"
            :isFavorited="fruit.isFavorited"
            width="5px"
          />
          <i
            @click="fruitStore.toggleCompare(fruit.id)"
            i="ph-trash"
            class="text-base flex items-center cursor-pointer hover:bg-red"
          />
        </div>
      </td>
    </tr>
  </tbody>
</template>
