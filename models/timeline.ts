import type { UUID } from 'node:crypto';
import type { LoginUserInfo } from './user';

export type Timeline = {
  id: UUID;
  name: string;
  userid: LoginUserInfo['id'];
};
