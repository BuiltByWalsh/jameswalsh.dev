import fs from 'node:fs/promises'
import path from 'node:path'

type MockReaddirResult = Awaited<ReturnType<typeof fs.readdir>>

export function getMockFiles(overrides: string[] = []): MockReaddirResult {
  return [
    path.join(process.cwd(), 'posts', 'a-mac-guys-guide-to-windows-development.mdx'),
    path.join(process.cwd(), 'posts', 'es2023-immutable-arrays.mdx'),
    path.join(process.cwd(), 'posts', 'fast-api-dev-with-thunder-client.mdx'),
    path.join(process.cwd(), 'posts', 'pnpm-has-yarn-and-npm-beat.mdx'),
    path.join(process.cwd(), 'posts', 'tenets-of-functional-programming.mdx'),
    ...overrides,
  ] as unknown as MockReaddirResult
}
