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

    <p class="w-full break-words text-sm" v-html="sanitizedHTML"></p>

    <CommonTimelineItemMedia :media-list="mediaList" />

    <template #footer>
      <div class="flex gap-x-1 mt-1">
        <button type="button" class="btn btn-xs btn-ghost" tabindex="-1">
          <span class="material-symbols-outlined text-base">reply</span>
        </button>
        <button
          type="button"
          class="btn btn-xs btn-ghost"
          :class="{ 'text-yellow-500': cachedBoosted }"
          tabindex="-1"
          @click="toggleBoost"
        >
          <span class="material-symbols-outlined text-base">
            {{ cachedBoosted ? 'published_with_changes' : 'sync' }}
          </span>
          <span v-if="actualItem.body.reblogsCount > 0">
            {{ actualItem.body.reblogsCount }}
          </span>
        </button>
        <button
          type="button"
          class="btn btn-xs btn-ghost"
          tabindex="-1"
          @click="toggleFavorite"
        >
          <span
            class="material-symbols-outlined text-base"
            :class="{ 'filled text-yellow-500': cachedFavourited }"
          >
            star
          </span>
        </button>
        <button type="button" class="btn btn-xs btn-ghost" tabindex="-1">
          <span class="material-symbols-outlined text-base">more_horiz</span>
        </button>
      </div>
    </template>
  </CommonTimelineItemContainer>
</template>

<script setup lang="ts">
import type { IMedia } from '~/models/common/media';
import type { IMastodonMessage } from '~/models/instances/mastodon/message';

const props = defineProps<{
  item: IMastodonMessage;
}>();

const actualItem = computed(() =>
  props.item.body.reblog
    ? mastodonConverter.statusToMessage(props.item.body.reblog, props.item.via)
    : props.item,
);
const sanitizedHTML = computed(() =>
  sanitizeHTML(actualItem.value.body.content),
);

const mediaList = computed<IMedia[]>(() =>
  actualItem.value.body.mediaAttachments
    .filter((media) => media.type !== 'unknown')
    .map<IMedia>((file) => ({
      type: file.type === 'gifv' ? 'image' : (file.type as IMedia['type']),
      detailedType: file.type,
      thumbnailUrl: file.previewUrl,
      url: file.url ?? file.previewUrl,
      sensitive: actualItem.value.body.sensitive,
    })),
);

const cachedBoosted = ref(actualItem.value.body.reblogged);
const toggleBoost = async () => {
  try {
    if (cachedBoosted.value) {
      await useApiClientsStore()
        .get<'mastodon'>(props.item.via)
        .api.v1.statuses.$select(actualItem.value.id)
        .unreblog();
      cachedBoosted.value = false;
    } else {
      await useApiClientsStore()
        .get<'mastodon'>(props.item.via)
        .api.v1.statuses.$select(actualItem.value.id)
        .reblog();
      cachedBoosted.value = true;
    }
  } catch {
    useToastsStore().add({
      text: 'failed to set boost',
      level: 'error',
    });
  }
};

// favouriteの結果をローカルでキャッシュ(Mastodonはこのままでいいかも)
const cachedFavourited = ref(actualItem.value.body.favourited);

const toggleFavorite = async () => {
  try {
    if (cachedFavourited.value) {
      await useApiClientsStore()
        .get<'mastodon'>(props.item.via)
        .api.v1.statuses.$select(actualItem.value.id)
        .unfavourite();
      cachedFavourited.value = false;
    } else {
      await useApiClientsStore()
        .get<'mastodon'>(props.item.via)
        .api.v1.statuses.$select(actualItem.value.id)
        .favourite();
      cachedFavourited.value = true;
    }
  } catch {
    useToastsStore().add({
      text: 'failed to set favorite',
      level: 'error',
    });
  }
};
</script>
