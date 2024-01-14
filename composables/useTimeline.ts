import type { IMessage } from '~/models/common/message';
import type { ITimeline } from '~/models/common/timeline';

export const getTimeline = async (
  timeline: ITimeline,
  params?: { sinceId?: string; untilId?: string },
): Promise<IMessage[]> => {
  const { $repositories } = useNuxtApp();
  const user = useLoginUsersStore().loginUsers[timeline.query.user];

  // TODO: 型エラー解消
  // @ts-ignore
  return await $repositories(user.instance.type)[timeline.query.type]?.get?.(
    user,
    params,
  );
};
