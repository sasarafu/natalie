import type { IAccount } from './account';

export type IMessage = {
  id: string;
  account: IAccount;
  text: string;
  date: Date;
};
