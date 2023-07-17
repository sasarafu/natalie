import { api } from 'misskey-js';
import type { ILoginUser } from 'models/common/user';

export const misskeyRepository = () => ({
  client(user: ILoginUser) {
    return new api.APIClient({
      origin: user.instance.baseUrl,
      credential: user.accessToken,
    });
  },
  getAuthUrl: (
    instanceUrl: string, // instance.example.com
    callbackBaseUrl: string, // https://callback.example.com (window.location.origin)
  ) => {
    const config = useRuntimeConfig();

    // use miauth
    const sessionId = crypto.randomUUID();
    const url = new URL(`/miauth/${sessionId}`, `https://${instanceUrl}`);

    url.searchParams.append('name', config.public.appName);
    url.searchParams.append(
      'callback',
      `${callbackBaseUrl}/callback/misskey/${instanceUrl}`,
    );
    // permission list: https://misskey-hub.net/docs/api/permission.html
    url.searchParams.append(
      'permission',
      'read:account,write:account,read:blocks,write:blocks,read:drive,write:drive,read:favorites,write:favorites,read:following,write:following,read:messaging,write:messaging,read:mutes,write:mutes,write:notes,read:notifications,write:notifications,write:reactions,write:votes,read:pages,write:pages,write:page-likes,read:page-likes,write:gallery-likes,read:gallery-likes',
    );
    return url.toString();
  },
});
