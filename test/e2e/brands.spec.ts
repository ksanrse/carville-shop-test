import { expect, test, type Page } from '@playwright/test'

const brands = ['LUZAR', 'TRIALLI', 'STARTVOLT', 'AIRLINE', 'CARVILLE RACING']

/** Страница открывается без ошибок в консоли и без битых картинок */
async function openClean(page: Page, url: string) {
  const errors: string[] = []
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()))
  page.on('pageerror', (err) => errors.push(err.message))

  const response = await page.goto(url)
  expect(response?.status()).toBe(200)
  await page.waitForLoadState('networkidle')

  const broken = await page
    .locator('img')
    .evaluateAll((imgs) =>
      imgs
        .filter(
          (img) =>
            !(img as HTMLImageElement).complete || (img as HTMLImageElement).naturalWidth === 0,
        )
        .map((img) => (img as HTMLImageElement).src),
    )
  expect(broken).toEqual([])
  return errors
}

const cards = (page: Page) => page.getByRole('list', { name: 'Бренды' }).getByRole('link')

test.describe('десктоп', () => {
  test('витрина: заголовок, все бренды по порядку, без ошибок', async ({ page }) => {
    const errors = await openClean(page, '/brands')

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Бренды интернет-магазина CARVILLESHOP',
    )
    await expect(cards(page).getByRole('heading')).toHaveText(brands)
    await expect(page.getByRole('navigation', { name: 'Основное меню' })).toBeHidden()
    expect(errors).toEqual([])
  })

  for (const rootFont of [16, 20]) {
    test(`геометрия карточки не зависит от корневого шрифта (${rootFont}px)`, async ({ page }) => {
      // без анимации появления, иначе карточка снимается посреди сдвига
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/brands')
      await page.evaluate((px) => (document.documentElement.style.fontSize = `${px}px`), rootFont)

      const card = cards(page).first()
      const cardBox = (await card.boundingBox())!
      const button = (await card.locator('.rounded-full').last().boundingBox())!

      expect(cardBox.width).toBeCloseTo(248, 1)
      expect(cardBox.height).toBeCloseTo(382, 1)
      expect(button.width).toBeCloseTo(40, 1)
      expect(button.height).toBeCloseTo(40, 1)
      // кнопка отступает на 8px от правого и нижнего краёв карточки
      expect(cardBox.x + cardBox.width - (button.x + button.width)).toBeCloseTo(8, 1)
      expect(cardBox.y + cardBox.height - (button.y + button.height)).toBeCloseTo(8, 1)
    })
  }

  test('ховер карточки: фон, кнопка, логотип', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' }) // без анимации появления
    await page.goto('/brands')
    const card = cards(page).filter({ hasText: 'STARTVOLT' })
    const button = card.locator('.rounded-full').last()
    const logo = card.locator('img[src="/brands/startvolt.svg"]')

    const logoBefore = await logo.boundingBox()
    await expect(button).toHaveCSS('background-color', 'rgb(42, 42, 43)')
    await card.hover()
    await expect(button).toHaveCSS('background-color', 'rgb(255, 110, 0)')
    // ховер сдержанный: ничего не увеличивается
    await expect(logo).toHaveCSS('scale', 'none')
    expect(await logo.boundingBox()).toEqual(logoBefore)
    // градиент фона берётся из токена: если токен не попал в CSS, плитка остаётся тёмной
    await expect(card.locator('span[aria-hidden]').nth(1)).toHaveCSS(
      'background-image',
      /linear-gradient\(.*rgb\(155, 15, 5\)/,
    )
  })

  test('иконки шапки: ховер красит рамку и иконку, тултип с названием', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/brands')
    const cart = page.getByRole('link', { name: 'Корзина' })
    const tooltip = cart.locator('.tooltip')

    await expect(tooltip).toBeHidden()
    await cart.hover()
    await expect(cart).toHaveCSS('border-color', 'rgb(255, 110, 0)')
    await expect(cart.locator('span').first()).toHaveCSS('background-color', 'rgb(255, 110, 0)')
    await expect(tooltip).toBeVisible()
    await expect(tooltip).toHaveText('Корзина')
  })

  test('карточка ведёт на страницу бренда и обратно', async ({ page }) => {
    await page.goto('/brands')
    await cards(page).filter({ hasText: 'TRIALLI' }).click()

    await expect(page).toHaveURL('/brands/trialli')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('TRIALLI')
    await expect(page).toHaveTitle(/TRIALLI/)

    await page
      .getByRole('navigation', { name: 'Хлебные крошки' })
      .getByRole('link', { name: 'Бренды' })
      .click()
    await expect(page).toHaveURL('/brands')
    await expect(cards(page)).toHaveCount(brands.length)
  })
})

test.describe('мобильный', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })

  test('витрина и нижнее меню без ошибок', async ({ page }) => {
    const errors = await openClean(page, '/brands')
    const nav = page.getByRole('navigation', { name: 'Основное меню' })

    await expect(cards(page)).toHaveCount(brands.length)
    await expect(nav).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Главная' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Подобрать запчасти' })).toBeHidden()
    expect(errors).toEqual([])

    // Без горизонтального скролла
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
  })
})

test.describe('адаптив', () => {
  for (const width of [360, 768, 1024, 1280, 1440, 1920]) {
    test(`нет горизонтального скролла на ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/brands')
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      )
      expect(overflow).toBe(0)
    })
  }
})
