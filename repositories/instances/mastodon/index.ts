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
  getHomeTimeline: async (
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
  getLocalTimeline: async (
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
  getFedarationTimeline: async (
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
  getListTimeline: async (
    user: ILoginUser,
    listId: string,
    params?: { sinceId?: string; untilId?: string },
  ) => {
    return (
      await useApiClientsStore()
        .get<'mastodon'>(user)
        .api.v1.timelines.list.$select(listId)
        .list({
          maxId: params?.untilId,
          minId: params?.sinceId,
        })
    ).map((toot) => mastodonConverter.statusToMessage(toot, user));
  },
  getUserTimeline: async (
    user: ILoginUser,
    userId: string,
    params?: { sinceId?: string; untilId?: string },
  ) => {
    return (
      await useApiClientsStore()
        .get<'mastodon'>(user)
        .api.v1.accounts.$select(userId)
        .statuses.list({
          maxId: params?.untilId,
          minId: params?.sinceId,
        })
    ).map((toot) => mastodonConverter.statusToMessage(toot, user));
  },
  setHomeStreaming: async (
    user: ILoginUser,
    callback: (message: IMessage) => void,
  ) => {
    for await (const entry of useApiClientsStore()
      .get<'mastodon'>(user)
      .ws.user.subscribe()) {
      if (entry.event === 'update') {
        callback(mastodonConverter.statusToMessage(entry.payload, user));
      }
    }
  },
  setLocalStreaming: async (
    user: ILoginUser,
    callback: (message: IMessage) => void,
  ) => {
    for await (const entry of useApiClientsStore()
      .get<'mastodon'>(user)
      .ws.public.local.subscribe()) {
      if (entry.event === 'update') {
        callback(mastodonConverter.statusToMessage(entry.payload, user));
      }
    }
  },
  setFederationStreaming: async (
    user: ILoginUser,
    callback: (message: IMessage) => void,
  ) => {
    for await (const entry of useApiClientsStore()
      .get<'mastodon'>(user)
      .ws.public.remote.subscribe()) {
      if (entry.event === 'update') {
        callback(mastodonConverter.statusToMessage(entry.payload, user));
      }
    }
  },
  setListStreaming: async (
    user: ILoginUser,
    listId: string,
    callback: (message: IMessage) => void,
  ) => {
    for await (const entry of useApiClientsStore()
      .get<'mastodon'>(user)
      .ws.list.subscribe({ list: listId })) {
      if (entry.event === 'update') {
        callback(mastodonConverter.statusToMessage(entry.payload, user));
      }
    }
  },
});
