<template>
  <div>
    <template v-if="orderedLoginUsers.length">
      <div class="flex gap-x-1 h-screen w-screen bg-base-300">
        <CommonSidebar />
        <div class="flex-auto flex gap-x-1 overflow-x-auto">
          <CommonColumnTimeline
            v-for="timeline in timelines"
            :key="timeline.id"
            :timeline="timeline"
          />
          <CommonColumnMenu class="ml-auto" />
        </div>
      </div>

      <CommonModals />
      <CommonToasts />
    </template>
  </div>
</template>

<script setup lang="ts">
const { orderedLoginUsers } = storeToRefs(useLoginUsersStore());
const { timelines } = storeToRefs(useTimelinesStore());

if (orderedLoginUsers.value.length === 0) {
  navigateTo('/login');
}
</script>
