<template>
  <NuxtLink :to="url" target="_blank" class="text-primary hover:underline">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { MfmLink } from 'mfm-js';

defineProps<MfmLink['props'] & { baseUrl: string }>();
</script>
