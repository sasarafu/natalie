import type { LoginUserInfo } from '~/models/user';

export const useUsersStore = useState(() => {
  const loginUsers = useLocalStorage<LoginUserInfo[]>('natalie/loginUsers', []);
  return loginUsers;
});
