<template>
  <span v-if="emoji.startsWith(':')" class="h-full">
    <MisskeyMFMInlineEmojiCode :name="emoji" :base-url="baseUrl" />
  </span>
  <MisskeyMFMInlineUnicodeEmoji v-else :emoji="emoji" :base-url="baseUrl" />
</template>

<!--
  絵文字を単体で利用するためのコンポーネント
  flex直下で使われた場合、EmojiCodeのimgがSafariで歪むことがあるのでラップしておく
-->
<script setup lang="ts">
import type { IMisskeyMessage } from '~/models/instances/misskey/message';

defineProps<{
  emoji: string; // Unicode emoji (ex. ♡) / MFM (ex. :super_igyo:)
  baseUrl: IMisskeyMessage['via']['instance']['baseUrl'];
}>();
</script>
