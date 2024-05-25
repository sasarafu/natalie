<template>
  <img v-if="iconUrl" :src="iconUrl" class="rounded-full" draggable="false" />
  <div v-else class="rounded-full bg-neutral-content" />
</template>

<script setup lang="ts">
defineProps<{
  iconUrl: string | undefined;
}>();
</script>
