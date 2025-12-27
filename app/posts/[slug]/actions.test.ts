// @vitest-environment node

import * as postsActions from '../actions'

import { fetchPreviousPost } from './actions'

import type { Post } from '@/lib/types'
import { getMockFrontmatter } from '@/test/mocks/frontmatter'
import { getMockSource } from '@/test/mocks/source'

vi.mock('@/lib/mdx')
vi.mock('../actions')

describe('/posts/[slug]/actions', () => {
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
