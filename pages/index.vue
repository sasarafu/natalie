<template>
  <div>
    <template v-if="orderedLoginUsers?.length > 0">
      <div class="flex gap-1 h-screen w-screen bg-base-300 max-sm:flex-col">
        <CommonSidebar class="max-sm:order-last" />
        <div
          class="flex-auto flex gap-x-1 overflow-x-auto overscroll-none max-sm:snap-x max-sm:snap-mandatory"
        >
          <CommonTimeline
            v-for="timeline in timelines"
            :key="timeline.id"
            :timeline="timeline"
            class="max-sm:snap-center max-sm:max-w-[100dvw]"
          />
          <CommonMenu class="ml-auto max-sm:snap-end" />
        </div>
      </div>

      <CommonModalMedia
        v-if="media"
        :media-list="media.mediaList"
        :initial="media.initial"
        @close="mediaModalStore.close"
      />
    </template>

    <CommonModal />
    <CommonToast />

    <!-- 初回ログインモーダル -->
    <CommonModalLogin v-if="orderedLoginUsers?.length === 0" />
  </div>
</template>

<script setup lang="ts">
// orderedLoginUsers.valueは、undefinedでなく配列長が1以上であることを確認する
const { orderedLoginUsers } = storeToRefs(useLoginUsersStore());
const { timelines } = storeToRefs(useTimelinesStore());

const mediaModalStore = useMediaModalStore();
const { media } = storeToRefs(mediaModalStore);
</script>
