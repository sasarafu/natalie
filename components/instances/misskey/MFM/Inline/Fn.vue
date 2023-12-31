<template>
  <slot />
</template>

<script setup lang="ts">
import type { MfmFn } from 'mfm-js';

defineProps<MfmFn['props'] & { baseUrl: string }>();
</script>
