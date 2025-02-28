import type { MisskeyUser } from '~/models/instances/misskey';
import type { LoginUserInfo, User } from '~/models/user';

export const repositoryMisskey = {
  resume: async (loginUserInfo: LoginUserInfo): Promise<User<MisskeyUser>> => {
    return {
      ...loginUserInfo,
      type: 'misskey',
      userid: 'userid',
    };
  },
};
