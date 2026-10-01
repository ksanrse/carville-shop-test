export interface BrandLogo {
  src: string
  /** Размер на десктопе, px. На мобильных логотип уменьшается пропорционально. */
  width: number
  height: number
}

/**
 * Акцент фирменной плашки: фон карточки при наведении и фон на странице бренда.
 * Сами градиенты — view-данные во фронте, см. app/utils/brand-accent.ts
 */
export type BrandAccent = 'red' | 'neutral'

export interface Brand {
  slug: string
  name: string
  description: string
  /** Короткое описание для футера */
  shortDescription: string
  skuCount: number
  logo: BrandLogo
  /**
   * Размер логотипа в мобильном макете (масштаб у брендов разный, поэтому не вычисляется).
   * View-данные: при переходе на реальный API будут жить во фронтовом словаре по slug
   */
  logoMobile: Pick<BrandLogo, 'width' | 'height'>
  /** Монохромный логотип для светлого фона (футер) */
  logoSmall: BrandLogo
  accent: BrandAccent
}
