<script setup lang="ts">
import { toRefs } from "vue";


interface Props {
	isFavorited?: boolean
}

const props = defineProps<Props>();

const { isFavorited } = toRefs(props);
</script>

<template>
  <span class="cursor-pointer">
		<i  v-if="!isFavorited" class="i-ph-heart text-lg"/>
		<i  v-else class="i-ph-heart-fill bg-red text-lg"/>
	</span>
</template>

<style scoped></style>
