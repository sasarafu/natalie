import type { mastodon as Mastodon } from 'masto';
import type * as Misskey from 'misskey-js';
import type { ILoginUser, IUser } from '~/models/common/user';
import type { IMastodonMessage } from '~/models/instances/mastodon/message';
import type { IMisskeyMessage } from '~/models/instances/misskey/message';

export const mastodonConverter = {
  statusToMessage: (
    toot: Mastodon.v1.Status,
    user: ILoginUser,
  ): IMastodonMessage => ({
    id: toot.id,
    createdAt: new Date(toot.createdAt),
    user: mastodonConverter.getUser(toot),
    via: user,
    body: toot,
  }),
  getUser: (toot: Mastodon.v1.Status): IUser => ({
    userid: toot.account.id,
    username: toot.account.acct,
    displayName: toot.account.displayName || toot.account.username,
    iconUrl: toot.account.avatar,
  }),
};

export const misskeyConverter = {
  noteToMessage: (
    note: Misskey.entities.Note,
    user: ILoginUser,
  ): IMisskeyMessage => ({
    id: note.id,
    createdAt: new Date(note.createdAt),
    user: misskeyConverter.getUser(note),
    via: user,
    body: note,
  }),
  getUser: (note: Misskey.entities.Note): IUser => ({
    userid: note.user.id,
    username: note.user.username,
    displayName: note.user.name || note.user.username,
    iconUrl: note.user.avatarUrl,
  }),
};
