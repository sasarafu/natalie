import { useLocalStorage } from '@vueuse/core';
import type { ILoginUser } from 'models/common/user';

export const useLoginUsers = defineStore('loginUsers', () => {
  const loginUsers = useLocalStorage<ILoginUser[]>('natalie/loginUsers', []);

  const add = (user: ILoginUser) => {
    loginUsers.value.push(user);
  };

  const remove = (userId: ILoginUser['id']) => {
    loginUsers.value = loginUsers.value.filter(
      (loginUser) => loginUser.id !== userId,
    );
  };

  return { loginUsers, add, remove };
});
