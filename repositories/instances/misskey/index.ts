import type { entities } from 'misskey-js';
import { api, Stream } from 'misskey-js';
import type { IMessage } from '~/models/common/message';
import type { ILoginUser } from '~/models/common/user';

export const misskeyRepository = () => ({
  client: (user: ILoginUser) => {
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
  getHomeTimeline: async (
    user: ILoginUser,
    params?: { sinceId?: string; untilId?: string },
  ) =>
    (
      await useApiClientsStore()
        .get<'misskey'>(user)
        .api.request('notes/timeline', params)
    ).map((note) => misskeyConverter.noteToMessage(note, user)),
  getLocalTimeline: async (
    user: ILoginUser,
    params?: { sinceId?: string; untilId?: string },
  ) => {
    (
      await useApiClientsStore()
        .get<'misskey'>(user)
        .api.request('notes/local-timeline', params)
    ).map((note) => misskeyConverter.noteToMessage(note, user));
  },
  getFedarationTimeline: async (
    user: ILoginUser,
    params?: { sinceId?: string; untilId?: string },
  ) => {
    (
      await useApiClientsStore()
        .get<'misskey'>(user)
        .api.request('notes/global-timeline', params)
    ).map((note) => misskeyConverter.noteToMessage(note, user));
  },
  getListTimeline: async (
    user: ILoginUser,
    listId: string,
    params?: { sinceId?: string; untilId?: string },
  ) => {
    (
      await useApiClientsStore()
        .get<'misskey'>(user)
        .api.request('notes/user-list-timeline', {
          listId,
          sinceId: params?.sinceId,
          untilId: params?.untilId,
        })
    ).map((note) => misskeyConverter.noteToMessage(note, user));
  },
  getUserTimeline: async (
    user: ILoginUser,
    userId: string,
    params?: { sinceId?: string; untilId?: string },
  ) => {
    (
      await useApiClientsStore()
        .get<'misskey'>(user)
        .api.request('users/notes', {
          userId,
          sinceId: params?.sinceId,
          untilId: params?.untilId,
        })
    ).map((note) => misskeyConverter.noteToMessage(note, user));
  },
  setHomeStreaming: (
    user: ILoginUser,
    callback: (message: IMessage) => void,
  ) => {
    useApiClientsStore()
      .get<'misskey'>(user)
      .ws.useChannel('homeTimeline')
      .on('note', (note) => {
        callback(misskeyConverter.noteToMessage(note, user));
      });
  },
  setLocalStreaming: (
    user: ILoginUser,
    callback: (message: IMessage) => void,
  ) => {
    useApiClientsStore()
      .get<'misskey'>(user)
      .ws.useChannel('localTimeline')
      .on('note', (note) => {
        callback(misskeyConverter.noteToMessage(note, user));
      });
  },
  setFederationStreaming: (
    user: ILoginUser,
    callback: (message: IMessage) => void,
  ) => {
    useApiClientsStore()
      .get<'misskey'>(user)
      .ws.useChannel('globalTimeline')
      .on('note', (note) => {
        callback(misskeyConverter.noteToMessage(note, user));
      });
  },
  setListStreaming: (
    _user: ILoginUser,
    _listId: string,
    _callback: (message: IMessage) => void,
  ) => {
    // not implemented
  },
});
