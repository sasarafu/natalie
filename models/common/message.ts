import type { ILoginUser, IUser } from '~/models/common/user';

export type IMessage = {
  id: string;
  user: IUser;
  createdAt: Date;

  via: ILoginUser; // 取得したアカウント
};
