import type { ILoginUser, IUser } from '~/models/common/user';

export type IMessage = {
  id: string;
  user: IUser;
  createdAt: Date;
  summary: {
    username?: string;
    message?: string;
    iconUrl?: string;
  };

  via: ILoginUser; // 取得したアカウント
};
