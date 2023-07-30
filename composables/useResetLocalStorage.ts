export const useResetLocalStorage = () => {
  useLoginUsersStore().loginUsers = {};
  useTimelinesStore().timelines = [];
};
