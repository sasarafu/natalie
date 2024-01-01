import { useLocalStorage } from '@vueuse/core';

export type IConfig = {
  sidebar: {
    isExpanded: boolean;
  };
};

export const useConfigStore = defineStore('config', () => {
  const config = useLocalStorage<IConfig>('natalie/config', {
    sidebar: {
      isExpanded: true,
    },
  });

  return { config };
});
