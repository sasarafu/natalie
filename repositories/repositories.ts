import type { Instance } from '~/models/instance';
import { repositoryBsky } from './bsky/repositoryBsky';
import { repositoryMastodon } from './mastodon/repositoryMastodon';
import { repositoryMisskey } from './misskey/repositoryMisskey';

export const repositories = {
  bsky: repositoryBsky,
  mastodon: repositoryMastodon,
  misskey: repositoryMisskey,
} satisfies { [key in Instance]: unknown };
