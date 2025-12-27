import { PostFrontmatter } from '@/services/types'

export function getMockFrontmatter(overrides: Partial<PostFrontmatter> = {}): PostFrontmatter {
  return {
    title: 'My Test Blog Post',
    description: 'How to write a blog',
    thumbnail: '/assets/images/thumbnail.webp',
    status: 'draft',
    publishedAt: '2023-12-06',
    lastModified: '2023-12-08',
    brief: 'Wanna get good at blogging?',
    tags: ['content-management', 'nextjs', 'javascript'],
    ...overrides,
  }
}
