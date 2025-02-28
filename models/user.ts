import type { UUID } from 'node:crypto';
import type { Instance } from './instance';
import type { BskyUser } from './instances/bsky';
import type { MastodonUser } from './instances/mastodon';
import type { MisskeyUser } from './instances/misskey';

export type InstanceUserInfo = BskyUser | MastodonUser | MisskeyUser;

export type LoginUserInfo = {
  type: Instance;
  baseUrl: string;
  id: UUID;
  accessToken: string;
};

export type User<Instance extends InstanceUserInfo = InstanceUserInfo> =
  Instance & LoginUserInfo;
