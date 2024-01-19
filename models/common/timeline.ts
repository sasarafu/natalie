import type { UUID } from 'crypto';
import type { ILoginUserInfo } from '~/models/common/user';
import type { ITimelineType } from '../instances/instanceType';

export type ITimeline = {
  id: UUID;
  name: string;
  notify: boolean;
  query: {
    user: ILoginUserInfo['id'];
    type: ITimelineType;
    option?: { [key: string]: string };
  };
};
