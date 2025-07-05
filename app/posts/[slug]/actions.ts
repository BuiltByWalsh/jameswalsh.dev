'use server'

import path from 'path'

import { notFound } from 'next/navigation'

import { getPostFromMDX } from '@/lib/mdx'
import type { Post } from '@/lib/types'

export async function fetchPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(process.cwd(), 'posts', `${slug}.mdx`)

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
