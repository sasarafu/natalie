export const calcRelativeTime = (date: Date, from: Date = new Date()) => {
  const { $dayjs } = useNuxtApp();
  return $dayjs(date).from(from);
};
