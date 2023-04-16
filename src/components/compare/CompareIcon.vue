<script setup lang="ts">
import { toRefs } from "vue";

interface Props {
  isCompared?: boolean;
}

const props = defineProps<Props>();

const { isCompared } = toRefs(props);
</script>

<template>
  <span class="cursor-pointer">
    <i v-if="!isCompared" class="i-ph-scales-fill text-lg" />
    <i v-else class="i-ph-scales-fill bg-orange text-lg" />
  </span>
</template>

<style scoped></style>
