import type { entities } from 'misskey-js';
import { api } from 'misskey-js';
import type { IMessage } from '~/models/common/message';
import type { ITimeline } from '~/models/common/timeline';
import type { ILoginUser } from '~/models/common/user';
import type { IInstanceType } from '~/models/instanceType';

const noteToMessage = (note: any, user: ILoginUser) => {
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
  } as IMessage;
};

export const misskeyRepository = () => ({
  client: (user: ILoginUser) => {
    if (user.instance.type !== 'misskey') {
      throw new Error('not misskey');
    }

    return new api.APIClient({
      origin: user.instance.baseUrl,
      credential: user.accessToken,
    });
  },
  getAuthUrl: (
    instanceUrl: string, // instance.example.com
    callbackBaseUrl: string, // https://callback.example.com (window.location.origin)
  ) => {
    const config = useRuntimeConfig();

    // use miauth
    const sessionId = crypto.randomUUID();
    const url = new URL(`/miauth/${sessionId}`, `https://${instanceUrl}`);

    url.searchParams.append('name', config.public.appName);
    url.searchParams.append(
      'callback',
      `${callbackBaseUrl}/callback/misskey/${instanceUrl}`,
    );
    // permission list: https://misskey-hub.net/docs/api/permission.html
    url.searchParams.append(
      'permission',
      'read:account,write:account,read:blocks,write:blocks,read:drive,write:drive,read:favorites,write:favorites,read:following,write:following,read:messaging,write:messaging,read:mutes,write:mutes,write:notes,read:notifications,write:notifications,write:reactions,write:votes,read:pages,write:pages,write:page-likes,read:page-likes,write:gallery-likes,read:gallery-likes',
    );
    return url.toString();
  },
  getAccessToken: async (instanceUrl: string, session: string) => {
    return (
      await useFetch<
        {
          ok: boolean;
          token: string;
          user: entities.User;
        },
        any,
        any,
        'post'
      >(`https://${instanceUrl}/api/miauth/${session}/check`, {
        method: 'POST',
      })
    ).data.value;
  },
  getTimeline: async (timelineQuery: ITimeline['query'], user: ILoginUser) => {
    if (timelineQuery.user !== user.id || user.instance.type !== 'misskey') {
      throw new Error('invalid');
    }

    const client = new api.APIClient({
      origin: user.instance.baseUrl,
      credential: user.accessToken,
    });

    switch (timelineQuery.type) {
      case 'home':
        return (await client.request('notes/timeline')).map((note) =>
          noteToMessage(note, user),
        );
      case 'local':
        return (await client.request('notes/local-timeline')).map((note) =>
          noteToMessage(note, user),
        );
      case 'federation':
        return (await client.request('notes/global-timeline')).map((note) =>
          noteToMessage(note, user),
        );
      case 'list':
        if (!timelineQuery.option?.listId) {
          throw new Error('no listId');
        }
        return (
          await client.request('notes/user-list-timeline', {
            listId: timelineQuery.option.listId,
          })
        ).map((note) => noteToMessage(note, user));
      case 'user':
        if (!timelineQuery.option?.userId) {
          throw new Error('no userId');
        }
        return (
          await client.request('users/notes', {
            userId: timelineQuery.option?.userId,
          })
        ).map((note) => noteToMessage(note, user));
    }
  },
});
