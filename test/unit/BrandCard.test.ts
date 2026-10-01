import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import BrandCard from '~/components/BrandCard.vue'
import { brands } from '../../server/utils/brands'

const brand = brands.find((b) => b.slug === 'startvolt')!

describe('BrandCard', () => {
  it('вся карточка — одна ссылка на страницу бренда', async () => {
    const card = await mountSuspended(BrandCard, { props: { brand, index: 2 } })

    expect(card.element.tagName).toBe('A')
    expect(card.attributes('href')).toBe('/brands/startvolt')
    expect(card.attributes('style')).toContain('animation-delay: 120ms')
    expect(card.find('h2').text()).toBe('STARTVOLT')
    expect(card.text()).toContain(brand.description)
    expect(card.text()).toContain('8\u00A0753 SKU')
  })

  it('логотип декоративный, имя ссылки не дублирует название', async () => {
    const card = await mountSuspended(BrandCard, { props: { brand } })
    const logo = card.find(`img[src="${brand.logo.src}"]`)

    expect(logo.attributes('alt')).toBe('')
    expect(logo.attributes('style')).toContain('view-transition-name: brand-logo-startvolt')
    // доступное имя ссылки собирается из текста: название встречается ровно один раз
    expect(card.text().split(brand.name)).toHaveLength(2)
    for (const decor of card.findAll('[aria-hidden="true"]'))
      expect(decor.find('img[alt]:not([alt=""])').exists()).toBe(false)
  })

  it('градиент плитки — по акценту бренда, размеры лого в атрибутах целые', async () => {
    const luzar = brands.find((b) => b.slug === 'luzar')!
    const card = await mountSuspended(BrandCard, { props: { brand: luzar } })
    const logo = card.find(`img[src="${luzar.logo.src}"]`)

    expect(card.html()).toContain('var(--gradient-brand-hover)')
    expect(logo.attributes('width')).toBe('147')
    expect(logo.attributes('height')).toBe('40')
  })
})
