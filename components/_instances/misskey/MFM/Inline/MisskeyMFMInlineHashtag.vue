<template>
  <a href="#" class="text-primary hover:underline">#{{ hashtag }}</a>
</template>

<script setup lang="ts">
import type { MfmHashtag } from 'mfm-js';

defineProps<MfmHashtag['props'] & { baseUrl: string }>();

// TODO: 検索ページを追加したら開けるようにする
</script>
