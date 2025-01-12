import { bsky } from './instances/bsky';
import { mastodon } from './instances/mastodon';
import { misskey } from './instances/misskey';

export const instances = [bsky, mastodon, misskey] as const;
export type Instance = (typeof instances)[number];

export type InstanceInfo = {
  type: Instance;
  baseUrl: string;
};
