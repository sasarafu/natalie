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
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoginUsers } from '~/stores/loginUsers';
import { useTimelines } from '~/stores/timelines';

const { orderedLoginUsers } = storeToRefs(useLoginUsers());
const { timelines } = storeToRefs(useTimelines());

if (orderedLoginUsers.value.length === 0) {
  navigateTo('/login');
}
</script>
