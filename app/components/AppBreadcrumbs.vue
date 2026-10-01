<script setup lang="ts">
export interface Crumb {
  label: string
  to?: string
}

const props = defineProps<{ items: Crumb[] }>()

// Хлебные крошки в schema.org — для расширенного сниппета в поиске
useSchemaOrg([
  defineBreadcrumb({
    itemListElement: props.items.map((item) => ({ name: item.label, item: item.to })),
  }),
])
</script>

<template>
  <nav aria-label="Хлебные крошки">
    <ol class="flex items-center gap-1 text-body-m">
      <li v-for="(item, i) in items" :key="item.label" class="flex items-center gap-1">
        <span v-if="i > 0" class="w-[11px] font-medium text-grey-s" aria-hidden="true">·</span>
        <NuxtLink
          v-if="item.to"
          :to="item.to"
          :external="item.to === '/'"
          class="max-w-[350px] truncate font-medium text-grey-l transition-colors hover:text-grey-xxl"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else class="max-w-[350px] truncate text-grey-m" aria-current="page">{{
          item.label
        }}</span>
      </li>
    </ol>
  </nav>
</template>
