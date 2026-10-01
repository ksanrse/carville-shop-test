import type { BrandAccent } from '#shared/types/brand'

// Акцент бренда → CSS-переменная градиента плитки (токены --gradient-brand-hover* в main.css).
// Из API приходит только имя акцента, сами градиенты — view-данные фронта.
// Фирменный градиент в макете нарисован только для STARTVOLT, для остальных — нейтральный графит.
export const brandAccentGradient: Record<BrandAccent, string> = {
  red: 'var(--gradient-brand-hover-red)',
  neutral: 'var(--gradient-brand-hover)',
}
