import type { ILoginUser, ILoginUserInfo } from '~/models/common/user';
import type {
  IInstanceType,
  ITimelineType,
} from '~/models/instances/instanceType';
import { blueskyRepository } from '~/repositories/instances/bluesky';
import { mastodonRepository } from '~/repositories/instances/mastodon';
import { misskeyRepository } from '~/repositories/instances/misskey';

type IRepository<T extends IInstanceType> = {
  client: (user: ILoginUserInfo) => any;
  getLoginUser: (user: ILoginUserInfo) => ILoginUser | Promise<ILoginUser>;
} & {
  [timelineType in ITimelineType<T>]: {
    get: Function | undefined;
    stream: Function | undefined;
  };
};

const repositories = {
  bluesky: blueskyRepository,
  mastodon: mastodonRepository,
  misskey: misskeyRepository,
} satisfies {
  [instance in IInstanceType]: () => IRepository<instance>;
};

export type IRepositories = typeof repositories;

export type IApiClients<T extends IInstanceType = IInstanceType> = ReturnType<
  ReturnType<IRepositories[T]>['client']
>;

export const repositoryFactory = {
  get: (name: keyof IRepositories) => repositories[name],
};
