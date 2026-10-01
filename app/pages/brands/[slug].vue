<script setup lang="ts">
const route = useRoute('brands-slug')
const { data: brand, error } = await useFetch(() => `/api/brands/${route.params.slug}`)

if (error.value || !brand.value) {
  throw createError({ statusCode: 404, message: 'Бренд не найден', fatal: true })
}

useSeoMeta({
  title: brand.value.name,
  description: brand.value.description,
  ogTitle: brand.value.name,
  ogDescription: brand.value.description,
})
</script>

<template>
  <div v-if="brand" class="flex flex-col gap-4 pt-4 lg:gap-0 lg:pt-6">
    <AppBreadcrumbs
      :items="[
        { label: 'Главная', to: '/' },
        { label: 'Бренды', to: '/brands' },
        { label: brand.name },
      ]"
    />
    <PageTitle :title="brand.name" back-to="/brands" class="lg:mt-2" />

    <section class="grid gap-4 lg:mt-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div
        class="grid h-60 place-items-center rounded-3xl lg:h-96"
        :style="{ background: brandAccentGradient[brand.accent] }"
      >
        <img
          :src="brand.logo.src"
          alt=""
          :width="Math.round(brand.logo.width)"
          :height="Math.round(brand.logo.height)"
          class="scale-150 lg:scale-200"
          :style="{ viewTransitionName: `brand-logo-${brand.slug}` }"
        />
      </div>
      <div
        class="flex animate-rise-in flex-col items-start gap-4 rounded-3xl bg-white p-6 [animation-delay:150ms]"
      >
        <p class="text-body-l font-medium text-grey-xl">
          {{ brand.description }}
        </p>
        <span class="rounded-tag border border-grey-s px-2 py-1 text-body-s font-medium">{{
          formatSku(brand.skuCount)
        }}</span>
        <p class="mt-auto text-body-m text-grey-l">
          Каталог товаров бренда появится на следующем этапе.
        </p>
        <NuxtLink
          to="/brands"
          class="flex items-center gap-1.5 rounded-full bg-orange px-4 py-3 text-body-m/4 font-semibold text-white transition hover:bg-orange-hover active:bg-orange-pressed active:scale-[0.97]"
        >
          Все бренды
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
