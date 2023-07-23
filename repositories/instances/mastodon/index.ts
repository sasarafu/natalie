import { login } from 'masto';
import type { mastodon } from 'masto';
import type { IMessage } from '~/models/common/message';
import type { ITimeline } from '~/models/common/timeline';
import type { ILoginUser } from '~/models/common/user';

const statusToMessage = (toot: mastodon.v1.Status) => {
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
  } as IMessage;
};

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
  getTimeline: async (timelineQuery: ITimeline['query'], user: ILoginUser) => {
    if (timelineQuery.user !== user.id || user.instance.type !== 'mastodon') {
      throw new Error('invalid');
    }

    const client = await login({
      url: user.instance.baseUrl,
      accessToken: user.accessToken,
    });

    switch (timelineQuery.type) {
      case 'home':
        return (
          await client.v1.timelines.listHome({
            maxId: timelineQuery.option?.maxId,
          })
        ).map(statusToMessage);
      case 'local':
        return (
          await client.v1.timelines.listPublic({
            local: true,
            maxId: timelineQuery.option?.maxId,
          })
        ).map(statusToMessage);
      case 'federation':
        return (
          await client.v1.timelines.listPublic({
            maxId: timelineQuery.option?.maxId,
          })
        ).map(statusToMessage);
      case 'list':
        if (!timelineQuery.option?.listId) {
          throw new Error('no listId');
        }
        return (
          await client.v1.timelines.listList(timelineQuery.option.listId, {
            maxId: timelineQuery.option?.maxId,
          })
        ).map(statusToMessage);
      case 'user':
        if (!timelineQuery.option?.userId) {
          throw new Error('no userId');
        }
        return (
          await client.v1.accounts.listStatuses(timelineQuery.option.userId, {
            maxId: timelineQuery.option?.maxId,
          })
        ).map(statusToMessage);
    }
  },
});
