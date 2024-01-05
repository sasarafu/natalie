export const useNotification = () => {
  // Notification.permission はリアクティブじゃないようなので、手動で値を書き換える
  const isRequestable = ref(Notification.permission === 'default');

  const requestPermission = async () => {
    console.log(isRequestable.value);
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
