// @vitest-environment node

import * as postsActions from '../actions'

import { fetchPostBySlug, fetchPreviousPost } from './actions'

import * as mdx from '@/lib/mdx'
import type { Post } from '@/lib/types'
import { getMockFrontmatter } from '@/test/mocks/frontmatter'
import { getMockSource } from '@/test/mocks/source'

vi.mock('@/lib/mdx')
vi.mock('../actions')

describe('/posts/[slug]/actions', () => {
  describe('fetchPostBySlug', () => {
    const slug = 'project-hail-mary'
    const mockPost: Post = {
      slug,
      source: '#MyCoolHeading',
      ...getMockFrontmatter(),
    }

    beforeEach(() => {
      vi.mocked(mdx.getPostFromMDX).mockResolvedValue(mockPost)
    })

    it('returns a post based on slug & filepath', async () => {
      const post = await fetchPostBySlug(slug)

      expect(post).toEqual(mockPost)
    })

    describe('when the blog post file does not exit', () => {
      class MockFileNotFoundError extends Error {
        code: string
        constructor(message = '', ...args: undefined[]) {
          super(message, ...args)
          this.code = 'ENOENT'
        }
      }

      it('will redirect using next/navigation notFound()', async () => {
        const serializedNextNotFound = 'NEXT_HTTP_ERROR_FALLBACK;404'

        vi.mocked(mdx.getPostFromMDX).mockRejectedValue(new MockFileNotFoundError())

        await expect(() => fetchPostBySlug(slug)).rejects.toThrowError(serializedNextNotFound)
      })
    })

    describe('when an unexpected error occurs', () => {
      it('handles it gracefully', async () => {
        const expectedErrorMessage = `Something went wrong. Unable to fetch a blog post for ${slug}`
        vi.mocked(mdx.getPostFromMDX).mockRejectedValue(new Error('Uncaught exception'))

        await expect(() => fetchPostBySlug(slug)).rejects.toThrowError(expectedErrorMessage)
      })
    })
  })

  describe('fetchPreviousPost', () => {
    const mockPosts: Post[] = [
      { slug: 'slug-1', ...getMockFrontmatter(), source: getMockSource() },
      { slug: 'slug-2', ...getMockFrontmatter(), source: getMockSource() },
    ]

    it('returns the next index of results returned from fetchPublishedPosts()', async () => {
      vi.mocked(postsActions.fetchPublishedPosts).mockResolvedValue(mockPosts)

      const actual = await fetchPreviousPost('slug-1')
      expect(actual).toBeTruthy()
      expect(actual?.slug).toStrictEqual('slug-2')
    })

    it('returns undefined when the bottom of the list is reached', async () => {
      vi.mocked(postsActions.fetchPublishedPosts).mockResolvedValue(mockPosts)

      const actual = await fetchPreviousPost('slug-2')
      expect(actual).toBeUndefined()
    })
  })
})
