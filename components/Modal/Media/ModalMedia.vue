<template>
  <Teleport to="#modalIndex">
    <ModalBaseContainer
      closable
      class="relative"
      @close="$emit('close')"
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
        :src="current.url"
        class="media-size inline-block"
        draggable="false"
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
        <div class="w-24 flex-none">
          {{ index + 1 }} / {{ mediaList.length }}
        </div>
        <button class="flex-none" @click="goNext">
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </ModalBaseContainer>
  </Teleport>
</template>

<!-- 
  NOTE: MediaはTimelineItemの下にあって消える可能性があるため、mediaModalStoreに保存すると表示できるようにしている
 -->
<script setup lang="ts">
import type { IMedia } from '~/models/common/media';

const props = defineProps<{
  mediaList: IMedia[];
  initial: number;
}>();

defineEmits<{
  (e: 'close'): void;
}>();

const index = ref(props.initial);
const current = computed(() => props.mediaList[index.value]);

const goNext = () => {
  index.value = (index.value + 1) % props.mediaList.length;
};
const goPrev = () => {
  index.value =
    (props.mediaList.length + index.value - 1) % props.mediaList.length;
};
</script>

<style scoped>
.media-size {
  max-height: calc(95vh - 2rem);
  max-height: calc(95dvh - 2rem);
  max-width: calc(95vw - 2rem);
  max-width: calc(95dvw - 2rem);
}
</style>
