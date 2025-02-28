import type { LoginUserInfo } from '~/models/user';
import { repositories } from '~/repositories/repositories';

export const useLoginUserStore = () => {
  const loginUsers = useLocalStorage<LoginUserInfo[]>(
    'natalie/login-users',
    [],
  );

  const users = computedAsync(
    async () =>
      await Promise.all(
        loginUsers.value.map((loginUser) =>
          repositories[loginUser.type].resume(loginUser),
        ),
      ),
  );

  const add = (loginUserInfo: Omit<LoginUserInfo, 'id'>) => {
    loginUsers.value.push({
      ...loginUserInfo,
      id: crypto.randomUUID(),
    });
  };

  const remove = (userId: LoginUserInfo['id']) => {
    loginUsers.value = loginUsers.value.filter(
      (loginUser) => loginUser.id !== userId,
    );
  };

  return {
    loginUsers: readonly(loginUsers),
    users: readonly(users),
    add: add,
    remove: remove,
  };
};
