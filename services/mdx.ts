import fs from 'node:fs/promises'
import path from 'node:path'

import { ResultAsync } from 'neverthrow'

import { ResultError } from '@/lib/result'

import type { Post } from './types'

// ? NOTE: Matches the leading `export const metadata = { ... }` block so reading time only counts the article body.
const METADATA_EXPORT_PATTERN = /^export const metadata = \{[\s\S]*?\n\}\n/

export function getPostFromMDX(filePath: string): ResultAsync<Post, ResultError> {
  const slug = path.basename(filePath, path.extname(filePath))

  return ResultAsync.fromPromise(
    Promise.all([fs.readFile(filePath, 'utf-8'), import(`@/posts/${slug}.mdx`)]),
    (error) => {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
        return ResultError.NOT_FOUND
      }

      return ResultError.SYSTEM_FAILURE
    },
  ).map(([content, { metadata }]) => {
    return {
      slug,
      source: content.replace(METADATA_EXPORT_PATTERN, ''),
      ...metadata,
    } as Post
  })
}
