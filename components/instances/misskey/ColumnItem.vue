<template>
  <CommonColumnItemContainer
    :user="actualItem.user"
    :created-at="actualItem.createdAt"
  >
    <template #undericon>
      <div class="flex flex-col items-end mt-1">
        <div v-if="item.body.renote" class="indicator">
          <span
            class="indicator-item indicator-bottom indicator-start badge badge-primary px-0 w-5 h-5"
          >
            <span class="material-symbols-outlined text-base">autorenew</span>
          </span>
          <CommonPartsRoundedIcon
            :icon-url="item.user.iconUrl"
            class="w-6 h-6"
          />
        </div>
      </div>
    </template>

    <div class="space-y-1">
      <p v-if="actualItem.body.text" class="w-full break-words text-sm">
        {{ actualItem.body.text }}
      </p>

      <CommonColumnItemMediaList :media-list="mediaList" />

      <MisskeyColumnItemReactions
        :reactions="reactionsArray"
        :my-reaction="cachedMyReaction"
        :base-url="item.via.instance.baseUrl"
        @select="(reaction, isCreate) => submitReaction(reaction, isCreate)"
      />
    </div>

    <template #footer>
      <div class="flex gap-x-1 mt-1">
        <span></span>
        <button type="button" class="btn btn-xs btn-ghost" tabindex="-1">
          <span class="material-symbols-outlined text-base">reply</span>
        </button>
        <button type="button" class="btn btn-xs btn-ghost" tabindex="-1">
          <span class="material-symbols-outlined text-base">autorenew</span>
        </button>
        <button
          type="button"
          class="btn btn-xs btn-ghost"
          tabindex="-1"
          :disabled="!!cachedMyReaction"
          @click="submitReaction('❤', true)"
        >
          <!-- TODO: emojiを選ぶのは実装コストが高い(エンドポイントがない？)ので、一旦favorite固定にしておく -->
          <span class="material-symbols-outlined text-base">favorite</span>
        </button>
        <button type="button" class="btn btn-xs btn-ghost" tabindex="-1">
          <span class="material-symbols-outlined text-base">more_horiz</span>
        </button>
      </div>
    </template>
  </CommonColumnItemContainer>
</template>

<script setup lang="ts">
import { mediaTypes, type IMedia } from '~/models/common/media';
import type { IMisskeyMessage } from '~/models/instances/misskey/message';

const props = defineProps<{
  item: IMisskeyMessage;
}>();

// renoteの場合、本文はrenote以下にある
const actualItem = computed(() =>
  props.item.body.renote
    ? misskeyConverter.noteToMessage(props.item.body.renote, props.item.via)
    : props.item,
);

const mediaList = computed<IMedia[]>(() =>
  actualItem.value.body.files
    .filter((file) =>
      mediaTypes.some((mediaType) => file.type.startsWith(mediaType)),
    )
    .map<IMedia>((file) => ({
      type: mediaTypes.find((mediaType) => file.type.startsWith(mediaType))!,
      detailedType: file.type,
      thumbnailUrl: file.thumbnailUrl ?? file.url,
      url: file.url,
      sensitive: file.isSensitive,
    })),
);

// TODO: noteごとにWebSocketを張って更新を受け取るのが望ましいが、実装が大変なのでローカルで変更をキャッシュ
const cachedMyReaction = ref(actualItem.value.body.myReaction);
const reactionsArray = computed(() => {
  const reactions = Object.keys(actualItem.value.body.reactions)
    .map((key) => {
      const reactionCount = actualItem.value.body.reactions[key];
      return {
        key,
        count:
          cachedMyReaction.value === actualItem.value.body.myReaction
            ? reactionCount
            : key === cachedMyReaction.value
            ? reactionCount + 1
            : key === actualItem.value.body.myReaction
            ? reactionCount - 1
            : reactionCount,
      };
    })
    .filter((reaction) => reaction.count !== 0);

  if (
    cachedMyReaction.value &&
    reactions.findIndex((el) => el.key === cachedMyReaction.value) < 0
  ) {
    reactions.push({ key: cachedMyReaction.value, count: 1 });
  }

  return reactions.sort((left, right) => right.count - left.count);
});

const submitReaction = async (reaction: string, isCreate: boolean) => {
  try {
    if (isCreate) {
      await useApiClientsStore()
        .get<'misskey'>(props.item.via)
        .api.request('notes/reactions/create', {
          noteId: actualItem.value.id,
          reaction,
        });
      cachedMyReaction.value = reaction;
    } else {
      await useApiClientsStore()
        .get<'misskey'>(props.item.via)
        .api.request('notes/reactions/delete', {
          noteId: actualItem.value.id,
        });
      cachedMyReaction.value = undefined;
    }
  } catch {
    toastsStore().add({
      text: 'failed to set reaction',
      level: 'error',
    });
  }
};
</script>
