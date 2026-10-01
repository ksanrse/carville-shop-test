export default defineSitemapEventHandler(() =>
  brands.map((brand) => ({ loc: `/brands/${brand.slug}`, changefreq: 'weekly' as const })),
)
