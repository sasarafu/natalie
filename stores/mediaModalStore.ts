import type { IMedia } from '~/models/common/media';

// MediaはTimelineItem以下にあるので、Teleportで実装してもTimelineの更新で消えてしまう
// そのため、Storeに保存してIndexPageから参照して表示する
export const useMediaModalStore = defineStore('mediaModal', () => {
  const store = ref<{
    mediaList: IMedia[];
    initial: number;
  }>();

  const media = computed(() => store.value);

  const open = (mediaList: IMedia[], initial: number) => {
    store.value = {
      mediaList,
      initial,
    };
  };

  const close = () => {
    store.value = undefined;
  };

  return { media, open, close };
});
