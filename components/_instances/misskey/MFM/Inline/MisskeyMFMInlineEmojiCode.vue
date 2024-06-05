<template>
  <img
    :src="emojiUrl"
    :alt="emojiName"
    class="h-[2em] max-h-full inline align-bottom"
    draggable="false"
  />
</template>

<!-- 絵文字単体(:emoji:, :emoji@.: など)でも使えるようにすること -->
<script setup lang="ts">
import type { MfmEmojiCode } from 'mfm-js';
import type { IMisskeyMessage } from '~/models/instances/misskey/message';

const props = defineProps<
  MfmEmojiCode['props'] & {
    baseUrl: IMisskeyMessage['via']['instance']['baseUrl'];
  }
>();

const emojiStripped = computed(() => props.name.replaceAll(':', ''));
const emojiName = computed(() => emojiStripped.value.replace('@.', ''));
const emojiUrl = computed(
  () => `${props.baseUrl}/emoji/${emojiName.value}.webp`,
);
</script>
