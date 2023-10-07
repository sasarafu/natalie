<template>
  <ul v-if="reactionsArray.length > 0" class="flex flex-wrap gap-x-1">
    <li
      v-for="reaction in shownReactions"
      :key="reaction.key"
      class="tooltip tooltip-bottom"
      :data-tip="reaction.key.replace('@.', '')"
    >
      <button
        class="btn btn-xs no-animation py-0.5 gap-x-1"
        tabindex="-1"
        :class="[reaction.key === myReaction ? 'btn-accent' : 'btn-neutral']"
      >
        <MisskeyEmoji
          :emoji="reaction.key"
          :base-url="baseUrl"
          class="text-sm"
        />
        {{ reaction.count }}
      </button>
    </li>
    <li v-if="reactionsArray.length > REACTIONS_LIMIT && !isShowAll">
      <button
        class="btn btn-xs btn-accent btn-outline no-animation"
        tabindex="-1"
        @click="showMore"
      >
        +{{ reactionsArray.length - REACTIONS_LIMIT }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { IMisskeyMessage } from '~/models/instances/misskey/message';

const props = defineProps<{
  reactions: IMisskeyMessage['body']['reactions'];
  myReaction: IMisskeyMessage['body']['myReaction'];
  baseUrl: IMisskeyMessage['via']['instance']['baseUrl'];
}>();

const REACTIONS_LIMIT = 10;
const isShowAll = ref(false);

const reactionsArray = computed(() =>
  Object.keys(props.reactions)
    .map((key) => {
      return {
        key,
        count: props.reactions[key],
      };
    })
    .sort((left, right) => right.count - left.count),
);

const shownReactions = computed(() =>
  isShowAll.value
    ? reactionsArray.value
    : reactionsArray.value.slice(0, REACTIONS_LIMIT),
);

const showMore = () => {
  isShowAll.value = true;
};
</script>
