// @vitest-environment node

import path from 'node:path'

import * as fm from 'front-matter'

import { getPostFromMDX } from './mdx'
import { PostFrontmatter } from './types'

import { getMockFrontmatter } from '@/test/mocks/frontmatter'
import { getMockSource } from '@/test/mocks/source'

vi.mock('front-matter')

describe('lib/mdx', () => {
  describe('#getPostFromMDX', () => {
    const slug = 'hipster-blog-post'
    const filePath = path.join(process.cwd(), '/test/mocks/posts', `${slug}.mdx`)
    const mockFrontmatter = getMockFrontmatter()
    const mockBody = getMockSource()

    beforeEach(() => {
      vi.mocked(fm.default).mockReturnValue({
        attributes: mockFrontmatter,
        body: mockBody,
      } as fm.FrontMatterResult<PostFrontmatter>)
    })

    it('retrieves the posts slug based on filename', async () => {
      const actual = await getPostFromMDX(filePath)
      expect(actual.slug).toStrictEqual(slug)
    })

    it('retrieves the body of the article using fm', async () => {
      const actual = await getPostFromMDX(filePath)
      expect(actual.source).toStrictEqual(mockBody)
    })

    it('spreads frontmatter into returned post', async () => {
      const actual = await getPostFromMDX(filePath)
      const { slug, source, ...frontmatter } = actual

      expect(frontmatter).toStrictEqual(mockFrontmatter)
    })
  })
})
