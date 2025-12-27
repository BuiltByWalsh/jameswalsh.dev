export interface Post {
  slug: string
  source: string
  title: string
  description: string
  thumbnail: string
  status: 'published' | 'draft'
  publishedAt: string
  lastModified: string
  brief: string
  tags: string[]
}

export type PostFrontmatter = Pick<
  Post,
  'title' | 'description' | 'thumbnail' | 'status' | 'publishedAt' | 'lastModified' | 'brief' | 'tags'
>
