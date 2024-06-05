<template>
  <small><slot /></small>
</template>

<script setup lang="ts">
defineProps<{ baseUrl: string }>();
</script>
