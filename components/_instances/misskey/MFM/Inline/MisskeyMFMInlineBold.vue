<template>
  <strong><slot /></strong>
</template>

<script setup lang="ts">
defineProps<{ baseUrl: string }>();
</script>
