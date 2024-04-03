import type { IComposeMessage } from '~/models/common/composeMessage';
import type { ILoginUser } from '~/models/common/user';

type IComposeData = {
  onlyFocus?: true;
  data?: {
    userId: ILoginUser['id'];
    message: IComposeMessage;
  };
};

// composeUserの切り替え・フォーカスの調整を行うためのComposable
// Stateを持つが、一時的なものであるためStoreにはしない
export const useCompose = () => {
  const switchComposeData = useState<IComposeData | undefined>(
    'switchComposeData',
    () => undefined,
  );

  const focus = () => {
    switchComposeData.value = {
      ...switchComposeData.value,
      onlyFocus: true,
    };
  };

  const set = (userId: ILoginUser['id'], message: IComposeMessage) => {
    if (switchComposeData.value) {
      return;
    }

    switchComposeData.value = {
      data: {
        userId,
        message,
      },
    };
  };

  const clear = () => (switchComposeData.value = undefined);

  return {
    switchComposeData: readonly(switchComposeData),
    focus,
    set,
    clear,
  };
};
