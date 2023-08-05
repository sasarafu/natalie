import type { mastodon as Mastodon } from 'masto';
import type * as Misskey from 'misskey-js';
import type { ILoginUser } from '~/models/common/user';
import type { IMastodonMessage } from '~/models/instances/mastodon/message';
import type { IMisskeyMessage } from '~/models/instances/misskey/message';

export const mastodonConverter = {
  statusToMessage: (
    toot: Mastodon.v1.Status,
    user: ILoginUser,
  ): IMastodonMessage => {
    return {
      id: toot.id,
      createdAt: new Date(toot.createdAt),
      user: {
        userid: toot.account.id,
        username: toot.account.acct,
        displayName: toot.account.displayName || toot.account.acct,
        iconUrl: toot.account.avatar,
      },
      via: user,
      body: toot,
    };
  },
};

export const misskeyConverter = {
  noteToMessage: (
    note: Misskey.entities.Note,
    user: ILoginUser,
  ): IMisskeyMessage => {
    return {
      id: note.id,
      createdAt: new Date(note.createdAt),
      user: {
        userid: note.user.id,
        username: note.user.username,
        displayName: note.user.name || note.user.username,
        iconUrl: note.user.avatarUrl,
      },
      via: user,
      body: note,
    };
  },
};
