import type { IMessage } from '~/models/common/message';
import type { ITimeline } from '~/models/common/timeline';

export const useWebSocket = async (
  timeline: ITimeline,
  callback: (message: IMessage) => void,
) => {
  if (useRoute().query['nows']) {
    return;
  }

  const { $repositories } = useNuxtApp();
  const user = useLoginUsersStore().loginUsers[timeline.query.user];

  // TODO: 型エラー解消
  // @ts-ignore
  return await $repositories(user.instance.type)[timeline.query.type]?.stream?.(
    user,
    callback,
  );
};
