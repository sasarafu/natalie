<template>
  <div>
    <template v-if="orderedLoginUsers?.length">
      <div class="flex gap-x-1 h-screen w-screen bg-base-300">
        <CommonSidebar />
        <div class="flex-auto flex gap-x-1 overflow-x-auto">
          <CommonTimeline
            v-for="timeline in timelines"
            :key="timeline.id"
            :timeline="timeline"
          />
          <CommonMenu class="ml-auto" />
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
