import type { Brand } from '#shared/types/brand'

// Моки. В продукте здесь будет запрос к API (сначала прослойка над Bitrix, потом новый бэкенд) —
// страницы и компоненты при этом не меняются, они ходят только в /api/brands.

export const brands: Brand[] = [
  {
    slug: 'luzar',
    name: 'LUZAR',
    description: 'Радиаторы и другие детали системы охлаждения для легковых и грузовых автомобилей',
    shortDescription: 'Запчасти, системы охлаждения',
    skuCount: 8190,
    logo: { src: '/brands/luzar.svg', width: 146.67, height: 40 },
    logoMobile: { width: 110, height: 30 },
    logoSmall: { src: '/brands/luzar-small.svg', width: 28.15, height: 26.41 },
    accent: 'neutral',
  },
  {
    slug: 'trialli',
    name: 'TRIALLI',
    description: 'Российский производитель автокомпонентов для легковых и грузовых автомобилей',
    shortDescription: 'Запчасти,\nавтоаксессуары',
    skuCount: 17748,
    logo: { src: '/brands/trialli.svg', width: 86.51, height: 49.14 },
    logoMobile: { width: 62.29, height: 35.38 },
    logoSmall: { src: '/brands/trialli-small.svg', width: 28.03, height: 15.92 },
    accent: 'neutral',
  },
  {
    slug: 'startvolt',
    name: 'STARTVOLT',
    description: 'Производитель стартеров, генераторов и автоэлектрики',
    shortDescription: 'Генераторы, стартеры, запчасти',
    skuCount: 8753,
    logo: { src: '/brands/startvolt.svg', width: 92.31, height: 50.05 },
    logoMobile: { width: 62.22, height: 33.63 },
    logoSmall: { src: '/brands/startvolt-small.svg', width: 28, height: 15.14 },
    accent: 'red',
  },
  {
    slug: 'airline',
    name: 'AIRLINE',
    description: 'Ведущий российский бренд автоаксессуаров и проф. инструмента',
    shortDescription: 'Автоаксессуары, инструменты',
    skuCount: 8890,
    logo: { src: '/brands/airline.svg', width: 153.21, height: 40 },
    logoMobile: { width: 114.91, height: 30 },
    logoSmall: { src: '/brands/airline-small.svg', width: 26.75, height: 23.47 },
    accent: 'neutral',
  },
  {
    slug: 'carville-racing',
    name: 'CARVILLE RACING',
    description: 'Производитель технических жидкостей, фильтров и автохимии',
    shortDescription: 'Тех. жидкости, автохимия, фильтры',
    skuCount: 2844,
    logo: { src: '/brands/carville-racing.svg', width: 75.58, height: 50 },
    logoMobile: { width: 61, height: 40 },
    logoSmall: { src: '/brands/carville-racing-small.svg', width: 26, height: 18 },
    accent: 'neutral',
  },
]
