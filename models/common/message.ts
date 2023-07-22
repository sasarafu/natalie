import type { IUser } from './user';

export type IMessage = {
  id: string;
  user: IUser;
  createdAt: Date;
  visibility: string;
  NSFW: boolean;

  text: string;
};
