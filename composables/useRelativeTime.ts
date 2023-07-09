export const useRelativeTime = (date: Date, from: Date = new Date()) => {
  const dayjs = useDayjs();
  return dayjs(date).from(from);
};
