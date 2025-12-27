'use server'

import { fetchPublishedPosts } from '../actions'

import type { Post } from '@/lib/types'

export async function fetchPreviousPost(slug: string): Promise<Post | undefined> {
  const publishedPosts = await fetchPublishedPosts()
  const postIndex = publishedPosts.findIndex((post) => post.slug === slug)

  if (postIndex === publishedPosts.length - 1) return undefined

  return publishedPosts[postIndex + 1]
}
