<template>
  <CommonTimelineItemContainer
    :user="actualItem.user"
    :created-at="actualItem.createdAt"
  >
    <template #undericon>
      <div class="flex flex-col items-end mt-1">
        <div v-if="item.body.reason" class="indicator">
          <span
            class="indicator-item indicator-bottom indicator-start badge badge-primary px-0 w-5 h-5"
          >
            <span class="material-symbols-outlined text-base">sync</span>
          </span>
          <CommonPartsRoundedIcon
            :icon-url="(item.body.reason?.by as any).avatar"
            class="w-6 h-6"
          />
        </div>
      </div>
    </template>

    <p class="w-full break-words text-sm">
      {{ (actualItem.body.post.record as any).text }}
    </p>

    <CommonTimelineItemMedia :media-list="mediaList" />

    <template #footer>
      <div class="flex gap-x-1 mt-1">
        <button type="button" class="btn btn-xs btn-ghost" tabindex="-1">
          <span class="material-symbols-outlined text-base">reply</span>
        </button>
        <button
          type="button"
          class="btn btn-xs btn-ghost"
          :class="{ 'text-yellow-500': cachedReposted }"
          tabindex="-1"
          @click="toggleRepost"
        >
          <span class="material-symbols-outlined text-base">
            {{ cachedReposted ? 'published_with_changes' : 'sync' }}
          </span>
          <span v-if="actualItem.body.post.repostCount">
            {{ actualItem.body.post.repostCount }}
          </span>
        </button>
        <button
          type="button"
          class="btn btn-xs btn-ghost"
          :class="{ 'text-yellow-500': cachedLiked }"
          tabindex="-1"
          @click="toggleLike"
        >
          <span
            class="material-symbols-outlined text-base"
            :class="{ filled: cachedLiked }"
          >
            favorite
          </span>
          <span v-if="actualItem.body.post.likeCount">
            {{ actualItem.body.post.likeCount }}
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
import type { IBlueskyMessage } from '~/models/instances/bluesky/message';

const props = defineProps<{
  item: IBlueskyMessage;
}>();

const actualItem = computed(() => props.item);

const cachedReposted = ref(props.item.body.post.viewer?.repost);
const cachedLiked = ref(props.item.body.post.viewer?.like);

const toggleRepost = async () => {
  try {
    if (cachedReposted.value) {
      await useApiClientsStore()
        .get<'bluesky'>(props.item.via)
        .deleteRepost(cachedReposted.value);
      cachedReposted.value = undefined;
    } else {
      const ret = await useApiClientsStore()
        .get<'bluesky'>(props.item.via)
        .repost(props.item.body.post.uri, props.item.body.post.cid);
      cachedReposted.value = ret.uri;
    }
  } catch {
    useToastsStore().add({
      text: 'failed to set repost',
      level: 'error',
    });
  }
};
const toggleLike = async () => {
  try {
    if (cachedLiked.value) {
      await useApiClientsStore()
        .get<'bluesky'>(props.item.via)
        .deleteLike(cachedLiked.value);
      cachedLiked.value = undefined;
    } else {
      const ret = await useApiClientsStore()
        .get<'bluesky'>(props.item.via)
        .like(props.item.body.post.uri, props.item.body.post.cid);
      cachedLiked.value = ret.uri;
    }
  } catch {
    useToastsStore().add({
      text: 'failed to set like',
      level: 'error',
    });
  }
};

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
