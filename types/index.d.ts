import type { IRepositories } from '~/repositories/repositoryFactory';

declare module '#app' {
  interface NuxtApp {
    $repositories: <key extends keyof IRepositories>(
      name: key,
    ) => ReturnType<IRepositories[key]>;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $repositories: <key extends keyof IRepositories>(
      name: key,
    ) => ReturnType<IRepositories[key]>;
  }
}

export {};
