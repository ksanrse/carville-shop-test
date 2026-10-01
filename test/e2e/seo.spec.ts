import { expect, test } from '@playwright/test'

const slugs = ['luzar', 'trialli', 'startvolt', 'airline', 'carville-racing']
const site = 'https://carville-shop.vercel.app'

test('мета и schema.org на странице брендов', async ({ page }) => {
  await page.goto('/brands')

  await expect(page).toHaveTitle(/Бренды/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /LUZAR/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${site}/brands`)

  const graph = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').first().textContent()) ?? '{}',
  )['@graph'] as { '@type': string | string[]; itemListElement?: unknown[] }[]
  const byType = (type: string) => graph.find((node) => [node['@type']].flat().includes(type))

  expect(byType('CollectionPage')).toBeTruthy()
  expect(byType('ItemList')?.itemListElement).toHaveLength(slugs.length)
  expect(byType('BreadcrumbList')?.itemListElement).toHaveLength(2)
})

test('главная временно (307) ведёт на бренды, неизвестный бренд — 404', async ({ request }) => {
  const root = await request.get('/', { maxRedirects: 0 })
  expect(root.status()).toBe(307)
  expect(root.headers().location).toBe('/brands')

  expect((await request.get('/brands/nope')).status()).toBe(404)
  expect((await request.get('/api/brands/nope')).status()).toBe(404)
})

test('на 404 есть ссылка «Все бренды»', async ({ page }) => {
  await page.goto('/brands/nope')
  await expect(page.getByRole('heading', { name: '404' })).toBeVisible()
  await expect(page.getByText('Бренд не найден')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Все бренды' })).toBeVisible()
})

test('robots.txt, sitemap.xml и llms.txt', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text()
  expect(robots).toContain(`Sitemap: ${site}/sitemap.xml`)
  expect(robots).toMatch(/Content-Signal: .*ai-train=no/)
  expect(robots).not.toMatch(/^Disallow: \/$/m)

  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const path of ['/brands', ...slugs.map((s) => `/brands/${s}`)])
    expect(sitemap).toContain(`<loc>${site}${path}</loc>`)

  const llms = await request.get('/llms.txt')
  expect(llms.headers()['content-type']).toContain('text/plain')
  const llmsText = await llms.text()
  for (const slug of slugs) expect(llmsText).toContain(`${site}/brands/${slug}`)
})
