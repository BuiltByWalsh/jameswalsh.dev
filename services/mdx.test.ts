// @vitest-environment node

import fs from 'node:fs/promises'
import path from 'node:path'

import * as fm from 'front-matter'

import { getPostFromMDX } from './mdx'
import { PostFrontmatter } from './types'

import { ResultError } from '@/lib/result'
import { getMockFrontmatter } from '@/test/mocks/frontmatter'
import { getMockSource } from '@/test/mocks/source'

vi.mock('front-matter')
vi.mock('node:fs/promises')

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
      vi.mocked(fs.readFile).mockResolvedValue(mockBody)

      const actual = await getPostFromMDX(filePath)
      expect(actual._unsafeUnwrap().slug).toStrictEqual(slug)
    })

    it('retrieves the body of the article using fm', async () => {
      vi.mocked(fs.readFile).mockResolvedValue(mockBody)

      const actual = await getPostFromMDX(filePath)
      expect(actual._unsafeUnwrap().source).toStrictEqual(mockBody)
    })

    it('spreads frontmatter into returned post', async () => {
      vi.mocked(fs.readFile).mockResolvedValue(mockBody)

      const actual = await getPostFromMDX(filePath)
      const { slug, source, ...frontmatter } = actual._unsafeUnwrap()

      expect(frontmatter).toStrictEqual(mockFrontmatter)
    })

    describe('error cases', () => {
      it('returns NOT_FOUND error result when file does not exist', async () => {
        vi.mocked(fs.readFile).mockRejectedValue(new MockFileNotFoundError())

        const postErrResult = await getPostFromMDX(slug)

        expect(postErrResult.isErr()).toBe(true)
        expect(postErrResult._unsafeUnwrapErr()).toStrictEqual(ResultError.NOT_FOUND)
      })

      it('returns SYSTEM_FAILURE error result for uncaught exceptions', async () => {
        vi.mocked(fs.readFile).mockRejectedValue(new Error('Uncaught exception'))

        const postErrResult = await getPostFromMDX(slug)

        expect(postErrResult.isErr()).toBe(true)
        expect(postErrResult._unsafeUnwrapErr()).toStrictEqual(ResultError.SYSTEM_FAILURE)
      })
    })
  })
})

class MockFileNotFoundError extends Error {
  code: string
  constructor(message = '', ...args: undefined[]) {
    super(message, ...args)
    this.code = 'ENOENT'
  }
}
