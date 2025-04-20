export const misskey = 'misskey' as const;
export type Misskey = typeof misskey;

export type MisskeyUser = {
  type: Misskey;
  userid: string;
};

export type MisskeyPost = {
  type: Misskey;
  user: MisskeyUser;
  content: string;
};
