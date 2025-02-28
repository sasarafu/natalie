import type { MastodonUser } from '~/models/instances/mastodon';
import type { LoginUserInfo, User } from '~/models/user';

export const repositoryMastodon = {
  resume: async (loginUserInfo: LoginUserInfo): Promise<User<MastodonUser>> => {
    return {
      ...loginUserInfo,
      type: 'mastodon',
      userid: 'userid',
    };
  },
};
