<template>
  <div class="flex flex-col h-full min-w-80 bg-base-200">
    <header class="flex-none p-2 bg-base-300">header</header>
    <main class="grow overflow-y-auto p-2">
      <TimelineItem v-for="post in posts" :key="post.id" :post="post" />
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/models/post';

const posts = computed<Post[]>(() => [
  {
    id: crypto.randomUUID(),
    type: 'bsky',
    user: {
      type: 'bsky',
      userid: 'bsky_user',
    },
    text: 'hello bsky',
  },
  {
    id: crypto.randomUUID(),
    type: 'mastodon',
    user: {
      type: 'mastodon',
      userid: 'mastodon_user',
    },
    body: 'hello mastodon',
  },
  {
    id: crypto.randomUUID(),
    type: 'misskey',
    user: {
      type: 'misskey',
      userid: 'misskey_user',
    },
    content: 'hello misskey',
  },
]);
</script>
