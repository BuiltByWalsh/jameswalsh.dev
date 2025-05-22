import { clsx, type ClassValue } from 'clsx'
import { isFuture } from 'date-fns'
import { twMerge } from 'tailwind-merge'

import type { Post } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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
