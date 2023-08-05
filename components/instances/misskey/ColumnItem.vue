<template>
  <CommonColumnItemContainer
    :icon-url="body.user.avatarUrl"
    :display-name="body.user.name ?? body.user.username"
    :username="body.user.username"
    :created-at="item.createdAt"
  >
    <template #undericon>
      <div v-if="item.body.renote" class="flex items-center">
        <span class="material-symbols-outlined text-sm">autorenew</span>
        <CommonPartsRoundedIcon :icon-url="item.user.iconUrl" class="w-5 h-5" />
      </div>
    </template>

    <p v-if="body.text" class="w-full break-words text-sm">
      {{ body.text }}
    </p>

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
import type { IMisskeyMessage } from '~/models/instances/misskey/message';

const props = defineProps<{
  item: IMisskeyMessage;
}>();

// renoteの場合、本文はrenote以下にある
const body = computed(() => props.item.body.renote ?? props.item.body);
</script>
