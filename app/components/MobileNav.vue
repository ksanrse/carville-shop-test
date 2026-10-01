<script setup lang="ts">
const route = useRoute()

const left = [
  // Главной пока нет, а «/» отдаёт 307 на /brands — ведём сразу туда клиентским роутингом,
  // без полной перезагрузки. Когда появится главная — вернуть to: '/' и external.
  { label: 'Главная', to: '/brands', icon: '/icons/m-home.svg', external: false },
  { label: 'Каталог', to: '/catalog', icon: '/icons/m-catalog.svg', external: true },
]
const right = [
  { label: 'Корзина', to: '/cart', icon: '/icons/m-cart.svg', external: true },
  { label: 'Профиль', to: '/profile', icon: '/icons/m-profile.svg', external: true },
]

// Пока все страницы магазина — это бренды, поэтому «Главная» (to: '/brands') активна на них
const isActive = (to: string) => route.path.startsWith(to)
</script>

<template>
  <nav
    aria-label="Основное меню"
    class="fixed bottom-[max(24px,env(safe-area-inset-bottom))] left-1/2 z-20 flex w-[358px] max-w-[calc(100%-32px)] -translate-x-1/2 items-center justify-between rounded-media bg-white px-3.5 py-3 drop-shadow-nav lg:hidden"
  >
    <template v-for="group in [left, right]" :key="group[0]!.to">
      <ul class="flex gap-2.5">
        <li v-for="item in group" :key="item.to">
          <NuxtLink
            :to="item.to"
            :external="item.external"
            :aria-current="isActive(item.to) ? 'page' : undefined"
            class="group flex w-[58px] flex-col items-center gap-1"
          >
            <span
              class="rounded-media p-2 transition-all duration-300 ease-out-soft group-active:scale-90"
              :class="isActive(item.to) ? 'bg-grey-xxl' : 'bg-grey-xxs'"
            >
              <img
                :src="item.icon"
                alt=""
                width="16"
                height="16"
                :class="isActive(item.to) ? 'brightness-0 invert' : 'brightness-0 opacity-85'"
              />
            </span>
            <span
              class="text-body-s font-bold"
              :class="isActive(item.to) ? 'text-grey-xxl' : 'text-grey-m'"
              >{{ item.label }}</span
            >
          </NuxtLink>
        </li>
      </ul>
    </template>

    <NuxtLink
      to="/podbor"
      external
      class="group absolute -top-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 rounded-panel bg-white p-2"
    >
      <span
        class="grid size-12 place-items-center rounded-full bg-orange transition-transform duration-300 ease-out-soft group-active:scale-90"
      >
        <img src="/icons/m-podbor.svg" alt="" width="16" height="16" />
      </span>
      <span class="text-body-s font-bold text-grey-m">Подбор</span>
    </NuxtLink>
  </nav>
</template>
