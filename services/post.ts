'use server'

import fs from 'node:fs/promises'
import path from 'node:path'

import { compareDesc } from 'date-fns'
import { err, ok, type Result } from 'neverthrow'

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

export async function getPreviousPost(slug: string): Promise<Post | undefined> {
  const publishedPosts = await getAllPublishedPosts()
  const postIndex = publishedPosts.findIndex((post) => post.slug === slug)

  if (postIndex === publishedPosts.length - 1) return undefined

  return publishedPosts[postIndex + 1]
}

export async function getAllPublishedPosts(): Promise<Post[]> {
  const files = await fs.readdir(path.join(process.cwd(), 'posts'))

  const filePaths = files
    .filter((file) => path.extname(file) === '.mdx')
    .map((fileName) => path.join(process.cwd(), 'posts', fileName))

  const allPosts = await Promise.all(filePaths.map((filePath) => getPostFromMDX(filePath)))

  return allPosts.filter(isPostReleased).sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
}
