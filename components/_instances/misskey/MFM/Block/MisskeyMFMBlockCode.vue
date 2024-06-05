<template>
  <div class="font-mono bg-gray-700 my-1 p-2 rounded">
    {{ code }}
  </div>
</template>

<script setup lang="ts">
import type { MfmCodeBlock } from 'mfm-js';

defineProps<MfmCodeBlock['props'] & { baseUrl: string }>();

// TODO: syntax highlight を導入する
</script>
