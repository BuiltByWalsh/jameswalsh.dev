'use server'

import fs from 'node:fs/promises'
import path from 'node:path'

import { compareDesc } from 'date-fns'

import { getPostFromMDX } from '@/lib/mdx'
import type { Post } from '@/lib/types'
import { isPostReleased } from '@/lib/utils'

export async function fetchPublishedPosts(): Promise<Post[]> {
  const files = await fs.readdir(path.join(process.cwd(), 'posts'))

  const filePaths = files
    .filter((file) => path.extname(file) === '.mdx')
    .map((fileName) => path.join(process.cwd(), 'posts', fileName))

  const allPosts = await Promise.all(filePaths.map((filePath) => getPostFromMDX(filePath)))

  return allPosts.filter(isPostReleased).sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
}
