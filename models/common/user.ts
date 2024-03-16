import type { UUID } from 'crypto';
import type { IInstance } from '~/models/common/instance';

export type IUser = {
  userid: string; // インスタンスごとに割り振られるuser id
  username: string; // ex: hoge, fuga@example.com
  displayName: string | undefined; // 表示名
  iconUrl: string | undefined;
};

export type ILoginUserInfo = {
  id: UUID; // このアプリケーション上でユーザを特定するためのid
  instance: IInstance;

  accessToken: string;
};

export type ILoginUser = IUser & ILoginUserInfo;
