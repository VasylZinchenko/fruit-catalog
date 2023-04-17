<script setup lang="ts">
import { useFruitsStore } from "/@/store/fruits";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const route = useRoute();

const fruitsStore = useFruitsStore();

const isOpen = ref(false);
</script>

<template>
  <div class="pl-10 pr-10">
    <div class="main-header">
      <h1 class="text-xl md:text-3xl">
        <slot></slot>
      </h1>
      <input type="checkbox" class="appearance-none checked:bg-blue-500 ..." />
      <button
        v-if="route.path !== '/fruits'"
        @click="fruitsStore.removeSelected(route)"
        type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        {{ t('buttons.remove-all') }}
      </button>
      <button
        v-else
        @click="fruitsStore.addAllToCompared()"
        type="button"
        class="text-sm p-2 focus:outline-none text-white bg-green-700  hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900 md:text-base"
      >
        {{ t('buttons.add-all-to-compare') }}
      </button>
    </div>
    <div class="mt-5">
      <button
        @click="isOpen = !isOpen"
        id="dropdownSearchButton"
        data-dropdown-toggle="dropdownSearch"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <i i-carbon-filter ></i>
        <svg
          class="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <Transition name="list">
        <div
          v-if="isOpen"
          id="dropdownSearch"
          class="mt-2 z-10 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
        >
          <div class="p-3">
            <FilterList />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
