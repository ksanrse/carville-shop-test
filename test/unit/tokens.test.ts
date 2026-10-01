import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('app/assets/css/main.css', 'utf8')
const theme = css.match(/@theme static\s*\{[\s\S]*?\n\}/)![0]

describe('токены main.css', () => {
  it('отступы и радиусы в px, а не в rem — макет не должен плыть от шрифта браузера', () => {
    expect(theme).toMatch(/--spacing:\s*4px/)
    const radii = [...theme.matchAll(/--radius-[\w-]+:\s*([^;]+);/g)].map((m) => m[1]!)
    expect(radii.length).toBeGreaterThan(0)
    for (const value of radii) expect(value).toMatch(/^\d+px$/)
  })

  it('@theme static: токены, которые не используются классами (градиенты), всё равно попадают в CSS', () => {
    expect(css).toMatch(/@theme\s+static/)
    expect(theme).toContain('--gradient-brand-hover-red')
  })

  it('градиенты hover объявлены в @theme static, иначе Tailwind выкинет их из CSS', () => {
    expect(theme).toContain('--gradient-brand-hover:')
    expect(theme).toContain('--gradient-brand-hover-red:')
  })

  it('у каждого Lato задана коррекция метрик под Figma', () => {
    const faces = css.match(/@font-face\s*\{[^}]*\}/g)!
    expect(faces).toHaveLength(5)
    for (const face of faces) {
      expect(face).toContain('ascent-override: 98.7%')
      expect(face).toContain('descent-override: 21.3%')
      expect(face).toContain('line-gap-override: 0%')
    }
  })
})
