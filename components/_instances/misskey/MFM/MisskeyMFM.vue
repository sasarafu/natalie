<template>
  <template v-for="(node, _index) in parsed" :key="_index">
    <component
      :is="mfmComponents[node.type]"
      v-bind="node.props"
      :base-url="baseUrl"
    >
      <MisskeyMFM
        v-if="node.children"
        :value="node.children"
        :base-url="baseUrl"
      />
    </component>
  </template>
</template>

<script setup lang="ts">
import type { MfmNode } from 'mfm-js';
import { parse, parseSimple } from 'mfm-js';
import type { IMisskeyMessage } from '~/models/instances/misskey/message';
import {
  MisskeyMFMBlockCenter,
  MisskeyMFMBlockCode,
  MisskeyMFMBlockMath,
  MisskeyMFMBlockQuote,
  MisskeyMFMBlockSearch,
  MisskeyMFMInlineBold,
  MisskeyMFMInlineCode,
  MisskeyMFMInlineEmojiCode,
  MisskeyMFMInlineFn,
  MisskeyMFMInlineHashtag,
  MisskeyMFMInlineItalic,
  MisskeyMFMInlineLink,
  MisskeyMFMInlineMath,
  MisskeyMFMInlineMention,
  MisskeyMFMInlinePlain,
  MisskeyMFMInlineSmall,
  MisskeyMFMInlineStrike,
  MisskeyMFMInlineText,
  MisskeyMFMInlineUnicodeEmoji,
  MisskeyMFMInlineUrl,
} from '#components';

const props = withDefaults(
  defineProps<{
    value: string | MfmNode[];
    baseUrl: IMisskeyMessage['via']['instance']['baseUrl'];
    isSimple?: boolean;
  }>(),
  {
    isSimple: false,
  },
);

const parsed = computed(() =>
  typeof props.value === 'string'
    ? props.isSimple
      ? parseSimple(props.value)
      : parse(props.value)
    : props.value,
);

const mfmComponents: {
  [key in MfmNode['type']]: Component;
} = {
  quote: MisskeyMFMBlockQuote,
  search: MisskeyMFMBlockSearch,
  blockCode: MisskeyMFMBlockCode,
  mathBlock: MisskeyMFMBlockMath,
  center: MisskeyMFMBlockCenter,
  // ↑ block / ↓ inline
  unicodeEmoji: MisskeyMFMInlineUnicodeEmoji,
  emojiCode: MisskeyMFMInlineEmojiCode,
  bold: MisskeyMFMInlineBold,
  small: MisskeyMFMInlineSmall,
  italic: MisskeyMFMInlineItalic,
  strike: MisskeyMFMInlineStrike,
  inlineCode: MisskeyMFMInlineCode,
  mathInline: MisskeyMFMInlineMath,
  mention: MisskeyMFMInlineMention,
  hashtag: MisskeyMFMInlineHashtag,
  url: MisskeyMFMInlineUrl,
  link: MisskeyMFMInlineLink,
  fn: MisskeyMFMInlineFn,
  plain: MisskeyMFMInlinePlain,
  text: MisskeyMFMInlineText,
};
</script>
