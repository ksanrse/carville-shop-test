// Защита от «удаления тестов без потери покрытия» и от ослабления проверок.
// Читает результаты реального прогона (.reports/) и сравнивает с test/baseline.json.
// Базу берём из origin/main: если в этом же пуше её понизили, это тоже ошибка.
// Осознанное изменение: `node scripts/guard-tests.mjs --update` + отдельный коммит с объяснением.
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const read = (path) => JSON.parse(readFileSync(path, 'utf8'))
const BASELINE = 'test/baseline.json'

const unit = read('.reports/unit.json')
const e2e = read('.reports/e2e.json')
const cov = read('.reports/coverage/coverage-summary.json').total

const current = {
  unit: unit.numPassedTests,
  // retries: тест, прошедший со второй попытки, Playwright относит к stats.flaky,
  // а не к expected — без него он выглядел бы как удалённый
  e2e: e2e.stats.expected + e2e.stats.flaky,
  coverage: {
    lines: cov.lines.pct,
    functions: cov.functions.pct,
    statements: cov.statements.pct,
    branches: cov.branches.pct,
  },
}

if (process.argv.includes('--update')) {
  writeFileSync(BASELINE, `${JSON.stringify(current, null, 2)}\n`)
  console.log('baseline обновлён:', current)
  process.exit(0)
}

const errors = []
const local = read(BASELINE)

let remote = null
try {
  remote = JSON.parse(
    execSync(`git show origin/main:${BASELINE}`, {
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString(),
  )
} catch {
  /* первый пуш: удалённой базы ещё нет */
}

for (const base of [local, remote].filter(Boolean)) {
  const label = base === local ? 'baseline' : 'origin/main'
  if (current.unit < base.unit) errors.push(`unit-тестов ${current.unit} < ${base.unit} (${label})`)
  if (current.e2e < base.e2e) errors.push(`e2e-тестов ${current.e2e} < ${base.e2e} (${label})`)
  for (const [metric, pct] of Object.entries(base.coverage)) {
    if (current.coverage[metric] < pct)
      errors.push(`покрытие ${metric} ${current.coverage[metric]}% < ${pct}% (${label})`)
  }
}
if (remote && (local.unit < remote.unit || local.e2e < remote.e2e)) {
  errors.push('test/baseline.json понижен относительно origin/main — это ослабление защиты')
}

if (errors.length) {
  console.error(`\n✗ guard-tests:\n  - ${errors.join('\n  - ')}\n`)
  console.error(
    'Тесты удалять можно только осознанно: node scripts/guard-tests.mjs --update отдельным коммитом, с объяснением в PR.',
  )
  process.exit(1)
}
console.log(`✓ guard-tests: unit ${current.unit}, e2e ${current.e2e}, покрытие не ниже базы`)
