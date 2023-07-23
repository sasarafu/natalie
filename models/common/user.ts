import type { UUID } from 'crypto';
import type { IInstance } from '~/models/common/instance';

export type IUser = {
  userid: string; // インスタンスごとに割り振られるuser id
  username: string;
  instance: IInstance;

  displayName: string;
  iconUrl: string;
};

export type ILoginUser = IUser & {
  id: UUID; // このアプリケーション上でユーザを特定するためのid
  accessToken: string;
};
