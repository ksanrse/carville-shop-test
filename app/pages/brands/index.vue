<script setup lang="ts">
const { data: brands, error } = await useFetch('/api/brands', { key: 'brands' })

// Без данных пустую витрину показывать нельзя: ISR закэшировал бы её со статусом 200
if (error.value || !brands.value) {
  throw createError({ statusCode: 503, message: 'Не удалось загрузить бренды', fatal: true })
}

const title = 'Бренды интернет-магазина CARVILLESHOP'
const description =
  'Собственные бренды CARVILLE SHOP: LUZAR, TRIALLI, STARTVOLT, AIRLINE и CARVILLE RACING — запчасти, автоэлектрика, автоаксессуары и автохимия.'

useSeoMeta({
  title: 'Бренды',
  description,
  ogTitle: title,
  ogDescription: description,
})

useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage', name: title }),
  defineItemList({
    itemListElement: brands.value.map((brand, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: brand.name,
      url: `/brands/${brand.slug}`,
    })),
  }),
])
</script>

<template>
  <div class="flex flex-col gap-4 pt-4 lg:gap-0 lg:pt-6">
    <AppBreadcrumbs :items="[{ label: 'Главная', to: '/' }, { label: 'Бренды' }]" />
    <PageTitle :title="title" back-to="/" class="lg:mt-2" />

    <ul
      aria-label="Бренды"
      class="grid gap-2 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] md:gap-4 lg:mt-7 xl:grid-cols-5"
    >
      <li v-for="(brand, i) in brands" :key="brand.slug">
        <BrandCard :brand="brand" :index="i" />
      </li>
    </ul>
  </div>
</template>
