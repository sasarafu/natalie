import type * as Bsky from '@atproto/api';
import { BskyAgent } from '@atproto/api';
import type { ILoginUser, ILoginUserInfo } from '~/models/common/user';
import { blueskyConverter } from '~/utils/converters';

const parseAccessToken = (
  accessToken: string,
): Bsky.AtpSessionData | undefined => {
  try {
    return JSON.parse(accessToken);
  } catch {
    return undefined;
  }
};

export const blueskyRepository = () => ({
  client: (user: ILoginUserInfo) => {
    if (user.instance.type !== 'bluesky') {
      throw new Error('not bluesky');
    }

    const agent = new BskyAgent({
      service: user.instance.baseUrl,
      persistSession: (event, session) => {
        if (event === 'update' && session) {
          useLoginUsersStore().updateToken(
            (user) => parseAccessToken(user.accessToken)?.did === session.did,
            JSON.stringify(session),
          );
        }
      },
    });

    // session情報は accessToken にJSON化されて保存されている
    const session = parseAccessToken(user.accessToken);
    if (!session) {
      throw new Error('invalid bluesky session');
    }

    agent.resumeSession(session);
    return agent;
  },
  getAuthUrl: (
    instanceUrl: string, // instance.example.com
    callbackBaseUrl: string, // https://callback.example.com
  ) => {
    // 自分に返す(/callback/bluesky/[instance].vueを参照)
    const url = new URL(`/callback/bluesky/${instanceUrl}`, callbackBaseUrl);
    return url.toString();
  },
  getLoginUser: async (user: ILoginUserInfo): Promise<ILoginUser> => {
    const session = parseAccessToken(user.accessToken);
    if (!session) {
      throw new Error('invalid bluesky session');
    }

    const ret = await useApiClientsStore()
      .get<'bluesky'>(user)
      .getProfile({ actor: session.did });

    if (!ret.success) {
      useToastsStore().add({
        text: 'Blueskyのユーザ情報取得に失敗しました',
        level: 'error',
      });
      throw new Error('hoge');
    }

    return {
      ...user,
      userid: ret.data.did,
      username: ret.data.handle,
      displayName: ret.data.displayName ?? ret.data.handle,
      iconUrl: ret.data.avatar ?? '',
    };
  },
  home: {
    get: async (user: ILoginUser, params?: { untilId?: string }) => {
      const ret = await useApiClientsStore()
        .get<'bluesky'>(user)
        .getTimeline({
          cursor: params?.untilId,
        });
      if (!ret.success) {
        useToastsStore().add({
          text: 'BlueskyのHome取得に失敗しました',
          level: 'error',
        });
        return [];
      }
      return ret.data.feed.map((post) =>
        blueskyConverter.postToMessage(post, ret.data.cursor, user),
      );
    },
    stream: undefined,
  },
});
