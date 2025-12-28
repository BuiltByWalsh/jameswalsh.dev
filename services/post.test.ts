// @vitest-environment node

import fs from 'node:fs/promises'
import path from 'node:path'

import { err, ok } from 'neverthrow'

import { ResultError } from '../lib/result'

import { getAllPublishedPosts, getPost, getPreviousPost } from './post'

import { getPostFromMDX } from '@/services/mdx'
import type { Post } from '@/services/types'
import { getMockFiles } from '@/test/mocks/files'
import { getMockFrontmatter } from '@/test/mocks/frontmatter'
import { getMockSource } from '@/test/mocks/source'

vi.mock('node:fs/promises')
vi.mock('@/services/mdx')

describe('services/post', () => {
  describe('#getPost', () => {
    const slug = 'project-hail-mary'
    const mockPost: Post = {
      slug,
      source: '#MyCoolHeading',
      ...getMockFrontmatter(),
    }

    beforeEach(() => {
      vi.mocked(getPostFromMDX).mockResolvedValue(mockPost)
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
        vi.mocked(getPostFromMDX).mockRejectedValue(new MockFileNotFoundError())

        const postErrResult = await getPost(slug)

        expect(postErrResult.isErr()).toBe(true)
        expect(postErrResult._unsafeUnwrapErr()).toStrictEqual(ResultError.NOT_FOUND)
      })

      it('returns SYSTEM_FAILURE error result during uncaught exception', async () => {
        vi.mocked(getPostFromMDX).mockRejectedValue(new Error('Uncaught exception'))

        const postErrResult = await getPost(slug)

        expect(postErrResult.isErr()).toBe(true)
        expect(postErrResult._unsafeUnwrapErr()).toStrictEqual(ResultError.SYSTEM_FAILURE)
      })
    })
  })

  describe('#getPreviousPost', () => {
    beforeEach(() => {
      vi.mocked(getPostFromMDX).mockImplementation(async (filePath) => ({
        slug: path.basename(filePath, path.extname(filePath)),
        ...getMockFrontmatter({ status: 'published' }),
        source: getMockSource(),
      }))
    })

    it('returns the next index result returned from published posts', async () => {
      const mockFiles = getMockFiles([
        path.join(process.cwd(), 'posts', 'slug-1.mdx'),
        path.join(process.cwd(), 'posts', 'slug-2.mdx'),
      ])
      vi.mocked(fs.readdir).mockResolvedValueOnce(mockFiles)

      const previousPostResult = await getPreviousPost('slug-1')

      expect(previousPostResult.isOk()).toBe(true)
      expect(previousPostResult._unsafeUnwrap()?.slug).toStrictEqual('slug-2')
    })

    it('returns undefined result when the bottom of the list is reached', async () => {
      const mockFiles = getMockFiles([
        path.join(process.cwd(), 'posts', 'slug-1.mdx'),
        path.join(process.cwd(), 'posts', 'slug-2.mdx'),
      ])
      vi.mocked(fs.readdir).mockResolvedValueOnce(mockFiles)

      const previousPostResult = await getPreviousPost('slug-2')

      expect(previousPostResult).toStrictEqual(ok(undefined))
    })

    it('returns an err result when previous post cannot be found', async () => {
      const mockFiles = getMockFiles()

      vi.mocked(fs.readdir).mockResolvedValueOnce(mockFiles)

      const previousPostResult = await getPreviousPost('some-totally-bogus-slug')

      expect(previousPostResult).toStrictEqual(err(ResultError.NOT_FOUND))
    })
  })

  describe('#getPublishedPosts', () => {
    const mockFiles = getMockFiles()

    beforeEach(() => {
      vi.mocked(getPostFromMDX).mockImplementation(async (filePath) => ({
        slug: path.basename(filePath, path.extname(filePath)),
        ...getMockFrontmatter({ status: 'published' }),
        source: getMockSource(),
      }))
    })

    it('reads from the /posts directory', async () => {
      vi.mocked(fs.readdir).mockResolvedValueOnce(mockFiles)
      const expectedFilePath = path.join(process.cwd(), 'posts')

      await getAllPublishedPosts()

      expect(fs.readdir).toHaveBeenCalledOnce()
      expect(fs.readdir).toHaveBeenCalledWith(expectedFilePath)
    })

    it('filters out non-mdx files', async () => {
      const mockFilesWithNonMDXFile = getMockFiles([
        path.join(process.cwd(), 'posts', 'non-blog-file.md'),
        path.join(process.cwd(), 'posts', 'non-blog-file.js'),
      ])

      vi.mocked(fs.readdir).mockResolvedValue(mockFilesWithNonMDXFile)

      const actual = await getAllPublishedPosts()

      expect(actual.length).toStrictEqual(mockFilesWithNonMDXFile.length - 2)
    })

    it('filters out draft blog posts', async () => {
      const mockFilesWithDrafts = getMockFiles([path.join(process.cwd(), 'posts', 'blog-draft.mdx')])

      vi.mocked(getPostFromMDX).mockImplementation(async (filePath) => {
        const slug = path.basename(filePath, path.extname(filePath))
        return {
          slug,
          ...getMockFrontmatter({ status: slug === 'blog-draft' ? 'draft' : 'published' }),
          source: getMockSource(),
        }
      })
      vi.mocked(fs.readdir).mockResolvedValue(mockFilesWithDrafts)

      const results = await getAllPublishedPosts()

      expect(results.map(({ slug }) => slug)).not.toContain('blog-draft')
    })

    it('filters out unreleased blog posts', async () => {
      const mockFilesWithUnreleasedPost = getMockFiles([path.join(process.cwd(), 'posts', 'future-release.mdx')])

      vi.mocked(getPostFromMDX).mockImplementation(async (filePath) => {
        const slug = path.basename(filePath, path.extname(filePath))

        // Note If this test case ever breaks because of the 9999-12-31, just know I think you're awesome
        // and I think it's even more awesome that this code somehow lasted that long. Cheers friend!
        return {
          slug,
          ...getMockFrontmatter({
            status: 'published',
            publishedAt: slug === 'future-release' ? '9999-12-31' : '2023-12-06',
          }),
          source: getMockSource(),
        }
      })
      vi.mocked(fs.readdir).mockResolvedValue(mockFilesWithUnreleasedPost)

      const results = await getAllPublishedPosts()

      expect(results.map(({ slug }) => slug)).not.toContain('future-release')
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
