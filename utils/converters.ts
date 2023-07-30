import type { mastodon as Mastodon } from 'masto';
import type * as Misskey from 'misskey-js';
import type { IMessage } from '~/models/common/message';
import type { ILoginUser } from '~/models/common/user';

export const mastodonConverter = {
  statusToMessage: (toot: Mastodon.v1.Status, user: ILoginUser): IMessage => {
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
      visibility: toot.visibility,
      NSFW: toot.sensitive,
      text: toot.content,
    };
  },
};

export const misskeyConverter = {
  noteToMessage: (note: Misskey.entities.Note, user: ILoginUser): IMessage => {
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
      visibility: note.visibility,
      NSFW: note.isHidden || false,
      text: note.text || '',
    };
  },
};
