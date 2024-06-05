<template>
  <div v-if="mediaList.length" class="relative">
    <div class="grid gap-1 h-full w-full" :class="gridClass">
      <template
        v-for="(media, index) in mediaList.slice(0, displayCount)"
        :key="media"
      >
        <TimelineItemMediaItem
          :media="media"
          :class="itemClass"
          @click="openModal(index)"
        />
      </template>
    </div>
    <button
      v-if="mediaList.length > displayCount"
      class="badge badge-primary cursor-pointer absolute -bottom-1 right-0"
      @click="expand"
    >
      +{{ mediaList.length - displayCount }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { IMedia } from '~/models/common/media';

const props = defineProps<{
  mediaList: IMedia[];
}>();

const displayCount = ref(4);

const gridClass = computed(() =>
  props.mediaList.length === 1
    ? 'grid-cols-1 grid-rows-1 aspect-video'
    : props.mediaList.length < 4
      ? 'grid-cols-2 aspect-video'
      : 'grid-cols-2',
);

const itemClass = computed(() =>
  props.mediaList.length === 3
    ? 'first:row-span-2 aspect-video first:aspect-auto'
    : props.mediaList.length > 3
      ? 'aspect-video'
      : '',
);

const expand = () => {
  displayCount.value = props.mediaList.length;
};

const mediaModalStore = useMediaModalStore();
const openModal = (index: number) => {
  mediaModalStore.open(props.mediaList, index);
};
</script>
