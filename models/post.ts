import type { UUID } from 'node:crypto';
import type { BskyPost } from './instances/bsky';
import type { MastodonPost } from './instances/mastodon';
import type { MisskeyPost } from './instances/misskey';

export type Post = (BskyPost | MastodonPost | MisskeyPost) & { id: UUID };
