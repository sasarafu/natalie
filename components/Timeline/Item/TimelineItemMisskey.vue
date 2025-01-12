<template>
  <div>{{ post.content }}</div>
</template>

<script setup lang="ts">
import type { MisskeyPost } from '~/models/instances/misskey';

defineProps<{
  post: MisskeyPost;
}>();
</script>
