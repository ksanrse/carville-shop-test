import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/seo'],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      meta: [
        // viewport-fit=cover — иначе env(safe-area-inset-*) всегда равен 0
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#f7f7f7' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate', type: 'text/plain', href: '/llms.txt', title: 'llms.txt' },
        {
          rel: 'preload',
          href: '/fonts/lato-medium.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
        {
          rel: 'preload',
          href: '/fonts/lato-bold.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://carville-shop.vercel.app',
    name: 'CARVILLE SHOP',
    description: 'Интернет-магазин автозапчастей CARVILLE SHOP',
    defaultLocale: 'ru',
  },

  // Главная пока не готова — ведём на бренды. 307, чтобы не закэшировать навсегда.
  routeRules: {
    '/': { redirect: { to: '/brands', statusCode: 307 } },
    '/brands': { isr: 3600 },
    // Известный компромисс: ISR кэширует и 404 для любых /brands/*. Когда появится
    // реальный каталог, понадобится инвалидация кэша или on-demand revalidation.
    '/brands/**': { isr: 3600 },
  },

  // Плавный переход между списком брендов и страницей бренда (View Transitions API)
  experimental: { viewTransition: true },

  compatibilityDate: '2025-07-15',

  vite: {
    plugins: [tailwindcss()],
  },

  ogImage: { enabled: false },

  // Поисковикам и AI-ассистентам (RAG, поиск) — можно, на обучение моделей — нет
  robots: {
    groups: [
      {
        userAgent: '*',
        contentSignal: { search: 'yes', 'ai-input': 'yes', 'ai-train': 'no' },
      },
    ],
  },

  // Динамические страницы брендов в sitemap — из того же источника данных, что и страницы
  sitemap: {
    sources: ['/api/__sitemap__/brands'],
  },
})
