export const bsky = 'bsky' as const;
export type Bsky = typeof bsky;

export type BskyUser = {
  type: Bsky;
  userid: string;
};

export type BskyPost = {
  type: Bsky;
  user: BskyUser;
  text: string;
};
