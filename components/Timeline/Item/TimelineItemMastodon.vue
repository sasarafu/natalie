<template>
  <div>{{ post.body }}</div>
</template>

<script setup lang="ts">
import type { MastodonPost } from '~/models/instances/mastodon';

defineProps<{
  post: MastodonPost;
}>();
</script>
