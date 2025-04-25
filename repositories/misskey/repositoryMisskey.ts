import { api } from 'misskey-js';
import type { MisskeyUser } from '~/models/instances/misskey';
import type { LoginUserInfo, User } from '~/models/user';

export const repositoryMisskey = {
  resume: async (loginUserInfo: LoginUserInfo): Promise<User<MisskeyUser>> => {
    const client = new api.APIClient({
      origin: loginUserInfo.baseUrl,
      credential: loginUserInfo.accessToken,
    });
    const user = await client.request('i', {});

    return {
      ...loginUserInfo,
      type: 'misskey',
      userid: user.id,
    };
  },
};
