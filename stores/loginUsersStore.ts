import { useLocalStorage } from '@vueuse/core';
import type { ILoginUser } from '~/models/common/user';

export const useLoginUsersStore = defineStore('loginUsers', () => {
  const loginUsers = useLocalStorage<{ [key: ILoginUser['id']]: ILoginUser }>(
    'natalie/loginUsers',
    {},
  );

  const orderedLoginUsers = computed(() => {
    return Object.values(loginUsers.value);
  });

  const add = (user: ILoginUser) => {
    loginUsers.value[user.id] = user;
  };

  const remove = (userId: ILoginUser['id']) => {
    delete loginUsers.value[userId];
  };

  return { loginUsers, orderedLoginUsers, add, remove };
});
