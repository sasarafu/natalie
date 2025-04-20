export const mastodon = 'mastodon' as const;
export type Mastodon = typeof mastodon;

export type MastodonUser = {
  type: Mastodon;
  userid: string;
};

export type MastodonPost = {
  type: Mastodon;
  user: MastodonUser;
  body: string;
};
