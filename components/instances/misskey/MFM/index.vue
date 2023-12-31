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
  [key in MfmNode['type']]: ReturnType<typeof resolveComponent>;
} = {
  quote: resolveComponent('MisskeyMFMBlockQuote'),
  search: resolveComponent('MisskeyMFMBlockSearch'),
  blockCode: resolveComponent('MisskeyMFMBlockCode'),
  mathBlock: resolveComponent('MisskeyMFMBlockMath'),
  center: resolveComponent('MisskeyMFMBlockCenter'),
  // ↑ block / ↓ inline
  unicodeEmoji: resolveComponent('MisskeyMFMInlineUnicodeEmoji'),
  emojiCode: resolveComponent('MisskeyMFMInlineEmojiCode'),
  bold: resolveComponent('MisskeyMFMInlineBold'),
  small: resolveComponent('MisskeyMFMInlineSmall'),
  italic: resolveComponent('MisskeyMFMInlineItalic'),
  strike: resolveComponent('MisskeyMFMInlineStrike'),
  inlineCode: resolveComponent('MisskeyMFMInlineCode'),
  mathInline: resolveComponent('MisskeyMFMInlineMath'),
  mention: resolveComponent('MisskeyMFMInlineMention'),
  hashtag: resolveComponent('MisskeyMFMInlineHashtag'),
  url: resolveComponent('MisskeyMFMInlineUrl'),
  link: resolveComponent('MisskeyMFMInlineLink'),
  fn: resolveComponent('MisskeyMFMInlineFn'),
  plain: resolveComponent('MisskeyMFMInlinePlain'),
  text: resolveComponent('MisskeyMFMInlineText'),
};
</script>
