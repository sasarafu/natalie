export const instanceTypes = ['mastodon', 'misskey'] as const;
export type IInstanceType = (typeof instanceTypes)[number];
