import { login } from 'masto';
import type { ILoginUser } from 'models/common/user';

export const mastodonRepository = () => ({
  client: async (user: ILoginUser) =>
    await login({
      url: user.instance.baseUrl,
      accessToken: user.accessToken,
    }),
});
