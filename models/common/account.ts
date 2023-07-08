import type { IInstanceType } from 'models/instanceType';

export type IAccount = {
  id: string;
  name: string;
  icon: string;
  instanceType: IInstanceType;
};
