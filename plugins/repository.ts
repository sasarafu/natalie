import type { IRepositories } from '~/factories/repositoryFactory';
import { repositoryFactory } from '~/factories/repositoryFactory';

// typed by types/index.d.ts

export default defineNuxtPlugin((_nuxtApp) => {
  return {
    provide: {
      repositories: (name: keyof IRepositories) =>
        repositoryFactory.get(name)(),
    },
  };
});
