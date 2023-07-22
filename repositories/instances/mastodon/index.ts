import { login } from 'masto';
import type { ILoginUser } from 'models/common/user';

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
});
