<template>
  <span class="line-through"><slot /></span>
</template>

<script setup lang="ts">
defineProps<{ baseUrl: string }>();
</script>
