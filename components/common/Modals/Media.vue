<template>
  <div
    ref="modalMedia"
    class="h-full w-fit flex flex-col justify-center outline-none relative"
    tabindex="0"
    @keydown.right="goNext"
    @keydown.left="goPrev"
  >
    <video
      v-if="current.type === 'video'"
      :src="current.url"
      class="max-h-full max-w-full"
      controls
      controlslist="nodownload"
      autoplay
    >
      <source :src="current.url" :type="current.detailedType" />
    </video>
    <img
      v-if="current.type === 'image'"
      :src="current.url"
      class="max-h-full max-w-full"
      draggable="false"
    />
    <audio
      v-if="current.type === 'audio'"
      :src="current.url"
      class="max-h-full max-w-full"
      controls
      controlslist="nodownload"
      autoplay
    />

    <div
      v-if="mediaList.length > 1"
      class="btm-nav btm-nav-xs justify-center opacity-20 hover:opacity-75 transition-opacity absolute"
    >
      <button class="flex-none" @click="goPrev">
        <span class="material-symbols-outlined">arrow_back_ios_new</span>
      </button>
      <div class="w-24 flex-none">{{ index + 1 }} / {{ mediaList.length }}</div>
      <button class="flex-none" @click="goNext">
        <span class="material-symbols-outlined">arrow_forward_ios</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMedia } from '~/models/common/media';

const props = defineProps<{
  mediaList: IMedia[];
  initial: number;
}>();

const modalMedia = ref<HTMLElement>();

const index = shallowRef(0);
const current = computed(() => props.mediaList[index.value]);

const goNext = () => {
  index.value = (index.value + 1) % props.mediaList.length;
};
const goPrev = () => {
  index.value =
    (props.mediaList.length + index.value - 1) % props.mediaList.length;
};

onMounted(() => {
  index.value = props.initial;
  modalMedia.value?.focus();
});
</script>
