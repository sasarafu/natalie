<template>
  <section v-if="user">
    <CommonPartsContainer
      class="h-full w-[330px] bg-base-100"
      @top="atTop"
      @bottom="loadPast"
    >
      <template #header>
        <header class="flex flex-col bg-neutral px-3">
          <div
            class="flex items-center h-12 py-2 gap-x-1 border-t-2 border-accent"
            :class="{
              'cursor-pointer': !isTop,
              'border-transparent': !queuingItems.length,
            }"
            @click="scrollup"
          >
            <CommonPartsRoundedIcon :icon-url="user.iconUrl" class="w-8 h-8" />
            <p class="text-base font-semibold flex-auto">{{ timeline.name }}</p>

            <button
              type="button"
              class="btn btn-ghost btn-square btn-sm w-fit"
              tabindex="-1"
              @click.stop="toggleDetail"
            >
              <span class="material-symbols-outlined text-lg">
                {{ isDetailExpanded ? 'expand_less' : 'expand_more' }}
              </span>
            </button>
          </div>

          <div v-if="isDetailExpanded">
            <CommonTimelineConfig :timeline="timeline" />
          </div>
        </header>
      </template>

      <div
        ref="body"
        class="divide-y divide-dashed divide-neutral overflow-hidden"
      >
        <template
          v-for="(item, index) in items.slice().reverse()"
          :key="item.id"
        >
          <component
            :is="columnItemComponents[item.via.instance.type]"
            :item="item"
            :is-last="index === items.length - 1"
          />
        </template>
      </div>

      <template v-if="isLoadable" #loading>
        <div class="p-3 text-center">
          <span v-if="isLoading" class="loading loading-spinner"></span>
          <button v-else class="btn btn-neutral btn-sm" @click="loadPast">
            <!-- 1度読み込んだ後にまだ画面上にあった場合、再ロードされないのでボタンで手動ロードできるようにしておく -->
            <span>load more</span>
          </button>
        </div>
      </template>
    </CommonPartsContainer>
  </section>
</template>

<script setup lang="ts">
import type { IMessage } from '~/models/common/message';
import type { ITimeline } from '~/models/common/timeline';
import type { IBlueskyMessage } from '~/models/instances/bluesky/message';

const ITEM_COUNT_LIMIT = 40;

const props = defineProps<{
  timeline: ITimeline;
}>();

const notification = useNotification();

const columnItemComponents = {
  bluesky: resolveComponent('BlueskyColumnItem'),
  mastodon: resolveComponent('MastodonColumnItem'),
  misskey: resolveComponent('MisskeyColumnItem'),
};

const items = ref<IMessage[]>([]);
const queuingItems = ref<IMessage[]>([]);

const { loginUsers } = storeToRefs(useLoginUsersStore());
const user = computed(() => loginUsers.value[props.timeline.query.user]);

const isDetailExpanded = ref<boolean>(false);
const toggleDetail = () => {
  isDetailExpanded.value = !isDetailExpanded.value;
};

const body = ref<HTMLElement>();
const scrollup = () => {
  body.value?.scrollIntoView({ behavior: 'smooth' });
};

// ロード
const isLoadable = ref(true);
const isLoading = ref(false);
const isTop = ref(true);

const limitItemCount = (target: Ref<IMessage[]>) => {
  if (target.value.length > ITEM_COUNT_LIMIT) {
    target.value = target.value.slice(-ITEM_COUNT_LIMIT);
  }
};

const atTop = (value: boolean) => {
  isTop.value = value;
};

const loadPast = async () => {
  if (isLoading.value || !isLoadable.value) {
    return;
  }

  isLoading.value = true;

  try {
    const messages = await getTimeline(props.timeline, {
      untilId:
        (items.value[0] as IBlueskyMessage)?.cursor ?? items.value[0]?.id,
    });

    console.log(messages)
    items.value.reverse().push(...messages);
    items.value.reverse();

    // レスポンスがなければ無限スクロールを終了
    if (messages.length === 0) {
      isLoadable.value = false;
    }
  } catch {}

  isLoading.value = false;
};

onMounted(async () => {
  await useWebSocket(props.timeline, (message: IMessage) => {
    if (
      items.value.find((item) => item.id === message.id) ||
      queuingItems.value.find((item) => item.id === message.id)
    ) {
      return;
    }

    // 通知設定がオン かつ 自分自身のものでないとき、通知する
    if (props.timeline.notify && message.user.userid !== user.value.userid) {
      console.log(message.user.userid, user.value.userid);

      notification.notify({
        title: message.summary.username,
        body: message.summary.message,
        icon: message.summary.iconUrl,
      });
    }

    if (isTop.value) {
      // スクロールしていないときは直接追加
      items.value.push(message);
      limitItemCount(items);
    } else {
      // スクロール中はキューに追加
      queuingItems.value.push(message);
      limitItemCount(queuingItems);
    }
  });
});

watch(
  () => isTop.value,
  () => {
    // 上に戻ってきたらキューを追加
    if (isTop.value) {
      items.value.push(...queuingItems.value);
      limitItemCount(items);
      queuingItems.value.length = 0;
    }
  },
);
</script>
