// @vitest-environment node

import fs from 'node:fs/promises'
import path from 'node:path'

import { ResultError } from '@/lib/result'
import { getMockFrontmatter } from '@/test/mocks/frontmatter'
import { getMockSource } from '@/test/mocks/source'

import { getPostFromMDX } from './mdx'

vi.mock('node:fs/promises')
vi.mock('@/posts/hipster-blog-post.mdx', async () => ({
  default: () => null,
  metadata: (await import('@/test/mocks/frontmatter')).getMockFrontmatter(),
}))

describe('lib/mdx', () => {
  describe('#getPostFromMDX', () => {
    const slug = 'hipster-blog-post'
    const filePath = path.join(process.cwd(), '/test/mocks/posts', `${slug}.mdx`)
    const mockFrontmatter = getMockFrontmatter()
    const mockBody = getMockSource()
    const mockFileContents = `export const metadata = ${JSON.stringify(mockFrontmatter, null, 2)}\n${mockBody}`

    it('retrieves the posts slug based on filename', async () => {
      vi.mocked(fs.readFile).mockResolvedValue(mockFileContents)

      const actual = await getPostFromMDX(filePath)
      expect(actual._unsafeUnwrap().slug).toStrictEqual(slug)
    })

    it('retrieves the body of the article without the metadata export', async () => {
      vi.mocked(fs.readFile).mockResolvedValue(mockFileContents)

      const actual = await getPostFromMDX(filePath)
      expect(actual._unsafeUnwrap().source).toStrictEqual(mockBody)
    })

    it('spreads the exported metadata into returned post', async () => {
      vi.mocked(fs.readFile).mockResolvedValue(mockFileContents)

      const actual = await getPostFromMDX(filePath)
      const { slug: _slug, source: _source, ...frontmatter } = actual._unsafeUnwrap()

      expect(frontmatter).toStrictEqual(mockFrontmatter)
    })

    describe('error cases', () => {
      it('returns NOT_FOUND error result when file does not exist', async () => {
        vi.mocked(fs.readFile).mockRejectedValue(new MockFileNotFoundError())

        const postErrResult = await getPostFromMDX(slug)

        expect(postErrResult.isErr()).toBe(true)
        expect(postErrResult._unsafeUnwrapErr()).toStrictEqual(ResultError.NOT_FOUND)
      })

      it('returns NOT_FOUND error result when neither the file nor the post module exist', async () => {
        vi.mocked(fs.readFile).mockRejectedValue(new MockFileNotFoundError())

        const postErrResult = await getPostFromMDX(
          path.join(process.cwd(), '/test/mocks/posts', 'missing-post.mdx'),
        )

        expect(postErrResult.isErr()).toBe(true)
        expect(postErrResult._unsafeUnwrapErr()).toStrictEqual(ResultError.NOT_FOUND)
      })

      it('returns SYSTEM_FAILURE error result for uncaught exceptions', async () => {
        vi.mocked(fs.readFile).mockRejectedValue(new Error('Uncaught exception'))

        const postErrResult = await getPostFromMDX(slug)

        expect(postErrResult.isErr()).toBe(true)
        expect(postErrResult._unsafeUnwrapErr()).toStrictEqual(ResultError.SYSTEM_FAILURE)
      })

      it('returns SYSTEM_FAILURE error result when the post module fails to load', async () => {
        vi.mocked(fs.readFile).mockResolvedValue(mockFileContents)

        const postErrResult = await getPostFromMDX(
          path.join(process.cwd(), '/test/mocks/posts', 'missing-post.mdx'),
        )

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
