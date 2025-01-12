<template>
  <div>{{ post.text }}</div>
</template>

<script setup lang="ts">
import type { BskyPost } from '~/models/instances/bsky';

defineProps<{
  post: BskyPost;
}>();
</script>
