import fs from 'node:fs/promises'
import path from 'node:path'

import fm from 'front-matter'
import { ResultAsync } from 'neverthrow'

import type { Post, PostFrontmatter } from './types'

import { ResultError } from '@/lib/result'

export function getPostFromMDX(filePath: string): ResultAsync<Post, ResultError> {
  const slug = path.basename(filePath, path.extname(filePath))

  return ResultAsync.fromPromise(fs.readFile(filePath, 'utf-8'), (error) => {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return ResultError.NOT_FOUND
    }

    return ResultError.SYSTEM_FAILURE
  }).map((content) => {
    const { attributes, body } = fm<PostFrontmatter>(content)

    return {
      slug,
      source: body,
      ...attributes,
    } as Post
  })
}
