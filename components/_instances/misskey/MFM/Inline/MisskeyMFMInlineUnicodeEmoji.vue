<template>
  {{ emoji }}
</template>

<script setup lang="ts">
import type { MfmUnicodeEmoji } from 'mfm-js';

defineProps<MfmUnicodeEmoji['props'] & { baseUrl: string }>();
</script>
