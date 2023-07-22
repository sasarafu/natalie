<template>
  <div>
    <template v-if="loginUsers.length">
      <div class="flex gap-x-1 h-screen w-screen bg-base-300">
        <CommonSidebar />
        <div class="flex-auto flex gap-x-1 overflow-x-auto">
          <CommonColumnTimeline
            v-for="timeline in timelines"
            :key="timeline.id"
            :column-name="timeline.name"
            :items="datasources[timeline.id]"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDatasources } from '~/stores/datasources';
import { useLoginUsers } from '~/stores/loginUsers';
import { useTimelines } from '~/stores/timelines';

const { datasources } = storeToRefs(useDatasources());
const { loginUsers } = storeToRefs(useLoginUsers());
const { timelines } = storeToRefs(useTimelines());

if (loginUsers.value.length === 0) {
  navigateTo('/login');
}

// initialize timelines
timelines.value.forEach((timeline) => {
  datasources.value[timeline.id] = [];
});
</script>
