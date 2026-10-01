<script setup lang="ts">
const { data: brands } = await useFetch('/api/brands', { key: 'brands' })

const links = [
  { label: 'О компании', to: '/about' },
  { label: 'Доставка и оплата', to: '/delivery' },
  { label: 'Покупателям', to: '/customers' },
  { label: 'Контакты', to: '/contacts' },
]

const email = ref('')
const subscribed = ref(false)

// Бэкенда рассылки пока нет — просто подтверждаем ввод
function subscribe() {
  subscribed.value = true
  email.value = ''
}
</script>

<template>
  <footer
    class="mx-auto mt-[54px] w-full max-w-page rounded-t-panel bg-grey-xxl px-4 pt-[50px] pb-36 text-white md:px-8 lg:px-gutter lg:pb-5"
  >
    <div class="flex flex-col gap-10 lg:flex-row lg:flex-wrap lg:gap-x-4 lg:gap-y-10">
      <NuxtLink to="/" external class="w-[204px] shrink-0" aria-label="CARVILLE SHOP — на главную">
        <img
          src="/logo.svg"
          alt="CARVILLE SHOP"
          width="133"
          height="44"
          class="-mt-1.5 h-11 w-[133px]"
          loading="lazy"
        />
      </NuxtLink>

      <nav aria-label="Покупателям" class="w-[204px] shrink-0">
        <ul class="flex flex-col gap-6">
          <li v-for="link in links" :key="link.to">
            <NuxtLink
              :to="link.to"
              external
              class="block text-body-l font-medium transition-colors hover:text-orange"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- При ошибке или пустом ответе API футер не должен ронять страницу — прячем блок -->
      <nav v-if="brands?.length" aria-label="Бренды" class="lg:w-[535px] lg:shrink-0">
        <ul
          class="grid grid-flow-col grid-cols-[repeat(2,204px)] grid-rows-3 gap-x-4 gap-y-6 max-sm:grid-flow-row max-sm:grid-cols-1 max-sm:grid-rows-none"
        >
          <li v-for="brand in brands" :key="brand.slug">
            <NuxtLink :to="`/brands/${brand.slug}`" class="group flex items-start gap-2">
              <span class="grid size-9 shrink-0 place-items-center rounded-xl bg-white">
                <img
                  :src="brand.logoSmall.src"
                  alt=""
                  :width="Math.round(brand.logoSmall.width)"
                  :height="Math.round(brand.logoSmall.height)"
                  loading="lazy"
                />
              </span>
              <span class="flex flex-col gap-0.5 pt-0.5">
                <span class="text-body-m/4 font-bold transition-colors group-hover:text-orange">{{
                  brand.name
                }}</span>
                <span class="text-body-s font-medium whitespace-pre-line text-grey-l">{{
                  brand.shortDescription
                }}</span>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex flex-1 flex-col gap-8 lg:min-w-[312px]">
        <form class="flex flex-col gap-6" @submit.prevent="subscribe">
          <label for="newsletter-email" class="flex items-center gap-2 text-body-l font-medium">
            <img src="/icons/mail.svg" alt="" width="20" height="20" />
            Новости и предложения
          </label>
          <div
            class="flex h-12 items-center gap-1 rounded-3xl border border-grey-xl py-1 pr-1 pl-5 transition-colors focus-within:border-grey-l"
          >
            <input
              id="newsletter-email"
              v-model="email"
              type="email"
              required
              autocomplete="email"
              :placeholder="subscribed ? 'Спасибо, вы подписаны!' : 'Email для рассылки'"
              class="min-w-0 flex-1 bg-transparent text-body-m font-medium outline-none placeholder:text-grey-xl"
            />
            <button
              type="submit"
              class="grid size-10 shrink-0 place-items-center rounded-full bg-orange transition hover:bg-orange-hover active:scale-[0.94]"
              aria-label="Подписаться"
            >
              <img src="/icons/send.svg" alt="" width="16" height="16" />
            </button>
          </div>
          <p role="status" class="sr-only">
            {{ subscribed ? 'Спасибо, вы подписаны!' : '' }}
          </p>
        </form>

        <div class="flex flex-col gap-2">
          <p class="text-body-m font-medium text-grey-xs">Бесплатный звонок по России</p>
          <a
            href="tel:88007002585"
            class="self-start text-body-l font-medium text-orange transition-colors hover:text-orange-hover"
            >8 800 700-25-85</a
          >
        </div>
      </div>
    </div>

    <div
      class="relative mt-[50px] h-[140px] pt-[30px] text-body-m text-grey-l before:absolute before:top-0 before:left-1/2 before:h-px before:w-screen before:max-w-page before:-translate-x-1/2 before:bg-white/10 lg:pl-[220px]"
    >
      <ul class="flex flex-wrap gap-x-12 gap-y-2">
        <li>
          <NuxtLink to="/terms" external class="transition-colors hover:text-white"
            >Пользовательское соглашение</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/privacy" external class="transition-colors hover:text-white"
            >Политика конфиденциальности</NuxtLink
          >
        </li>
      </ul>
      <p class="mt-4 max-w-[479px]">
        © 2015-2026 ООО «ТАЛИС». Адрес для направления юридически значимых сообщений:
        CarvilleShop@yandex.ru. Все права защищены.
      </p>
    </div>
  </footer>
</template>
