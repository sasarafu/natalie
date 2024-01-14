import { useLocalStorage } from '@vueuse/core';
import type { ILoginUser, ILoginUserInfo } from '~/models/common/user';

export const useLoginUsersStore = defineStore('loginUsers', () => {
  const storage = useLocalStorage<ILoginUserInfo[]>('natalie/loginUsers', []);

  // ILoginUserをそのまま保存していたころの名残
  // TODO: しばらくしたら消す
  watch(
    storage,
    () => {
      if (!Array.isArray(storage.value)) {
        storage.value = Object.values(
          storage.value as { [key: ILoginUserInfo['id']]: ILoginUser },
        ).map((user) => ({
          id: user.id,
          instance: user.instance,
          accessToken: user.accessToken,
        }));
      }
    },
    {
      deep: true,
      immediate: true,
    },
  );

  // orderedLoginUsers は型としては配列だが、読み込み中はundefinedになるので、pageレベルでv-ifすること
  const orderedLoginUsers = computedAsync<ILoginUser[]>(async () => {
    const { $repositories } = useNuxtApp();
    return await Promise.all(
      storage.value.map(async (user) => {
        return await $repositories(user.instance.type).getLoginUser(user);
      }),
    );
  }, undefined);

  const loginUsers = computed(() => {
    const users: { [key: ILoginUserInfo['id']]: ILoginUser } = {};

    orderedLoginUsers.value.map((user) => {
      users[user.id] = user;
    });

    return users;
  });

  const add = (user: Omit<ILoginUserInfo, 'id'>) => {
    const id = crypto.randomUUID();

    storage.value.push({
      id,
      ...user,
    });
  };

  const updateToken = (
    userId: ILoginUserInfo['id'],
    accessToken: ILoginUserInfo['accessToken'],
  ) => {
    const user = storage.value.find((user) => user.id === userId);
    if (user) {
      user.accessToken = accessToken;
    }
  };

  const remove = (userId: ILoginUserInfo['id']) => {
    storage.value = storage.value.filter((user) => user.id === userId);
  };

  const removeAll = () => {
    storage.value = [];
  };

  return { loginUsers, orderedLoginUsers, add, updateToken, remove, removeAll };
});
