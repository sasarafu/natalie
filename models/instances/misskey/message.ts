import type { entities } from 'misskey-js';
import type { IMessage } from '~/models/common/message';

export type IMisskeyMessage = IMessage & {
  body: entities.Note;
};
