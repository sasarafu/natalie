<template>
  <img v-if="isCustomEmoji" :src="emojiUrl" class="h-full" draggable="false" />
  <span v-else>{{ emoji }}</span>
</template>

<script setup lang="ts">
import type { IMisskeyMessage } from '~/models/instances/misskey/message';

const props = defineProps<{
  emoji: string; // Unicode emoji (ex. ♡) / MFM (ex. :super_igyo:)
  baseUrl: IMisskeyMessage['via']['instance']['baseUrl'];
}>();

const isCustomEmoji = computed(() => props.emoji.startsWith(':'));
const emojiName = computed(() => props.emoji.slice(1, -1).replace('@.', ''));
const emojiUrl = computed(
  () => `${props.baseUrl}/emoji/${emojiName.value}.webp`,
);
</script>
