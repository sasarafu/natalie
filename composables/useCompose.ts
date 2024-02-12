import type { ILoginUser } from '~/models/common/user';

const activeComposeUser = ref<ILoginUser>();

export const useCompose = () => {
  return { activeComposeUser };
};
