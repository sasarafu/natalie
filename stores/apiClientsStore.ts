import type { IApiClients } from '~/factories/repositoryFactory';
import type { ILoginUser } from '~/models/common/user';

export const useApiClientsStore = defineStore('apiClients', () => {
  const apiClients = ref<{
    [key: ILoginUser['id']]: IApiClients;
  }>({});

  const update = (user: ILoginUser) => {
    const { $repositories } = useNuxtApp();
    const client = $repositories(user.instance.type).client(user);
    apiClients.value[user.id] = client;
    return client;
  };

  const get = <T extends ILoginUser['instance']['type']>(user: ILoginUser) => {
    const client = apiClients.value[user.id];
    return (client ?? update(user)) as IApiClients<T>;
  };

  return { get, update };
});
