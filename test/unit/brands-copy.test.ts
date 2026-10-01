import { describe, expect, it } from 'vitest'
import { brands } from '../../server/utils/brands'

describe('тексты брендов', () => {
  it('в описании Trialli неразрывный пробел держит «и грузовых» вместе (перенос как в макете)', () => {
    const trialli = brands.find((b) => b.slug === 'trialli')!
    expect(trialli.description).toContain('и грузовых')
  })

  it('короткое описание Trialli переносится по строкам, как в футере макета', () => {
    expect(brands.find((b) => b.slug === 'trialli')!.shortDescription).toBe(
      'Запчасти,\nавтоаксессуары',
    )
  })
})
