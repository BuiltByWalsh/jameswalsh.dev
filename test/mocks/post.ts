import { getMockSource } from './source'

import { Post } from '@/services/types'

export function getMockPost(overrides: Partial<Post> = {}): Post {
  return {
    slug: 'my-cool-slug-1',
    source: getMockSource(),
    title: 'How to get good at posting on your blog',
    description: 'A tutorial on making developer blogs...',
    thumbnail: '/blog-thumbnails/post-thumbnail.webp',
    status: 'published',
    publishedAt: '2024-09-14',
    lastModified: '2024-09-14',
    brief: 'This is an example brief. They are typically much longer than this',
    tags: ['javascript', 'typescript', 'react'],
    ...overrides,
  }
}
