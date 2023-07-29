import { login } from 'masto';
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
  getHomeTimeline: async (user: ILoginUser) => {
    return (
      await (
        await useApiClientsStore().get<'mastodon'>(user)
      ).v1.timelines.listHome()
    ).map(mastodonConverter.statusToMessage);
  },
  getLocalTimeline: async (user: ILoginUser) => {
    return (
      await (
        await useApiClientsStore().get<'mastodon'>(user)
      ).v1.timelines.listPublic({ local: true })
    ).map(mastodonConverter.statusToMessage);
  },
  getFedarationTimeline: async (user: ILoginUser) => {
    return (
      await (
        await useApiClientsStore().get<'mastodon'>(user)
      ).v1.timelines.listPublic()
    ).map(mastodonConverter.statusToMessage);
  },
  getListTimeline: async (user: ILoginUser, listId: string) => {
    return (
      await (
        await useApiClientsStore().get<'mastodon'>(user)
      ).v1.timelines.listList(listId)
    ).map(mastodonConverter.statusToMessage);
  },
  getUserTimeline: async (user: ILoginUser, userId: string) => {
    return (
      await (
        await useApiClientsStore().get<'mastodon'>(user)
      ).v1.accounts.listStatuses(userId)
    ).map(mastodonConverter.statusToMessage);
  },
});
