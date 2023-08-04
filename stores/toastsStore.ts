import type { UUID } from 'crypto';

type IToast = {
  text: string;
  level: 'info' | 'error';
};

type IToastWithId = IToast & {
  id: UUID;
  timeout: number;
  addedAt: number;
  percent: number;
};

export const toastsStore = defineStore('toasts', () => {
  const toasts = ref<IToastWithId[]>([]);

  // timeout: ms
  const add = (toast: IToast, _timeout?: number) => {
    const id = crypto.randomUUID();
    const timeout = _timeout ?? 5000;

    setTimeout(() => {
      remove(id);
    }, timeout);

    toasts.value.push({
      id,
      timeout,
      addedAt: new Date().getTime(),
      percent: 100,
      ...toast,
    });
  };

  const remove = (id: UUID) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  return { toasts, add };
});
