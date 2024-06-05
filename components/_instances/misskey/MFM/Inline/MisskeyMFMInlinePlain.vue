<template>
  <slot />
</template>

<script setup lang="ts">
defineProps<{ baseUrl: string }>();
</script>
