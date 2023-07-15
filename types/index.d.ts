import { IRepositories } from '~/factories/repositoryFactory';

declare module '#app' {
  interface NuxtApp {
    $repositories: <key extends keyof IRepositories>(
      name: key,
    ) => ReturnType<IRepositories[key]>;
  }
}

declare module 'vue' {
  interface ComponentCustomPoperties {
    $repositories: <key extends keyof IRepositories>(
      name: key,
    ) => ReturnType<IRepositories[key]>;
  }
}

export {};
