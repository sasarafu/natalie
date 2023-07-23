import type { UUID } from 'crypto';
import type { ILoginUser } from '~/models/common/user';

export const timelineTypes = [
  'home',
  'local',
  'federation',
  'list',
  'user',
] as const;
export type ITimelineType = (typeof timelineTypes)[number];

export type ITimeline = {
  id: UUID;
  name: string;
  query: {
    user: ILoginUser['id'];
    type: ITimelineType;
    option?: { [key: string]: string };
  };
};
