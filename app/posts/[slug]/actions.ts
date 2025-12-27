'use server'

import path from 'path'

import { notFound } from 'next/navigation'

import { fetchPublishedPosts } from '../actions'

import { getPostFromMDX } from '@/lib/mdx'
import type { Post } from '@/lib/types'

const POSTS_ROOT = path.join(process.cwd(), 'posts')
const SLUG_PATTERN = /^[a-zA-Z0-9_-]+$/

export async function fetchPostBySlug(slug: string): Promise<Post> {
  // Validate slug to avoid path traversal and invalid filenames
  if (!SLUG_PATTERN.test(slug)) {
    notFound()
  }

  const candidatePath = path.join(POSTS_ROOT, `${slug}.mdx`)
  const filePath = path.resolve(candidatePath)

  // Ensure the resolved path stays within the posts root directory
  if (!filePath.startsWith(POSTS_ROOT + path.sep)) {
    notFound()
  }

  try {
    return await getPostFromMDX(filePath)
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      notFound()
    } else {
      throw new Error(`Something went wrong. Unable to fetch a blog post for ${slug}`)
    }
  }
}

export async function fetchPreviousPost(slug: string): Promise<Post | undefined> {
  const publishedPosts = await fetchPublishedPosts()
  const postIndex = publishedPosts.findIndex((post) => post.slug === slug)

  if (postIndex === publishedPosts.length - 1) return undefined

  return publishedPosts[postIndex + 1]
}
