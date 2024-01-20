<template>
  <CommonTimelineItemContainer
    :user="actualItem.user"
    :created-at="actualItem.createdAt"
  >
    <template #undericon>
      <div class="flex flex-col items-end mt-1">
        <div v-if="item.body.reblog" class="indicator">
          <span
            class="indicator-item indicator-bottom indicator-start badge badge-primary px-0 w-5 h-5"
          >
            <span class="material-symbols-outlined text-base">sync</span>
          </span>
          <CommonPartsRoundedIcon
            :icon-url="item.user.iconUrl"
            class="w-6 h-6"
          />
        </div>
      </div>
    </template>

    <p class="w-full break-words text-sm">
      {{ (actualItem.body.post.record as any).text }}
    </p>
  </CommonTimelineItemContainer>
</template>

<script setup lang="ts">
import type { IBlueskyMessage } from '~/models/instances/bluesky/message';

const props = defineProps<{
  item: IBlueskyMessage;
}>();

const actualItem = computed(() => props.item);
</script>
