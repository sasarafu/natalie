import type { IRepositories } from '~/repositories/repositoryFactory';
import { repositoryFactory } from '~/repositories/repositoryFactory';

// typed by types/index.d.ts

export default defineNuxtPlugin((_nuxtApp) => {
  return {
    provide: {
      repositories: (name: keyof IRepositories) =>
        repositoryFactory.get(name)(),
    },
  };
});
