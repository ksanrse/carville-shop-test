// llms.txt — краткая карта сайта для AI-агентов (https://llmstxt.org)
export default defineEventHandler((event) => {
  const { url, name, description } = getSiteConfig(event)

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return [
    `# ${name}`,
    '',
    `> ${description}. Собственные бренды магазина — запчасти, автоэлектрика, автоаксессуары и автохимия.`,
    '',
    '## Бренды',
    '',
    `- [Все бренды](${url}/brands)`,
    ...brands.map(
      (brand) =>
        `- [${brand.name}](${url}/brands/${brand.slug}): ${brand.description}, ${formatSku(brand.skuCount)}`,
    ),
    '',
  ].join('\n')
})
