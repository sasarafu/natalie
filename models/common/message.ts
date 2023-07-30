import type { ILoginUser, IUser } from '~/models/common/user';

export type IMessage = {
  id: string;
  user: IUser;
  createdAt: Date;
  visibility: string;
  NSFW: boolean;

  text: string;
  via: ILoginUser; // 取得したアカウント
};
