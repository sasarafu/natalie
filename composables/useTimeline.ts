import type { IMessage } from '~/models/common/message';
import type { ITimeline } from '~/models/common/timeline';
import type { IInstanceType } from '~/models/instances/instanceType';
import type { IRepositories } from '~/repositories/repositoryFactory';
import type { UnionToIntersection } from '~/types/UnionToIntersection';

export const getTimeline = async (
  timeline: ITimeline,
  params?: { sinceId?: string; untilId?: string },
): Promise<IMessage[]> => {
  const { $repositories } = useNuxtApp();
  const user = useLoginUsersStore().loginUsers[timeline.query.user];

  // 型エラー暫定対応
  return await (
    $repositories(user.instance.type) as UnionToIntersection<
      ReturnType<IRepositories[IInstanceType]>
    >
  )[timeline.query.type]?.get?.(user, params ?? {});
};
