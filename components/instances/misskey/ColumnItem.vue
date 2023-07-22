<template>
  <CommonColumnItemContainer
    :icon-url="item.user.iconUrl"
    :display-name="item.user.displayName"
    :username="item.user.username"
    :created-at="item.createdAt"
  >
    <p class="w-full break-words">{{ item.text }}</p>

    <template #footer>
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
    </template>
  </CommonColumnItemContainer>
</template>

<script setup lang="ts">
import type { IMessage } from '~/models/common/message';

defineProps<{
  item: IMessage;
}>();
</script>
