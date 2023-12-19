import type { IInstanceType } from '~/models/instances/instanceType';
import { mastodonRepository } from '~/repositories/instances/mastodon';
import { misskeyRepository } from '~/repositories/instances/misskey';

const repositories = {
  mastodon: mastodonRepository,
  misskey: misskeyRepository,
};

export type IRepositories = {
  [key in
    | IInstanceType
    | keyof typeof repositories]: (typeof repositories)[key];
};

export type IApiClients<T extends IInstanceType = IInstanceType> = ReturnType<
  ReturnType<IRepositories[T]>['client']
>;

export const repositoryFactory = {
  get: (name: keyof IRepositories) => repositories[name],
};
