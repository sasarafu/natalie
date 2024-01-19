import { createRestAPIClient, createStreamingAPIClient } from 'masto';
import type { IMessage } from '~/models/common/message';
import type { ILoginUser, ILoginUserInfo } from '~/models/common/user';

export const mastodonRepository = () => ({
  client: (user: ILoginUserInfo) => {
    if (user.instance.type !== 'mastodon') {
      throw new Error('not mastodon');
    }

    return {
      api: createRestAPIClient({
        url: user.instance.baseUrl,
        accessToken: user.accessToken,
      }),
      ws: createStreamingAPIClient({
        streamingApiUrl: user.instance.baseUrl.replace('https://', 'wss://'),
        accessToken: user.accessToken,
        implementation: WebSocket,
      }),
    };
  },
  getAuthUrl: (
    instanceUrl: string, // instance.example.com
    callbackBaseUrl: string, // https://callback.example.com
  ) => {
    // 自分に返す(/callback/mastodon/[instance].vueを参照)
    const url = new URL(`/callback/mastodon/${instanceUrl}`, callbackBaseUrl);
    return url.toString();
  },
  getLoginUser: async (user: ILoginUserInfo): Promise<ILoginUser> => {
    const res = await useApiClientsStore()
      .get<'mastodon'>(user)
      .api.v1.accounts.verifyCredentials();

    return {
      userid: res.id,
      username: res.username,
      displayName: res.displayName,
      iconUrl: res.avatar,
      ...user,
    };
  },
  home: {
    get: async (
      user: ILoginUser,
      params?: { sinceId?: string; untilId?: string },
    ) => {
      return (
        await useApiClientsStore()
          .get<'mastodon'>(user)
          .api.v1.timelines.home.list({
            maxId: params?.untilId,
            minId: params?.sinceId,
          })
      ).map((toot) => mastodonConverter.statusToMessage(toot, user));
    },
    stream: async (user: ILoginUser, callback: (message: IMessage) => void) => {
      for await (const entry of useApiClientsStore()
        .get<'mastodon'>(user)
        .ws.user.subscribe()) {
        if (entry.event === 'update') {
          callback(mastodonConverter.statusToMessage(entry.payload, user));
        }
      }
    },
  },
  local: {
    get: async (
      user: ILoginUser,
      params?: { sinceId?: string; untilId?: string },
    ) => {
      return (
        await useApiClientsStore()
          .get<'mastodon'>(user)
          .api.v1.timelines.public.list({
            local: true,
            maxId: params?.untilId,
            minId: params?.sinceId,
          })
      ).map((toot) => mastodonConverter.statusToMessage(toot, user));
    },
    stream: async (user: ILoginUser, callback: (message: IMessage) => void) => {
      for await (const entry of useApiClientsStore()
        .get<'mastodon'>(user)
        .ws.public.local.subscribe()) {
        if (entry.event === 'update') {
          callback(mastodonConverter.statusToMessage(entry.payload, user));
        }
      }
    },
  },
  federation: {
    get: async (
      user: ILoginUser,
      params?: { sinceId?: string; untilId?: string },
    ) => {
      return (
        await useApiClientsStore()
          .get<'mastodon'>(user)
          .api.v1.timelines.public.list({
            maxId: params?.untilId,
            minId: params?.sinceId,
          })
      ).map((toot) => mastodonConverter.statusToMessage(toot, user));
    },
    stream: async (user: ILoginUser, callback: (message: IMessage) => void) => {
      for await (const entry of useApiClientsStore()
        .get<'mastodon'>(user)
        .ws.public.remote.subscribe()) {
        if (entry.event === 'update') {
          callback(mastodonConverter.statusToMessage(entry.payload, user));
        }
      }
    },
  },
});
