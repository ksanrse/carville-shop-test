<script setup lang="ts">
const topLinks = [
  { label: 'О компании', to: '/about' },
  { label: 'Доставка и оплата', to: '/delivery' },
  { label: 'Покупателям', to: '/customers' },
  { label: 'Контакты', to: '/contacts' },
  { label: 'Акции', to: '/promo' },
  { label: 'Новинки', to: '/new' },
  { label: 'Carville-Бизнес', to: '/business' },
]

const actions = [
  { label: 'Корзина', icon: '/icons/cart.svg', to: '/cart' },
  { label: 'Избранное', icon: '/icons/heart.svg', to: '/favorites' },
  { label: 'Сравнение', icon: '/icons/compare.svg', to: '/compare' },
  { label: 'Профиль', icon: '/icons/profile.svg', to: '/profile' },
]
</script>

<template>
  <header class="mx-auto w-full max-w-page px-4 pt-4 lg:px-gutter lg:pt-2">
    <!-- Верхняя строка: только десктоп -->
    <div class="relative top-px hidden h-[14px] items-center justify-between text-body-s lg:flex">
      <nav aria-label="Информация">
        <ul class="flex gap-8">
          <li v-for="link in topLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              external
              class="font-medium text-grey-l transition-colors hover:text-grey-xxl"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <p class="flex gap-4">
        <span class="font-light">Бесплатный звонок по России</span>
        <a href="tel:88007002585" class="font-bold transition-colors hover:text-orange"
          >8 800 700-25-85</a
        >
      </p>
    </div>

    <div class="flex items-center gap-3 rounded-panel bg-white p-2 lg:mt-3 lg:gap-10 lg:px-4">
      <NuxtLink to="/" external class="shrink-0" aria-label="CARVILLE SHOP — на главную">
        <picture>
          <source media="(min-width: 1024px)" srcset="/logo.svg" width="133" height="44" />
          <img
            src="/logo-mobile.svg"
            alt="CARVILLE SHOP"
            width="118"
            height="39"
            class="h-10 w-[120px] lg:my-1.5 lg:h-11 lg:w-[133px]"
          />
        </picture>
      </NuxtLink>

      <div class="flex min-w-0 flex-1 items-center gap-4">
        <div class="flex min-w-0 flex-1 items-center gap-2">
          <NuxtLink
            to="/catalog"
            external
            class="hidden shrink-0 items-center gap-1.5 rounded-full bg-orange px-4 py-3 text-body-m/4 font-semibold text-white transition hover:bg-orange-hover active:scale-[0.97] lg:flex"
          >
            <img src="/icons/catalog.svg" alt="" width="16" height="16" />
            Каталог
          </NuxtLink>

          <form
            action="/search"
            role="search"
            class="relative flex h-10 min-w-0 flex-1 items-center gap-2 rounded-3xl border border-grey-s bg-white pl-4 transition-colors focus-within:border-grey-l"
          >
            <!-- Плейсхолдер разный на мобильном и десктопе, поэтому рисуем его сами -->
            <input
              name="q"
              type="search"
              placeholder=" "
              aria-label="Поиск по наименованию или артикулу"
              class="peer min-w-0 flex-1 bg-transparent text-body-m font-medium outline-none"
            />
            <span
              class="pointer-events-none absolute inset-y-0 right-12 left-4 hidden items-center truncate text-body-m font-medium text-grey-m peer-placeholder-shown:flex"
              aria-hidden="true"
            >
              <span class="lg:hidden">Искать...</span>
              <span class="truncate max-lg:hidden"
                >Искать на сайте по наименованию или артикулу</span
              >
            </span>
            <button
              type="submit"
              class="grid size-10 shrink-0 place-items-center rounded-full bg-orange transition hover:bg-orange-hover active:scale-[0.94]"
              aria-label="Найти"
            >
              <img src="/icons/search.svg" alt="" width="16" height="16" />
            </button>
          </form>
        </div>

        <NuxtLink
          to="/podbor"
          external
          class="hidden shrink-0 items-center gap-1.5 rounded-full bg-orange px-4 py-3 text-body-m/4 font-semibold text-white transition hover:bg-orange-hover active:scale-[0.97] lg:flex"
        >
          <img src="/icons/car.svg" alt="" width="16" height="16" />
          Подобрать запчасти
        </NuxtLink>

        <nav aria-label="Личное" class="hidden lg:block">
          <ul class="flex gap-2">
            <li v-for="action in actions" :key="action.to">
              <NuxtLink
                :to="action.to"
                external
                :aria-label="action.label"
                class="grid size-10 place-items-center rounded-full border border-grey-s bg-white/90 backdrop-blur-[2px] transition hover:border-grey-l active:scale-[0.94]"
              >
                <img :src="action.icon" alt="" width="16" height="16" />
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
