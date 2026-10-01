<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col items-start gap-4 pt-4 lg:pt-6">
      <h1 class="py-px text-body-l font-bold uppercase lg:py-0 lg:text-display-m">
        {{ error.statusCode }}
      </h1>
      <p class="text-body-l font-medium text-grey-xl">
        {{ error.message || 'Страница не найдена' }}
      </p>
      <NuxtLink
        to="/brands"
        class="mt-3 flex items-center gap-1.5 rounded-full bg-orange px-4 py-3 text-body-m/4 font-semibold text-white transition hover:bg-orange-hover active:scale-[0.97]"
        @click.prevent="clearError({ redirect: '/brands' })"
      >
        Все бренды
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
