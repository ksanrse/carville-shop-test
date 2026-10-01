import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['test/unit/**/*.test.ts'],
    // Забытый .only не должен тихо отключать остальные тесты
    allowOnly: false,
    reporters: process.env.REPORT ? ['default', 'json'] : ['default'],
    outputFile: { json: '.reports/unit.json' },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      reportsDirectory: '.reports/coverage',
      include: ['app/components/**', 'shared/**', 'server/utils/**'],
      // Порог — страховка от «оптимизации» тестов: удалить тест можно, только если покрытие не падает
      thresholds: { lines: 100, functions: 100, statements: 100, branches: 95 },
    },
  },
})
