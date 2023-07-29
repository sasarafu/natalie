import type { ITimeline } from '~/models/common/timeline';
import type { IMessage } from '~/models/common/message';

export const useDatasourcesStore = defineStore('datasources', () => {
  const datasources = ref<{ [key: ITimeline['id']]: IMessage[] }>({});

  return { datasources };
});
