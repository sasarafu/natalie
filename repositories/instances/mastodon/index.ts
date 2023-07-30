import { login } from 'masto';
import type { IMessage } from '~/models/common/message';
import type { ILoginUser } from '~/models/common/user';

export const mastodonRepository = () => ({
  client: async (user: ILoginUser) => {
    if (user.instance.type !== 'mastodon') {
      throw new Error('not mastodon');
    }

    return await login({
      url: user.instance.baseUrl,
      accessToken: user.accessToken,
    });
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
      await (
        await useApiClientsStore().get<'mastodon'>(user)
      ).v1.timelines.listHome({
        maxId: params?.untilId,
        minId: params?.sinceId,
      })
    ).map(mastodonConverter.statusToMessage);
  },
  getLocalTimeline: async (
    user: ILoginUser,
    params?: { sinceId?: string; untilId?: string },
  ) => {
    return (
      await (
        await useApiClientsStore().get<'mastodon'>(user)
      ).v1.timelines.listPublic({
        local: true,
        maxId: params?.untilId,
        minId: params?.sinceId,
      })
    ).map(mastodonConverter.statusToMessage);
  },
  getFedarationTimeline: async (
    user: ILoginUser,
    params?: { sinceId?: string; untilId?: string },
  ) => {
    return (
      await (
        await useApiClientsStore().get<'mastodon'>(user)
      ).v1.timelines.listPublic({
        maxId: params?.untilId,
        minId: params?.sinceId,
      })
    ).map(mastodonConverter.statusToMessage);
  },
  getListTimeline: async (
    user: ILoginUser,
    listId: string,
    params?: { sinceId?: string; untilId?: string },
  ) => {
    return (
      await (
        await useApiClientsStore().get<'mastodon'>(user)
      ).v1.timelines.listList(listId, {
        maxId: params?.untilId,
        minId: params?.sinceId,
      })
    ).map(mastodonConverter.statusToMessage);
  },
  getUserTimeline: async (
    user: ILoginUser,
    userId: string,
    params?: { sinceId?: string; untilId?: string },
  ) => {
    return (
      await (
        await useApiClientsStore().get<'mastodon'>(user)
      ).v1.accounts.listStatuses(userId, {
        maxId: params?.untilId,
        minId: params?.sinceId,
      })
    ).map(mastodonConverter.statusToMessage);
  },
  setHomeStreaming: async (
    user: ILoginUser,
    callback: (message: IMessage) => void,
  ) => {
    const wsEvents = await (
      await useApiClientsStore().get<'mastodon'>(user)
    ).v1.stream.streamUser();
    wsEvents.addListener('update', (toot) =>
      callback(mastodonConverter.statusToMessage(toot)),
    );
  },
  setLocalStreaming: async (
    user: ILoginUser,
    callback: (message: IMessage) => void,
  ) => {
    const wsEvents = await (
      await useApiClientsStore().get<'mastodon'>(user)
    ).v1.stream.streamCommunityTimeline();
    wsEvents.addListener('update', (toot) =>
      callback(mastodonConverter.statusToMessage(toot)),
    );
  },
  setFederationStreaming: async (
    user: ILoginUser,
    callback: (message: IMessage) => void,
  ) => {
    const wsEvents = await (
      await useApiClientsStore().get<'mastodon'>(user)
    ).v1.stream.streamPublicTimeline();
    wsEvents.addListener('update', (toot) =>
      callback(mastodonConverter.statusToMessage(toot)),
    );
  },
  setListStreaming: async (
    user: ILoginUser,
    listId: string,
    callback: (message: IMessage) => void,
  ) => {
    const wsEvents = await (
      await useApiClientsStore().get<'mastodon'>(user)
    ).v1.stream.streamListTimeline(listId);
    wsEvents.addListener('update', (toot) =>
      callback(mastodonConverter.statusToMessage(toot)),
    );
  },
});
