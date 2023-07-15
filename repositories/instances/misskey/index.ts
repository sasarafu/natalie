import { api } from 'misskey-js';
import type { ILoginUser } from 'models/common/user';

export const misskeyRepository = () => ({
  client(user: ILoginUser) {
    return new api.APIClient({
      origin: user.instance.baseUrl,
      credential: user.accessToken,
    });
  },
});
