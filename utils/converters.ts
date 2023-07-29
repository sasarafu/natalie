import type { mastodon as Mastodon } from 'masto';
import type * as Misskey from 'misskey-js';
import type { IMessage } from '~/models/common/message';
import type { ILoginUser } from '~/models/common/user';
import type { IInstanceType } from '~/models/instanceType';

export const mastodonConverter = {
  statusToMessage: (toot: Mastodon.v1.Status): IMessage => {
    return {
      id: toot.id,
      createdAt: new Date(toot.createdAt),
      user: {
        userid: toot.account.id,
        username: toot.account.acct,
        instance: {
          type: 'mastodon',
          baseUrl: new URL(toot.account.url).origin,
        },
        displayName: toot.account.displayName,
        iconUrl: toot.account.avatar,
      },
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
        instance: {
          type: (note.user.instance?.name || 'misskey') as IInstanceType,
          baseUrl: note.user.host || user.instance.baseUrl,
        },
        displayName: note.user.name,
        iconUrl: note.user.avatarUrl,
      },
      visibility: note.visibility,
      NSFW: note.isHidden || false,
      text: note.text || '',
    };
  },
};
