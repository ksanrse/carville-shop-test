import { defineConfig, devices } from '@playwright/test'

const port = 3100

// E2E гоняются по production-сборке (pnpm build), а не по dev-серверу — проверяем то, что уедет на Vercel
export default defineConfig({
  testDir: 'test/e2e',
  forbidOnly: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.REPORT
    ? [['list'], ['json', { outputFile: `.reports/e2e.json` }]]
    : process.env.CI
      ? 'github'
      : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1100 } },
    },
  ],
  webServer: {
    command: 'node .output/server/index.mjs',
    port,
    env: { PORT: String(port) },
    reuseExistingServer: false,
  },
})
