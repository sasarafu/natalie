import type { IApiClients } from '~/repositories/repositoryFactory';
import type { ILoginUserInfo } from '~/models/common/user';

export const useApiClientsStore = defineStore('apiClients', () => {
  const apiClients = ref<{
    [key: ILoginUserInfo['id']]: IApiClients;
  }>({});

  const update = (user: ILoginUserInfo) => {
    const { $repositories } = useNuxtApp();
    const client = $repositories(user.instance.type).client(user);
    apiClients.value[user.id] = client;
    return client;
  };

  const get = <T extends ILoginUserInfo['instance']['type']>(
    user: ILoginUserInfo,
  ) => {
    const client = apiClients.value[user.id];
    return (client ?? update(user)) as IApiClients<T>;
  };

  return { get, update };
});
