import type { UUID } from 'crypto';

type IModal = {
  id: UUID;
  component: ReturnType<typeof resolveComponent>;
  props: Record<string, unknown>;
  options: {
    closable: boolean;
  };
};

const defaultOptions: IModal['options'] = {
  closable: true,
};

export const useModalsStore = defineStore('modals', () => {
  const store = ref<IModal[]>([]);

  const modals = computed(() => store.value);

  const add = (
    component: IModal['component'],
    props: IModal['props'],
    options?: Partial<IModal['options']>,
  ) => {
    console.log('test', component, props, options);
    store.value.push({
      id: crypto.randomUUID(),
      component,
      props,
      options: { ...defaultOptions, ...options },
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
