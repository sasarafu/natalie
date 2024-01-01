<template>
  <MisskeyMFMInlineEmojiCode
    v-if="emoji.startsWith(':')"
    :name="emoji"
    :base-url="baseUrl"
  />
  <MisskeyMFMInlineUnicodeEmoji v-else :emoji="emoji" :base-url="baseUrl" />
</template>

<!-- 絵文字を単体で利用するためのコンポーネント -->
<script setup lang="ts">
import type { IMisskeyMessage } from '~/models/instances/misskey/message';

defineProps<{
  emoji: string; // Unicode emoji (ex. ♡) / MFM (ex. :super_igyo:)
  baseUrl: IMisskeyMessage['via']['instance']['baseUrl'];
}>();
</script>
