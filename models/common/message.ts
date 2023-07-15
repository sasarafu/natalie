import type { IUser } from './user';

export type IMessage = {
  id: string;
  user: IUser;
  text: string;
  date: Date;
};
