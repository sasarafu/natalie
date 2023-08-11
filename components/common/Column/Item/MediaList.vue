<template>
  <div v-if="mediaList.length" class="relative">
    <div class="grid gap-1 aspect-video" :class="gridClass">
      <template v-for="media in mediaList.slice(0, 4)" :key="media">
        <CommonColumnItemMedia
          :media="media"
          :class="{ 'first:row-span-2': mediaList.length === 3 }"
        />
      </template>
    </div>
    <span
      v-if="mediaList.length > 4"
      class="badge badge-primary absolute -bottom-2.5 right-0"
    >
      +{{ mediaList.length - 4 }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { IMedia } from '~/models/common/media';

const props = defineProps<{
  mediaList: IMedia[];
}>();

const gridClass =
  props.mediaList.length === 1
    ? 'grid-cols-1 grid-rows-1'
    : props.mediaList.length === 2
    ? 'grid-cols-2 grid-rows-1'
    : 'grid-cols-2 grid-rows-2';
</script>
