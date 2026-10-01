<script setup lang="ts">
import type { Brand } from '#shared/types/brand'

const props = defineProps<{
  brand: Brand
  /** Порядковый номер — для каскадной анимации появления */
  index?: number
}>()

const logoStyle = computed(() => ({
  '--logo-w': `${props.brand.logo.width}px`,
  '--logo-h': `${props.brand.logo.height}px`,
  '--logo-mw': `${props.brand.logoMobile.width}px`,
  '--logo-mh': `${props.brand.logoMobile.height}px`,
  viewTransitionName: `brand-logo-${props.brand.slug}`,
}))

const accentBackground = computed(() => brandAccentGradient[props.brand.accent])
const sku = computed(() => formatSku(props.brand.skuCount))
</script>

<template>
  <NuxtLink
    :to="`/brands/${brand.slug}`"
    class="group relative flex h-40 animate-rise-in gap-2 p-2 outline-none md:h-[382px] md:flex-col"
    :style="{ animationDelay: `${(index ?? 0) * 60}ms` }"
  >
    <span
      class="card-shape group-hover:drop-shadow-card group-focus-visible:drop-shadow-card"
      aria-hidden="true"
    />

    <span
      class="relative grid flex-1 place-items-center overflow-hidden rounded-media bg-grey-xxl md:h-[232px] md:flex-none"
    >
      <span
        class="absolute inset-0 opacity-0 transition-opacity duration-350 ease-out-soft group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100"
        :style="{ background: accentBackground }"
        aria-hidden="true"
      />
      <img
        :src="brand.logo.src"
        alt=""
        :width="Math.round(brand.logo.width)"
        :height="Math.round(brand.logo.height)"
        class="relative h-(--logo-mh) w-(--logo-mw) max-w-none md:h-(--logo-h) md:w-(--logo-w)"
        :style="logoStyle"
      />
    </span>

    <span class="relative flex flex-1 flex-col gap-4 p-2">
      <span class="flex flex-1 flex-col gap-2">
        <h2 class="text-body-l font-bold">{{ brand.name }}</h2>
        <p class="relative top-px text-body-s font-medium text-grey-xl">{{ brand.description }}</p>
      </span>
      <span
        class="flex h-6 min-w-10 items-center justify-center self-start rounded-tag border border-grey-s px-2 text-body-s font-medium"
      >
        {{ sku }}
      </span>
    </span>

    <span
      class="absolute right-2 bottom-2 grid size-10 place-items-center rounded-full bg-grey-xxl transition-colors duration-350 ease-out-soft group-hover:bg-orange group-focus-visible:bg-orange group-active:bg-orange"
      aria-hidden="true"
    >
      <img
        src="/icons/arrow-up-right.svg"
        alt=""
        width="16"
        height="16"
        class="transition-transform duration-350 ease-out-soft group-hover:rotate-45 group-focus-visible:rotate-45 group-active:rotate-45"
      />
    </span>
  </NuxtLink>
</template>
