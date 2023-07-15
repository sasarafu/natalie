import type { IInstance } from '~/models/common/instance';

export type IUser = {
  id: string;
  name: string;
  icon: string;
  instance: IInstance;
};

export type ILoginUser = IUser & {
  accessToken: string;
};
