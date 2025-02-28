import { Agent } from '@atproto/api';
import { BrowserOAuthClient } from '@atproto/oauth-client-browser';
import type { BskyUser } from '~/models/instances/bsky';
import type { LoginUserInfo, User } from '~/models/user';
import clientMetadata from '~/public/oauth/bsky-client-metadata.json';

export const repositoryBsky = {
  createSession: () => {
    return new BrowserOAuthClient({
      // @ts-expect-error unable to type-narrowing of json file
      clientMetadata: clientMetadata,
      handleResolver: 'https://bsky.social',
    });
  },
  resume: async (loginUserInfo: LoginUserInfo): Promise<User<BskyUser>> => {
    const restoredSession = await repositoryBsky
      .createSession()
      .restore(loginUserInfo.accessToken);
    const agent = new Agent(restoredSession);

    return {
      ...loginUserInfo,
      type: 'bsky',
      userid: agent.assertDid,
    };
  },
};
