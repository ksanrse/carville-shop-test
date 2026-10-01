import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { brands } from '../../server/utils/brands'

// Контракт данных: ломается — ломаются URL, sitemap и картинки на витрине
describe('данные брендов', () => {
  it('slug уникальные и пригодны для URL', () => {
    const slugs = brands.map((b) => b.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  })

  it('все логотипы лежат в public', () => {
    for (const { logo, logoSmall } of brands) {
      for (const { src } of [logo, logoSmall]) expect(existsSync(`public${src}`), src).toBe(true)
    }
  })
})

describe('formatSku', () => {
  it('разбивает разряды по-русски', () => {
    expect(formatSku(17748)).toBe('17\u00A0748 SKU')
    expect(formatSku(0)).toBe('0 SKU')
  })
})
