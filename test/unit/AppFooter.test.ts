import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import AppFooter from '~/components/AppFooter.vue'
import { brands } from '../../server/utils/brands'

registerEndpoint('/api/brands', () => brands)

describe('AppFooter', () => {
  it('выводит все бренды ссылками', async () => {
    const footer = await mountSuspended(AppFooter)
    const hrefs = footer.findAll('nav[aria-label="Бренды"] a').map((a) => a.attributes('href'))

    expect(hrefs).toEqual(brands.map((b) => `/brands/${b.slug}`))
  })

  it('после подписки очищает поле и благодарит', async () => {
    const footer = await mountSuspended(AppFooter)
    const input = footer.find('input[type="email"]')

    await input.setValue('test@example.com')
    await footer.find('form').trigger('submit')

    expect((input.element as HTMLInputElement).value).toBe('')
    expect(input.attributes('placeholder')).toBe('Спасибо, вы подписаны!')
    expect(footer.find('[role="status"]').text()).toBe('Спасибо, вы подписаны!')
  })

  it('при ошибке API не падает и не рисует блок брендов', async () => {
    // useFetch кэширует ответ по ключу 'brands' — сбрасываем, иначе увидим данные первого теста
    const unregister = registerEndpoint('/api/brands', () => new Response(null, { status: 503 }))
    clearNuxtData('brands')

    const footer = await mountSuspended(AppFooter)
    unregister()
    clearNuxtData('brands')

    expect(footer.find('nav[aria-label="Бренды"]').exists()).toBe(false)
    // остальной футер на месте: логотип, навигация, форма подписки
    expect(footer.find('form').exists()).toBe(true)
  })
})
