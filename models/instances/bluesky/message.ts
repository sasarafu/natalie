import type * as Bsky from '@atproto/api';
import type { IMessage } from '~/models/common/message';

export type IBlueskyMessage = IMessage & {
  body: Bsky.AppBskyFeedDefs.FeedViewPost;
  cursor?: string;
};
