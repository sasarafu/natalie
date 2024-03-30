import { version as packageVersion } from './package.json';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
  ],
  components: [{ path: '~/components/instances', prefix: '' }, '~/components'],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1',
        },
        {
          rel: 'manifest',
          href: '/manifest.webmanifest',
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
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Natalie',
      short_name: 'Natalie',
      display: 'standalone',
      start_url: '/',
      theme_color: 'black',
      icons: [],
    },
  },
});
