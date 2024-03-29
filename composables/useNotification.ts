export const useNotification = () => {
  if (!('notification' in window)) {
    return undefined;
  }

  // Notification.permission はリアクティブじゃないようなので、手動で値を書き換える
  const isRequestable = ref(Notification.permission === 'default');

  const requestPermission = async () => {
    if (Notification.permission !== 'default') {
      return;
    }

    const result = await Notification.requestPermission();
    isRequestable.value = result === 'default';
  };

  const notify = (
    option: { title?: string } & Pick<NotificationOptions, 'body' | 'icon'>,
  ) => {
    new Notification(option.title ?? useRuntimeConfig().public.appName, {
      ...option,
      silent: true,
    });
  };

  return { isRequestable, requestPermission, notify };
};
