<template>
  <div class="border-s-4 pl-2 py-1"><slot /></div>
</template>

<script setup lang="ts">
defineProps<{ baseUrl: string }>();
</script>
