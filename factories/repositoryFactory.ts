import type { IInstanceType } from '~/models/instanceType';
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

export const repositoryFactory = {
  get: (name: keyof IRepositories) => repositories[name],
};
