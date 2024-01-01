<template>
  <div>{{ formula }}</div>
</template>

<!-- deprecated -->
<script setup lang="ts">
import type { MfmMathBlock } from 'mfm-js';

defineProps<MfmMathBlock['props'] & { baseUrl: string }>();
</script>
