'use server'

import fs from 'node:fs/promises'
import path from 'node:path'

import { compareDesc } from 'date-fns'
import { err, ok, ResultAsync, type Result } from 'neverthrow'

import { Post } from './types'

import { ResultError } from '@/lib/result'
import { isPostReleased } from '@/lib/utils'
import { getPostFromMDX } from '@/services/mdx'

const BLOG_POST_DIR = path.join(process.cwd(), 'posts')
const SLUG_PATTERN = /^[a-zA-Z0-9_-]+$/

export async function getPost(slug: string): Promise<Result<Post, ResultError>> {
  // Validate slug to avoid path traversal and invalid filenames
  if (!SLUG_PATTERN.test(slug)) {
    return err(ResultError.INVALID)
  }

  const filePath = path.join(BLOG_POST_DIR, `${slug}.mdx`)

  return getPostFromMDX(filePath)
}

export async function getPreviousPost(slug: string): Promise<Result<Post | undefined, ResultError>> {
  const postsResult = await getAllPublishedPosts()

  if (postsResult.isErr()) {
    return err(postsResult.error)
  }

  const publishedPosts = postsResult.value

  const postIndex = publishedPosts.findIndex((post) => post.slug === slug)

  if (postIndex === -1) {
    return err(ResultError.NOT_FOUND)
  }

  if (postIndex === publishedPosts.length - 1) {
    return ok(undefined)
  }

  return ok(publishedPosts[postIndex + 1])
}

export async function getAllPublishedPosts(): Promise<Result<Post[], ResultError>> {
  return ResultAsync.fromPromise(fs.readdir(BLOG_POST_DIR), () => ResultError.SYSTEM_FAILURE)
    .map((filePaths) =>
      filePaths.filter((file) => path.extname(file) === '.mdx').map((fileName) => path.join(BLOG_POST_DIR, fileName)),
    )
    .andThen((filePaths) => ResultAsync.combine(filePaths.map(getPostFromMDX)))
    .map((allPosts) =>
      allPosts.filter(isPostReleased).sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))),
    )
}
