export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const brand = brands.find((b) => b.slug === slug)
  if (!brand) {
    throw createError({ statusCode: 404, message: 'Бренд не найден' })
  }
  return brand
})
