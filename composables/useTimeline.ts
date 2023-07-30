import type { ITimeline } from '~/models/common/timeline';

export const getTimeline = async (
  timeline: ITimeline,
  params?: { sinceId?: string; untilId?: string },
) => {
  const { $repositories } = useNuxtApp();
  const user = storeToRefs(useLoginUsersStore()).loginUsers.value[
    timeline.query.user
  ];

  switch (timeline.query.type) {
    case 'home':
      return await $repositories(user.instance.type).getHomeTimeline(
        user,
        params,
      );
    case 'local':
      return await $repositories(user.instance.type).getLocalTimeline(
        user,
        params,
      );
    case 'federation':
      return await $repositories(user.instance.type).getFedarationTimeline(
        user,
        params,
      );
    case 'list':
      if (!timeline.query.option?.listId) {
        throw new Error('no listId');
      }
      return await $repositories(user.instance.type).getListTimeline(
        user,
        timeline.query.option?.listId,
        params,
      );
    case 'user':
      if (!timeline.query.option?.userId) {
        throw new Error('no userId');
      }
      return await $repositories(user.instance.type).getUserTimeline(
        user,
        timeline.query.option?.userId,
        params,
      );
  }
};
