import fs from 'node:fs/promises'
import path from 'node:path'

import fm from 'front-matter'

import type { Post, PostFrontmatter } from './types'

export async function getPostFromMDX(filePath: string): Promise<Post> {
  const slug = path.basename(filePath, path.extname(filePath))
  const rawContent = await fs.readFile(filePath, 'utf-8')
  const { attributes, body } = fm<PostFrontmatter>(rawContent)

  return {
    slug,
    source: body,
    ...attributes,
  }
}
