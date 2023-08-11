<template>
  <div
    v-if="isVisible"
    class="w-full h-full relative cursor-zoom-in overflow-hidden"
    @click="$emit('click')"
  >
    <video
      v-if="media.type === 'video'"
      class="w-full h-full object-cover rounded"
      :poster="media.thumbnailUrl"
      preload="none"
      controls
      controlslist="nodownload"
      muted
    >
      <source :src="media.url" :type="media.detailedType" />
    </video>

    <img
      v-if="media.type === 'image'"
      :src="media.thumbnailUrl"
      class="w-full h-full object-cover rounded"
      draggable="false"
    />

    <div
      v-if="media.type === 'audio'"
      class="w-full h-full flex items-center rounded bg-neutral-focus"
    >
      <audio
        :src="media.thumbnailUrl"
        class="w-full"
        controls
        controlslist="nodownload"
      />
    </div>

    <button
      v-if="media.sensitive"
      type="button"
      class="btn btn-xs btn-square btn-neutral absolute right-1 top-1"
      @click.stop="isVisible = false"
    >
      <span class="material-symbols-outlined text-base">visibility_off</span>
    </button>
  </div>

  <button
    v-else
    type="button"
    class="w-full h-full rounded flex justify-center items-center bg-neutral"
    @click="isVisible = true"
  >
    <span class="">sensitive</span>
  </button>
</template>

<script setup lang="ts">
import type { IMedia } from '~/models/common/media';

const props = defineProps<{
  media: IMedia;
}>();

defineEmits<{
  (e: 'click'): void;
}>();

const isVisible = ref(true);

onMounted(() => {
  isVisible.value = !props.media.sensitive;
});
</script>
