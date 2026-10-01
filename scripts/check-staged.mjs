// Быстрые проверки перед коммитом: забытые .only/.skip/debugger и похожие на секреты строки
import { readFileSync } from 'node:fs'

const rules = [
  [/\b(?:it|test|describe)\.(?:only|skip|todo|fixme)\b/, 'отключённый тест (.only/.skip/.todo)'],
  [/\bdebugger\b/, 'debugger'],
  [
    /(?:api[_-]?key|secret|token|password)\s*[:=]\s*['"][^'"\s]{12,}['"]/i,
    'похоже на секрет в коде',
  ],
]

let failed = false
for (const file of process.argv.slice(2)) {
  const text = readFileSync(file, 'utf8')
  for (const [re, message] of rules) {
    if (re.test(text)) {
      console.error(`✗ ${file}: ${message}`)
      failed = true
    }
  }
}
process.exit(failed ? 1 : 0)
