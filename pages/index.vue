<template>
  <div>
    <template v-if="orderedLoginUsers?.length">
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
    </template>

    <CommonModal />
    <CommonToast />
  </div>
</template>

<script setup lang="ts">
const { orderedLoginUsers } = storeToRefs(useLoginUsersStore());
const { timelines } = storeToRefs(useTimelinesStore());

// orderedLoginUsers.valueは読み込み中はundefined
watch(
  () => orderedLoginUsers.value,
  () => {
    if (orderedLoginUsers.value?.length === 0) {
      useModalsStore().add(
        resolveComponent('CommonModalLogin'),
        {},
        { closable: false },
      );
    }
  },
);
</script>
