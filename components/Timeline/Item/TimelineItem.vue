<template>
  <component :is="timelineItemComponents[post.type]" :post="post" />
</template>

<script setup lang="ts">
import {
  TimelineItemBsky,
  TimelineItemMastodon,
  TimelineItemMisskey,
} from '#components';
import type { Instance } from '~/models/instance';
import type { Post } from '~/models/post';

// TODO: unknownにまとめることで型チェックを無効にしてエラーを握りつぶしている
const timelineItemComponents: Record<Instance, unknown> = {
  bsky: TimelineItemBsky,
  mastodon: TimelineItemMastodon,
  misskey: TimelineItemMisskey,
};

defineProps<{
  post: Post;
}>();
</script>
