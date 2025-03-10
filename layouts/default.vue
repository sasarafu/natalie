<template>
  <div class="flex h-dvh w-dvw gap-2">
    <Sidebar class="flex-none" />
    <main class="grow overflow-x-auto flex h-full gap-1">
      <Timeline
        v-for="timeline in timelines"
        :key="timeline.id"
        :timeline="timeline"
      />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const timelines = useTimelinesStore;
</script>
