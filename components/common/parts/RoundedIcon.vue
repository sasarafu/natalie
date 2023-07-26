<template>
  <img :src="iconUrl" class="rounded-full" draggable="false" />
</template>

<script setup lang="ts">
defineProps<{
  iconUrl: string;
}>();
</script>
