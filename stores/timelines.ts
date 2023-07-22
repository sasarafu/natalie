import type { ITimeline } from '~/models/common/timeline';

export const useTimelines = defineStore('timelines', () => {
  const timelines = useLocalStorage<ITimeline[]>('natalie/timelines', []);

  const add = (user: ITimeline) => {
    timelines.value.push(user);
  };

  const remove = (timelineId: ITimeline['id']) => {
    timelines.value = timelines.value.filter(
      (timeline) => timeline.id !== timelineId,
    );
  };

  return { timelines, add, remove };
});
