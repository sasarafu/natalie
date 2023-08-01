<template>
  <section>
    <CommonContainer
      class="h-full w-[330px] bg-base-100"
      @top="(value) => (isTop = value)"
      @bottom="loadPast"
    >
      <template #header>
        <header class="flex flex-col bg-neutral px-3">
          <div class="flex items-center h-12 py-2 gap-x-1">
            <CommonPartsRoundedIcon :icon-url="user.iconUrl" class="w-8 h-8" />
            <p class="text-base font-semibold flex-auto">{{ timeline.name }}</p>

            <button
              type="button"
              class="btn btn-ghost btn-square btn-sm w-fit"
              tabindex="-1"
              @click="toggleDetail"
            >
              <span class="material-symbols-outlined text-lg">
                {{ isDetailExpanded ? 'expand_less' : 'expand_more' }}
              </span>
            </button>
          </div>

          <div v-if="isDetailExpanded">
            <CommonColumnTimelineConfig :timeline="timeline" />
          </div>
        </header>
      </template>

      <div class="divide-y divide-dashed divide-neutral">
        <template v-for="item in items" :key="item.id">
          <!-- コンポーネントにnowは不要だが、つけることで相対時間の更新ができる -->
          <component
            :is="columnItemComponents[item.user.instance.type]"
            :item="item"
            :now="now"
          />
        </template>
      </div>

      <template v-if="isLoadable" #loading>
        <div class="p-3 text-center">
          <!-- 1度読み込んだ後にまだ画面上にあった場合、再ロードされないのでボタンで手動ロードできるようにしておく -->
          <div class="tooltip tooltip-bottom" data-tip="クリックして更新">
            <button @click="loadPast">
              <span class="loading loading-spinner"></span>
            </button>
          </div>
        </div>
      </template>
    </CommonContainer>
  </section>
</template>

<script setup lang="ts">
import type { IMessage } from '~/models/common/message';
import type { ITimeline } from '~/models/common/timeline';

const props = defineProps<{
  timeline: ITimeline;
}>();

const columnItemComponents = {
  mastodon: resolveComponent('MastodonColumnItem'),
  misskey: resolveComponent('MisskeyColumnItem'),
};

const { datasources } = storeToRefs(useDatasourcesStore());
datasources.value[props.timeline.id] = [];
const items = computed(() => datasources.value[props.timeline.id]);

const { loginUsers } = storeToRefs(useLoginUsersStore());
const user = computed(() => loginUsers.value[props.timeline.query.user]);

const isDetailExpanded = ref<boolean>(false);
const now = ref<number>(Date.now());

const toggleDetail = () => {
  isDetailExpanded.value = !isDetailExpanded.value;
};

// ロード
const isLoadable = ref(true);
const isLoading = ref(false);
const isTop = ref(true);

const loadPast = async () => {
  if (isLoading.value || !isLoadable.value) {
    return;
  }

  isLoading.value = true;
  try {
    const messages = await getTimeline(props.timeline, {
      untilId: items.value.slice(-1)?.[0]?.id,
    });
    items.value.push(...messages);

    // レスポンスがなければ無限スクロールを終了
    if (messages.length === 0) {
      isLoadable.value = false;
    }
  } catch {}
  isLoading.value = false;
};

onMounted(async () => {
  await useWebSocket(props.timeline, (message: IMessage) => {
    items.value.reverse().push(message);
    items.value.reverse();
    if (items.value.length > 40 && isTop.value) {
      items.value.length = 40;
    }
  });
});

setInterval(() => {
  now.value = Date.now();
}, 1000);
</script>
