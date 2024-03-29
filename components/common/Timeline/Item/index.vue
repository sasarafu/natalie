<template>
  <component
    :is="columnItemComponents[item.via.instance.type]"
    :item="item"
    :is-last="isLast"
  />
</template>

<script setup lang="ts">
import {
  BlueskyColumnItem,
  MastodonColumnItem,
  MisskeyColumnItem,
} from '#components';
import type { IMessage } from '~/models/common/message';

defineProps<{
  item: IMessage;
  isLast: boolean;
}>();

const columnItemComponents = {
  bluesky: BlueskyColumnItem,
  mastodon: MastodonColumnItem,
  misskey: MisskeyColumnItem,
};
</script>
