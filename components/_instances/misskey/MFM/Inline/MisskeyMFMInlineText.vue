<template>
  {{ text }}
</template>

<script setup lang="ts">
import type { MfmText } from 'mfm-js';

defineProps<MfmText['props'] & { baseUrl: string }>();
</script>
