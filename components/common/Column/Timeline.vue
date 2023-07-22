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

          <div v-if="isDetailExpanded" class="py-2">
            <!-- そのうち作る -->
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
import type { ITimeline } from '~/models/common/timeline';

const props = defineProps<{
  timeline: ITimeline;
}>();

const { datasources } = storeToRefs(useDatasources());
const items = computed(() => datasources.value[props.timeline.id]);

const isDetailExpanded = ref<boolean>(false);
const now = ref<number>(Date.now());

const toggleDetail = () => {
  isDetailExpanded.value = !isDetailExpanded.value;
};

setInterval(() => {
  now.value = Date.now();
}, 1000);
</script>
