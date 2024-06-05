<template>
  <span class="font-mono inline-block bg-gray-700 px-1 rounded">
    {{ code }}
  </span>
</template>

<script setup lang="ts">
import type { MfmInlineCode } from 'mfm-js';

defineProps<MfmInlineCode['props'] & { baseUrl: string }>();
</script>
