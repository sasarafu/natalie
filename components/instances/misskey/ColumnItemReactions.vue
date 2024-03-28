<template>
  <div v-if="reactions.length > 0" class="flex flex-wrap gap-0.5">
    <button
      v-for="reaction in shownReactions"
      :key="reaction.key"
      class="btn btn-xs flex-nowrap py-0.5 gap-x-1 dropdown dropdown-top dropdown-center dropdown-hover inline-flex"
      tabindex="-1"
      :class="[
        reaction.key === myReaction ? 'btn-outline btn-success' : 'btn-neutral',
      ]"
      @click="selectReaction(reaction.key)"
    >
      <MisskeyMFMEmoji :emoji="reaction.key" :base-url="baseUrl" />
      {{ reaction.count }}

      <span
        v-if="reaction.key.startsWith(':')"
        class="dropdown-content pointer-events-none flex flex-col items-center bg-neutral p-2 rounded-lg z-10"
      >
        <span class="h-8 w-max">
          <MisskeyMFMEmoji :emoji="reaction.key" :base-url="baseUrl" />
        </span>
        <span class="text-sm text-base-content">
          {{ reaction.key.replace('@.', '') }}
        </span>
      </span>
    </button>
    <button
      v-if="reactions.length > REACTIONS_LIMIT && !isShowAll"
      class="btn btn-xs btn-outline no-animation"
      tabindex="-1"
      @click="showMore"
    >
      +{{ reactions.length - REACTIONS_LIMIT }}
    </button>
  </div>
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
