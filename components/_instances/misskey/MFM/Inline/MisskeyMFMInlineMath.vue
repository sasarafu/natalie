<template>
  <span>{{ formula }}</span>
</template>

<!-- deprecated -->
<script setup lang="ts">
import type { MfmMathInline } from 'mfm-js';

defineProps<MfmMathInline['props'] & { baseUrl: string }>();
</script>
