<template>
  <section>
    <CommonContainer class="h-full w-[330px] bg-base-100">
      <template #header>
        <header class="flex flex-col bg-neutral px-3">
          <div class="flex items-center h-12 py-2">
            <p class="text-lg font-bold flex-auto">{{ timeline.name }}</p>
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
          <MisskeyColumnItem
            v-if="item.user.instance.type == 'misskey'"
            :item="item"
            :now="now"
          />
          <MastodonColumnItem
            v-if="item.user.instance.type == 'mastodon'"
            :item="item"
            :now="now"
          />
        </template>
      </div>
    </CommonContainer>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDatasources } from '~/stores/datasources';
import { useLoginUsers } from '~/stores/loginUsers';
import type { ITimeline } from '~/models/common/timeline';

const props = defineProps<{
  timeline: ITimeline;
}>();

const { $repositories } = useNuxtApp();

const { datasources } = storeToRefs(useDatasources());
const items = computed(() => datasources.value[props.timeline.id]);

const { loginUsers } = storeToRefs(useLoginUsers());
const user = loginUsers.value[props.timeline.query.user];

const isDetailExpanded = ref<boolean>(false);
const now = ref<number>(Date.now());

const toggleDetail = () => {
  isDetailExpanded.value = !isDetailExpanded.value;
};

datasources.value[props.timeline.id] = [];
useAsyncData(async () => {
  try {
    const messages = await $repositories(user.instance.type).getTimeline(
      props.timeline.query,
      user,
    );
    datasources.value[props.timeline.id].push(...messages);
  } catch {}
});

setInterval(() => {
  now.value = Date.now();
}, 1000);
</script>
