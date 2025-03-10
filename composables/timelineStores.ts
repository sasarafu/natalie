import type { Timeline } from '~/models/timeline';

export const useTimelinesStore = useState('timelines', () => {
  return useLocalStorage<Timeline[]>('natalie/timelines', []);
});
