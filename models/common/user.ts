import type { IInstance } from '~/models/common/instance';

export type IUser = {
  id: string;
  username: string;
  instance: IInstance;

  displayName: string;
  iconUrl: string;
};

export type ILoginUser = IUser & {
  accessToken: string;
};
