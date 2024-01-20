export const instanceTypes = ['bluesky', 'mastodon', 'misskey'] as const;
export type IInstanceType = (typeof instanceTypes)[number];

export const timelineTypes = {
  bluesky: ['home'],
  mastodon: ['home', 'local', 'federation'],
  misskey: ['home', 'local', 'global'],
} as const satisfies { [key in IInstanceType]: string[] };

export type ITimelineType<T extends IInstanceType = IInstanceType> =
  (typeof timelineTypes)[T][number];
