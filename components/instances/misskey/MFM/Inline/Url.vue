<template>
  <NuxtLink :to="url" target="_blank" class="text-primary hover:underline">
    {{ url }}
  </NuxtLink>
</template>

<script setup lang="ts">
import type { MfmUrl } from 'mfm-js';

defineProps<MfmUrl['props'] & { baseUrl: string }>();
</script>
