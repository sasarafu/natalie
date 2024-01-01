<template>
  <div
    ref="modalMedia"
    class="modal-size flex flex-col justify-center outline-none relative p-4"
    tabindex="0"
    @keydown.right="goNext"
    @keydown.left="goPrev"
  >
    <video
      v-if="current.type === 'video'"
      :src="current.url"
      class="media-size"
      controls
      controlslist="nodownload"
      autoplay
    >
      <source :src="current.url" :type="current.detailedType" />
    </video>
    <img
      v-if="current.type === 'image'"
      :key="key"
      :src="current.url"
      class="media-size"
      draggable="false"
      @load="onload"
    />
    <audio
      v-if="current.type === 'audio'"
      :src="current.url"
      class="media-size"
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

const index = ref(props.initial);
const current = computed(() => props.mediaList[index.value]);

// Safariでは画像のロード後に自動リサイズされないので、keyで再描画する
const key = ref(0);
const onload = () => {
  key.value = 1;
};

const goNext = () => {
  index.value = (index.value + 1) % props.mediaList.length;
  key.value = 0;
};
const goPrev = () => {
  index.value =
    (props.mediaList.length + index.value - 1) % props.mediaList.length;
  key.value = 0;
};

onMounted(() => {
  modalMedia.value?.focus();
});
</script>

<style scoped>
.modal-size {
  max-height: 95vh;
  max-height: 95dvh;
  max-width: 95vw;
  max-width: 95dvw;
}

.media-size {
  max-height: calc(95vh - 2rem);
  max-height: calc(95dvh - 2rem);
  max-width: calc(95vw - 2rem);
  max-width: calc(95dvw - 2rem);
}
</style>
