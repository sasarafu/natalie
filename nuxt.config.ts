// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@pinia/nuxt', 'dayjs-nuxt'],
  components: [{ path: '~/components/instances', prefix: '' }, '~/components'],
  pinia: {
    autoImports: ['defineStore'],
  },
  dayjs: {
    defaultLocale: 'en',
    relativeTime: {
      future: '-%s',
      past: '%s',
      s: '%ds',
      m: '1m',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: '1d',
      dd: '%dd',
      M: '1mo',
      MM: '%dmo',
      y: '1y',
      yy: '%dy',
    },
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Material+Symbols+Outlined',
        },
      ],
    },
  },
});
