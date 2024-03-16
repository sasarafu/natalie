import { api, Stream } from 'misskey-js';
import type { IMessage } from '~/models/common/message';
import type { ILoginUser, ILoginUserInfo } from '~/models/common/user';

export const misskeyRepository = () => ({
  client: (user: ILoginUserInfo) => {
    if (user.instance.type !== 'misskey') {
      throw new Error('not misskey');
    }

    return {
      api: new api.APIClient({
        origin: user.instance.baseUrl,
        credential: user.accessToken,
      }),
      ws: new Stream(user.instance.baseUrl, { token: user.accessToken }),
    };
  },
  getLoginUser: async (user: ILoginUserInfo): Promise<ILoginUser> => {
    const res = await useApiClientsStore()
      .get<'misskey'>(user)
      .api.request('i', {});

    return {
      userid: res.id,
      username: res.username,
      displayName: res.name ?? undefined,
      iconUrl: res.avatarUrl ?? undefined,
      ...user,
    };
  },
  home: {
    get: async (
      user: ILoginUser,
      params: { sinceId?: string; untilId?: string },
    ) => {
      return (
        await useApiClientsStore()
          .get<'misskey'>(user)
          .api.request('notes/timeline', params)
      ).map((note) => misskeyConverter.noteToMessage(note, user));
    },
    stream: (user: ILoginUser, callback: (message: IMessage) => void) => {
      useApiClientsStore()
        .get<'misskey'>(user)
        .ws.useChannel('homeTimeline')
        .on('note', (note) => {
          callback(misskeyConverter.noteToMessage(note, user));
        });
    },
  },
  local: {
    get: async (
      user: ILoginUser,
      params: { sinceId?: string; untilId?: string },
    ) => {
      return (
        await useApiClientsStore()
          .get<'misskey'>(user)
          .api.request('notes/local-timeline', params)
      ).map((note) => misskeyConverter.noteToMessage(note, user));
    },
    stream: (user: ILoginUser, callback: (message: IMessage) => void) => {
      useApiClientsStore()
        .get<'misskey'>(user)
        .ws.useChannel('localTimeline')
        .on('note', (note) => {
          callback(misskeyConverter.noteToMessage(note, user));
        });
    },
  },
  global: {
    get: async (
      user: ILoginUser,
      params: { sinceId?: string; untilId?: string },
    ) => {
      return (
        await useApiClientsStore()
          .get<'misskey'>(user)
          .api.request('notes/global-timeline', params)
      ).map((note) => misskeyConverter.noteToMessage(note, user));
    },
    stream: (user: ILoginUser, callback: (message: IMessage) => void) => {
      useApiClientsStore()
        .get<'misskey'>(user)
        .ws.useChannel('globalTimeline')
        .on('note', (note) => {
          callback(misskeyConverter.noteToMessage(note, user));
        });
    },
  },
});
