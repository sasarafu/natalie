<template>
  <ul v-if="reactions.length > 0" class="flex flex-wrap gap-x-1">
    <li
      v-for="reaction in shownReactions"
      :key="reaction.key"
      class="dropdown dropdown-top dropdown-center dropdown-hover"
    >
      <button
        class="btn btn-xs no-animation py-0.5 gap-x-1"
        tabindex="-1"
        :class="[reaction.key === myReaction ? 'btn-accent' : 'btn-neutral']"
        @click="selectReaction(reaction.key)"
      >
        <MisskeyEmoji
          :emoji="reaction.key"
          :base-url="baseUrl"
          class="text-sm"
        />
        {{ reaction.count }}
      </button>
      <span
        v-if="reaction.key.startsWith(':')"
        class="dropdown-content pointer-events-none flex flex-col items-center bg-neutral p-2 rounded-lg z-10"
      >
        <span class="h-10">
          <MisskeyEmoji :emoji="reaction.key" :base-url="baseUrl" />
        </span>
        <span class="text-sm">
          {{ reaction.key.replace('@.', '') }}
        </span>
      </span>
    </li>
    <li v-if="reactions.length > REACTIONS_LIMIT && !isShowAll">
      <button
        class="btn btn-xs btn-accent btn-outline no-animation"
        tabindex="-1"
        @click="showMore"
      >
        +{{ reactions.length - REACTIONS_LIMIT }}
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { IMisskeyMessage } from '~/models/instances/misskey/message';

const props = defineProps<{
  reactions: { key: string; count: number }[];
  myReaction: IMisskeyMessage['body']['myReaction'];
  baseUrl: IMisskeyMessage['via']['instance']['baseUrl'];
}>();

const emits = defineEmits<{
  (e: 'select', reaction: string, isCreate: boolean): void;
}>();

const REACTIONS_LIMIT = 10;
const isShowAll = ref(false);

const shownReactions = computed(() =>
  isShowAll.value ? props.reactions : props.reactions.slice(0, REACTIONS_LIMIT),
);

const showMore = () => {
  isShowAll.value = true;
};

const selectReaction = (reaction: string) => {
  emits('select', reaction, reaction !== props.myReaction);
  // クリック後にdropdownを非表示にするためblur
  (document.activeElement as HTMLElement | null)?.blur();
};
</script>

<style scoped>
.dropdown.dropdown-center > .dropdown-content {
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
}

.dropdown.dropdown-hover:hover > .dropdown-content {
  opacity: 0.9;
}
</style>
