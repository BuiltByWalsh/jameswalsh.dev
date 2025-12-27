// @vitest-environment node

import { ok } from 'neverthrow'

import { ResultError } from '../result'

import { getPost } from './get-post'

import * as mdx from '@/lib/mdx'
import type { Post } from '@/lib/types'
import { getMockFrontmatter } from '@/test/mocks/frontmatter'

vi.mock('@/lib/mdx')

describe('lib/posts/get-post', () => {
  describe('#getPost', () => {
    const slug = 'project-hail-mary'
    const mockPost: Post = {
      slug,
      source: '#MyCoolHeading',
      ...getMockFrontmatter(),
    }

    beforeEach(() => {
      vi.mocked(mdx.getPostFromMDX).mockResolvedValue(mockPost)
    })

    it('returns a post result based on slug', async () => {
      const postResult = await getPost(slug)

      expect(postResult.isOk()).toBe(true)
      expect(postResult).toEqual(ok(mockPost))
    })

    describe('error cases', () => {
      it('returns INVALID error result when passed invalid slug string', async () => {
        const invalidSlug = '../../some-hacking/to/get/other-things.exe'
        const postErrResult = await getPost(invalidSlug)

        expect(postErrResult.isErr()).toBe(true)
        expect(postErrResult._unsafeUnwrapErr()).toStrictEqual(ResultError.INVALID)
      })

      it('returns INVALID error result when slug contains path separators', async () => {
        const suspectSlug = '../some/hacker/doing/nonsense/my-cool-slug'
        const postErrResult = await getPost(suspectSlug)

        expect(postErrResult.isErr()).toBe(true)
        expect(postErrResult._unsafeUnwrapErr()).toStrictEqual(ResultError.INVALID)
      })

      it('returns NOT_FOUND error result when file does not exist', async () => {
        vi.mocked(mdx.getPostFromMDX).mockRejectedValue(new MockFileNotFoundError())

        const postErrResult = await getPost(slug)

        expect(postErrResult.isErr()).toBe(true)
        expect(postErrResult._unsafeUnwrapErr()).toStrictEqual(ResultError.NOT_FOUND)
      })

      it('returns SYSTEM_FAILURE error result during uncaught exception', async () => {
        vi.mocked(mdx.getPostFromMDX).mockRejectedValue(new Error('Uncaught exception'))

        const postErrResult = await getPost(slug)

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
