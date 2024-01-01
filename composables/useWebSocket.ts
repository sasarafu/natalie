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
  const user =
    storeToRefs(useLoginUsersStore()).loginUsers.value[timeline.query.user];

  switch (timeline.query.type) {
    case 'home':
      return await $repositories(user.instance.type).setHomeStreaming(
        user,
        callback,
      );
    case 'local':
      return await $repositories(user.instance.type).setLocalStreaming(
        user,
        callback,
      );
    case 'federation':
      return await $repositories(user.instance.type).setFederationStreaming(
        user,
        callback,
      );
    case 'list':
      if (!timeline.query.option?.listId) {
        throw new Error('no listId');
      }
      return await $repositories(user.instance.type).setListStreaming(
        user,
        timeline.query.option.listId,
        callback,
      );
    case 'user':
    // not implemented
  }
};
