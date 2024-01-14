import type { UUID } from 'crypto';

type IModal = {
  id: UUID;
  component: ReturnType<typeof resolveComponent>;
  props: {};
};

export const useModalsStore = defineStore('modals', () => {
  const store = ref<IModal[]>([]);

  const modals = computed(() => store.value);

  const add = (component: IModal['component'], props: IModal['props']) => {
    store.value.push({
      id: crypto.randomUUID(),
      component,
      props,
    });
  };

  const clear = () => {
    store.value = [];
  };

  const pop = () => {
    return store.value.pop();
  };

  return { modals, add, clear, pop };
});
