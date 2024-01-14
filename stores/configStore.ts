import { useLocalStorage } from '@vueuse/core';

export type IConfig = {
  sidebar: {
    isExpanded: boolean;
  };
};

const getInitial = (): IConfig => ({
  sidebar: {
    isExpanded: true,
  },
});

export const useConfigStore = defineStore('config', () => {
  const config = useLocalStorage<IConfig>('natalie/config', getInitial());

  const reset = () => {
    config.value = getInitial();
  };

  return { config, reset };
});
