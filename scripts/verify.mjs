// Полная проверка перед пушем и в CI: lint → типы → unit+покрытие → сборка → e2e → guard.
// Скрипт на Node, а не в package.json, чтобы работать одинаково в cmd, PowerShell и bash.
import { spawnSync } from 'node:child_process'

const env = { ...process.env, REPORT: '1', PLAYWRIGHT_JSON_OUTPUT_NAME: '.reports/e2e.json' }
const steps = [
  ['lint', 'pnpm', ['lint']],
  ['типы', 'pnpm', ['typecheck']],
  ['unit + покрытие', 'pnpm', ['exec', 'vitest', 'run', '--coverage']],
  ['сборка', 'pnpm', ['build']],
  ['e2e', 'pnpm', ['exec', 'playwright', 'test']],
  ['guard', 'node', ['scripts/guard-tests.mjs']],
]

for (const [name, cmd, args] of steps) {
  console.log(`\n▶ ${name}`)
  const { status } = spawnSync(cmd, args, { stdio: 'inherit', env, shell: true })
  if (status !== 0) {
    console.error(`\n✗ ${name} не прошёл — пуш остановлен`)
    process.exit(status ?? 1)
  }
}
console.log('\n✓ всё проверено')
