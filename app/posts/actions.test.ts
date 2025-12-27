// @vitest-environment node

import fs from 'node:fs/promises'
import path from 'node:path'

import { fetchPublishedPosts } from './actions'

import * as mdx from '@/lib/mdx'
import { getMockFiles } from '@/test/mocks/files'
import { getMockFrontmatter } from '@/test/mocks/frontmatter'
import { getMockSource } from '@/test/mocks/source'

vi.mock('node:fs/promises')
vi.mock('@/lib/mdx')

describe('/posts/actions', () => {
  describe('fetchPublishedPosts', () => {
    const mockFiles = getMockFiles()

    beforeEach(() => {
      vi.mocked(mdx.getPostFromMDX).mockImplementation(async (filePath) => ({
        slug: path.basename(filePath, path.extname(filePath)),
        ...getMockFrontmatter({ status: 'published' }),
        source: getMockSource(),
      }))
    })

    it('reads from the /posts directory', async () => {
      vi.mocked(fs.readdir).mockResolvedValueOnce(mockFiles)
      const expectedFilePath = path.join(process.cwd(), 'posts')

      await fetchPublishedPosts()

      expect(fs.readdir).toHaveBeenCalledOnce()
      expect(fs.readdir).toHaveBeenCalledWith(expectedFilePath)
    })

    it('filters out non-mdx files', async () => {
      const mockFilesWithNonMDXFile = getMockFiles([
        path.join(process.cwd(), 'posts', 'non-blog-file.md'),
        path.join(process.cwd(), 'posts', 'non-blog-file.js'),
      ])

      vi.mocked(fs.readdir).mockResolvedValue(mockFilesWithNonMDXFile)

      const actual = await fetchPublishedPosts()

      expect(actual.length).toStrictEqual(mockFilesWithNonMDXFile.length - 2)
    })

    it('filters out draft blog posts', async () => {
      const mockFilesWithDrafts = getMockFiles([path.join(process.cwd(), 'posts', 'blog-draft.mdx')])

      vi.mocked(mdx.getPostFromMDX).mockImplementation(async (filePath) => {
        const slug = path.basename(filePath, path.extname(filePath))
        return {
          slug,
          ...getMockFrontmatter({ status: slug === 'blog-draft' ? 'draft' : 'published' }),
          source: getMockSource(),
        }
      })
      vi.mocked(fs.readdir).mockResolvedValue(mockFilesWithDrafts)

      const results = await fetchPublishedPosts()

      expect(results.map(({ slug }) => slug)).not.toContain('blog-draft')
    })

    it('filters out unreleased blog posts', async () => {
      const mockFilesWithUnreleasedPost = getMockFiles([path.join(process.cwd(), 'posts', 'future-release.mdx')])

      vi.mocked(mdx.getPostFromMDX).mockImplementation(async (filePath) => {
        const slug = path.basename(filePath, path.extname(filePath))

        // ? If this test case ever breaks because of the 9999-12-31, just know I think you're awesome, and think its even more awesome that this code somehow lasted that long. Cheers friend!
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

      const results = await fetchPublishedPosts()

      expect(results.map(({ slug }) => slug)).not.toContain('future-release')
    })
  })
})
