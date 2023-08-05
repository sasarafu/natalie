import type { mastodon as Mastodon } from 'masto';
import type { IMessage } from '~/models/common/message';

export type IMastodonMessage = IMessage & {
  body: Mastodon.v1.Status;
};
