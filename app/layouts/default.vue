<template>
  <div class="flex min-h-dvh flex-col">
    <AppHeader />
    <main class="mx-auto w-full max-w-page flex-1 px-4 lg:px-gutter">
      <slot />
    </main>
    <AppFooter />
    <MobileNav />
  </div>
</template>
