export const instanceTypes = ['mastodon', 'misskey'] as const;
export type IInstanceType = (typeof instanceTypes)[number];

export const timelineTypes = {
  mastodon: ['home', 'local', 'federation'],
  misskey: ['home', 'local', 'global'],
} as const satisfies { [key in IInstanceType]: string[] };

export type ITimelineType<T extends IInstanceType = IInstanceType> =
  (typeof timelineTypes)[T][number];
