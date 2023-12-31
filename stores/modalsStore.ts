import type { UUID } from 'crypto';

type IModal = {
  id: UUID;
  component: ReturnType<typeof resolveComponent>;
  props: {};
};

export const useModalsStore = defineStore('modals', () => {
  const modals = ref<IModal[]>([]);

  const add = (component: IModal['component'], props: IModal['props']) => {
    modals.value.push({
      id: crypto.randomUUID(),
      component,
      props,
    });
  };

  const clear = () => {
    modals.value = [];
  };

  const pop = () => {
    return modals.value.pop();
  };

  return { modals, add, clear, pop };
});
