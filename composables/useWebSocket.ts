import type { IMessage } from '~/models/common/message';
import type { ITimeline } from '~/models/common/timeline';
import type { IInstanceType } from '~/models/instances/instanceType';
import type { IRepositories } from '~/repositories/repositoryFactory';
import type { UnionToIntersection } from '~/types/UnionToIntersection';

export const useWebSocket = async (
  timeline: ITimeline,
  callback: (message: IMessage) => void,
) => {
  if (useRoute().query['nows']) {
    return;
  }

  const { $repositories } = useNuxtApp();
  const user = useLoginUsersStore().loginUsers[timeline.query.user];

  // 型エラー暫定対応
  return await (
    $repositories(user.instance.type) as UnionToIntersection<
      ReturnType<IRepositories[IInstanceType]>
    >
  )[timeline.query.type]?.stream?.(user, callback);
};
