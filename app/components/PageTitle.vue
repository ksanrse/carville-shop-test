<script setup lang="ts">
defineProps<{
  title: string
  /** Куда ведёт стрелка «назад» на мобильных */
  backTo: string
}>()
</script>

<template>
  <div class="flex items-start gap-2">
    <NuxtLink
      :to="backTo"
      :external="backTo === '/'"
      class="shrink-0 transition-transform active:-translate-x-1 lg:hidden"
      aria-label="Назад"
    >
      <img src="/icons/arrow-left.svg" alt="" width="24" height="24" />
    </NuxtLink>
    <h1 class="flex-1 py-px text-body-l font-bold uppercase lg:py-0 lg:text-display-m">
      {{ title }}
    </h1>
  </div>
</template>
