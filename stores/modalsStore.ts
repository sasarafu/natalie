import type { UUID } from 'crypto';

type IModal = {
  id: UUID;
  name: string;
  component: ReturnType<typeof resolveComponent>;
  props: {};
  displayOptions?: {
    width?: `${number}px` | `${number}%`;
    height?: `${number}px` | `${number}%`;
    maxWidth?: `${number}px` | `${number}%`;
    maxHeight?: `${number}px` | `${number}%`;
  };
};

export const modalsStore = defineStore('modals', () => {
  const modals = ref<IModal[]>([]);

  const add = (
    name: IModal['name'],
    component: IModal['component'],
    props: IModal['props'],
    displayOptions?: IModal['displayOptions'],
  ) => {
    modals.value.push({
      id: crypto.randomUUID(),
      name,
      component,
      props,
      displayOptions,
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
