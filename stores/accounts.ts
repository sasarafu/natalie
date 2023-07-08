import { useLocalStorage } from '@vueuse/core';
import type { IAccount } from '~/models/common/account';

export const useAccounts = defineStore('accounts', () => {
  const accounts = useLocalStorage<IAccount[]>('natalie/accounts', []);

  const add = (account: IAccount) => {
    accounts.value.push(account);
  };

  const remove = (accountId: IAccount['id']) => {
    accounts.value = accounts.value.filter(
      (account) => account.id !== accountId,
    );
  };

  return { accounts, add, remove };
});
