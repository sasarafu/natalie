export type PromiseType<T extends Promise<any> | any> = T extends Promise<infer P>
  ? P
  : T;
