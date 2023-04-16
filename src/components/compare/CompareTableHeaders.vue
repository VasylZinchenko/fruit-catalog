<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useFruitsStore } from "/@/store/fruits";
import { SortType } from '/@/types/enum';
const { t } = useI18n()

const fruitStore = useFruitsStore();
</script>

<template>
  <thead>
    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
      <th></th>
      <th
        class="text-center p-2 text-xs xs: sm:grid-cols-2 md:grid-cols-3 lg:text-sm"
        v-for="header in fruitStore.getSortType"
        :key="header"
      >
        {{ header }}
        <button @click="fruitStore.setTitle(header as SortType)">
          <i v-if="header !== t('fruit.actions')" class="i-ph-caret-down" />
        </button>
      </th>
    </tr>
  </thead>
</template>
