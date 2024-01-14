import type { ITimeline } from '~/models/common/timeline';

export const useTimelinesStore = defineStore('timelines', () => {
  const store = useLocalStorage<ITimeline[]>('natalie/timelines', []);

  const timelines = computed(() => store.value);

  const add = (user: ITimeline) => {
    store.value.push(user);
  };

  const remove = (timelineId: ITimeline['id']) => {
    store.value = store.value.filter((timeline) => timeline.id !== timelineId);
  };

  const removeAll = () => {
    store.value = [];
  };

  return { timelines, add, remove, removeAll };
});
