<template>
  <article class="flex gap-x-2 p-2">
    <div class="flex-none">
      <a href="#" tabindex="-1">
        <img
          :src="item.user.iconUrl"
          class="w-9 h-9 rounded-full"
          draggable="false"
        />
      </a>
    </div>
    <div class="flex-auto min-w-0">
      <header class="flex gap-x-1 items-end">
        <a href="#" tabindex="-1" class="flex-initial shrink-[99999] truncate">
          <span class="font-bold">{{ item.user.displayName }}</span>
        </a>
        <small class="flex-auto truncate">@{{ item.user.id }}</small>
        <small class="flex-none">
          {{ useRelativeTime(item.createdAt) }}
        </small>
      </header>

      <p class="w-full break-words">{{ item.text }}</p>

      <div class="flex gap-x-1 mt-1">
        <span></span>
        <button type="button" class="btn btn-xs btn-ghost" tabindex="-1">
          <span class="material-symbols-outlined text-base">reply</span>
        </button>
        <button type="button" class="btn btn-xs btn-ghost" tabindex="-1">
          <span class="material-symbols-outlined text-base">autorenew</span>
        </button>
        <button type="button" class="btn btn-xs btn-ghost" tabindex="-1">
          <span class="material-symbols-outlined text-base">star</span>
        </button>
        <button type="button" class="btn btn-xs btn-ghost" tabindex="-1">
          <span class="material-symbols-outlined text-base">more_horiz</span>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { IMessage } from '~/models/common/message';

defineProps<{
  item: IMessage;
}>();
</script>
