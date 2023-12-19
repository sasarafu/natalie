import type { IInstanceType } from '~/models/instances/instanceType';

export type IInstance = {
  type: IInstanceType;
  baseUrl: string;
};
