import { isFuture } from 'date-fns'

import type { Post } from '../services/types'

export { cn } from 'cn'

export function calculateTimeToRead(text: string): number {
  if (!text.length) {
    return 0
  }

  const wordsPerMinute = 265
  const numberOfWords = text.trim().split(/\s+/).length

  const time = Math.ceil(numberOfWords / wordsPerMinute)
  return time
}

export function isPostReleased(post: Pick<Post, 'status' | 'publishedAt'>): boolean {
  const isPublished = post.status === 'published'
  const isReleased = !isFuture(new Date(post.publishedAt))

  return isPublished && isReleased
}
