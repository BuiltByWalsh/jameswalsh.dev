'use server'

import path from 'node:path'

import { err, ok, type Result } from 'neverthrow'

import { getPostFromMDX } from '@/lib/mdx'
import { ResultError } from '@/lib/result'
import { Post } from '@/lib/types'

const BLOG_POST_DIR = path.join(process.cwd(), 'posts')
const SLUG_PATTERN = /^[a-zA-Z0-9_-]+$/

export async function getPost(slug: string): Promise<Result<Post, ResultError>> {
  // Validate slug to avoid path traversal and invalid filenames
  if (!SLUG_PATTERN.test(slug)) {
    return err(ResultError.INVALID)
  }

  const filePath = path.join(BLOG_POST_DIR, `${slug}.mdx`)

  try {
    const post = await getPostFromMDX(filePath)
    return ok(post)
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return err(ResultError.NOT_FOUND)
    }

    return err(ResultError.SYSTEM_FAILURE)
  }
}
