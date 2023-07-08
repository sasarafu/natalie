// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@pinia/nuxt'],
  components: [{ path: '~/components/instances', prefix: '' }, '~/components'],
  pinia: {
    autoImports: ['defineStore'],
  },
});
