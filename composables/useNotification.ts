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

  const notify = (body: Notification['body']) => {
    new Notification(useRuntimeConfig().public.appName, { body });
  };

  return { isRequestable, requestPermission, notify };
};
