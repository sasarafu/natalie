import { version as packageVersion } from './package.json';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-08-10',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  components: [{ path: '~/components/instances', prefix: '' }, '~/components'],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1',
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      appName: 'Natalie',
      version: packageVersion,
      natalieEnv: 'dev',
    },
  },
});
