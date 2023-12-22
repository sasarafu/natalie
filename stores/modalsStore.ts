import type { UUID } from 'crypto';

type IModal = {
  id: UUID;
  name: string;
  component: ReturnType<typeof resolveComponent>;
  props: {};
};

export const modalsStore = defineStore('modals', () => {
  const modals = ref<IModal[]>([]);

  const add = (
    name: IModal['name'],
    component: IModal['component'],
    props: IModal['props'],
  ) => {
    modals.value.push({
      id: crypto.randomUUID(),
      name,
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
