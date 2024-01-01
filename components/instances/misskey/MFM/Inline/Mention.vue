<template>
  <a href="#" class="text-primary hover:underline">{{ acct }}</a>
</template>

<script setup lang="ts">
import type { MfmMention } from 'mfm-js';

defineProps<MfmMention['props'] & { baseUrl: string }>();

// TODO: user詳細ページを追加したら開けるようにする
</script>
