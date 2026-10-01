import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import AppBreadcrumbs from '~/components/AppBreadcrumbs.vue'
import AppHeader from '~/components/AppHeader.vue'
import MobileNav from '~/components/MobileNav.vue'
import PageTitle from '~/components/PageTitle.vue'

describe('MobileNav', () => {
  it.each(['/brands', '/brands/luzar'])('на %s активна «Главная»', async (route) => {
    const nav = await mountSuspended(MobileNav, { route })
    const active = nav.findAll('a').filter((a) => a.attributes('aria-current') === 'page')

    expect(active.map((a) => a.text())).toEqual(['Главная'])
  })
})

describe('AppBreadcrumbs', () => {
  it('последняя крошка — текущая страница, не ссылка', async () => {
    const crumbs = await mountSuspended(AppBreadcrumbs, {
      props: { items: [{ label: 'Главная', to: '/' }, { label: 'Бренды' }] },
    })

    expect(crumbs.find('a').attributes('href')).toBe('/')
    expect(crumbs.find('[aria-current="page"]').text()).toBe('Бренды')
    expect(crumbs.findAll('a')).toHaveLength(1)
  })
})

describe('AppHeader', () => {
  it('поиск работает без JS: GET /search?q=…', async () => {
    const header = await mountSuspended(AppHeader)
    const form = header.find('form[role="search"]')

    expect(form.attributes('action')).toBe('/search')
    expect(form.find('input').attributes('name')).toBe('q')
    expect(form.find('input').attributes('aria-label')).toBeTruthy()
  })
})

describe('PageTitle', () => {
  it('h1 и стрелка «назад» на backTo', async () => {
    const title = await mountSuspended(PageTitle, { props: { title: 'Бренды', backTo: '/' } })

    expect(title.find('h1').text()).toBe('Бренды')
    expect(title.find('a[aria-label="Назад"]').attributes('href')).toBe('/')
  })
})
