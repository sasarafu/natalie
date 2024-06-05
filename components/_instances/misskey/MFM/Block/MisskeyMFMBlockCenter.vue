<template>
  <div class="text-center">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ baseUrl: string }>();
</script>
