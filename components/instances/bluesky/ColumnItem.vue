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

    <CommonTimelineItemMedia :media-list="mediaList" />
  </CommonTimelineItemContainer>
</template>

<script setup lang="ts">
import type { IMedia } from '~/models/common/media';
import type { IBlueskyMessage } from '~/models/instances/bluesky/message';

const props = defineProps<{
  item: IBlueskyMessage;
}>();

const actualItem = computed(() => props.item);

const mediaList = computed<IMedia[]>(() => {
  const images = actualItem.value.body.post.embed?.images;
  if (!images || !Array.isArray(images)) {
    return [];
  }

  return images.map(
    (image) =>
      ({
        type: 'image',
        detailedType: '',
        thumbnailUrl: image.thumb,
        url: image.fullsize,
        sensitive: false,
      }) as IMedia,
  );
});
</script>
