import type { UUID } from 'node:crypto';
import type { BskyUser } from './instances/bsky';
import type { MastodonUser } from './instances/mastodon';
import type { MisskeyUser } from './instances/misskey';

export type InstanceUserInfo = BskyUser | MastodonUser | MisskeyUser;

export type LoginUserInfo = {
  id: UUID;
  accessToken: string;
};

export type User = InstanceUserInfo & LoginUserInfo;
