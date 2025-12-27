import { Dirent } from 'node:fs'
import path from 'node:path'

export function getMockFiles(overrides: string[] = []): Dirent[] {
  return [
    path.join(process.cwd(), 'posts', 'a-mac-guys-guide-to-windows-development.mdx'),
    path.join(process.cwd(), 'posts', 'es2023-immutable-arrays.mdx'),
    path.join(process.cwd(), 'posts', 'fast-api-dev-with-thunder-client.mdx'),
    path.join(process.cwd(), 'posts', 'pnpm-has-yarn-and-npm-beat.mdx'),
    path.join(process.cwd(), 'posts', 'tenets-of-functional-programming.mdx'),
    ...overrides,
  ] as unknown as Dirent[]
}
