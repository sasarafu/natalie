import type { BskyUser } from '~/models/instances/bsky';
import type { LoginUserInfo, User } from '~/models/user';

export const repositoryBsky = {
  resume: async (loginUserInfo: LoginUserInfo): Promise<User<BskyUser>> => {
    return {
      ...loginUserInfo,
      type: 'bsky',
      userid: 'userid',
    };
  },
};
