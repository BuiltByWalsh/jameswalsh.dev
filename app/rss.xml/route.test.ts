// @vitest-environment node

import { SITE_MAP_CATEGORIES } from './constants'
import { GET } from './route'

import { fetchPublishedPosts } from '@/app/posts/actions'
import { EMAIL, JAMES_WALSH, PRODUCTION_URL, SITE_DESCRIPTION } from '@/lib/constants'
import { getMockPost } from '@/test/mocks/post'

vi.mock('@/app/posts/actions', () => ({
  fetchPublishedPosts: vi.fn().mockResolvedValue([]),
}))

describe('rss.xml', () => {
  describe('GET', () => {
    const mockDateTime = new Date(Date.UTC(2024, 9, 31, 0, 0, 0)) // happy halloween 🎃

    beforeAll(() => {
      vi.useFakeTimers()
      vi.setSystemTime(mockDateTime)
    })

    afterAll(() => {
      vi.useRealTimers()
    })

    it('returns properly formatted atom+xml rss response', async () => {
      const response = await GET()
      const blob = await response.blob()
      const text = await blob.text()

      expect(response.ok).toBeTruthy()
      expect(blob.type).toStrictEqual('application/atom+xml;charset=utf-8')
      expect(text).toContain(`<title><![CDATA[${JAMES_WALSH}]]></title>`)
      expect(text).toContain(`<description><![CDATA[${SITE_DESCRIPTION}]]></description>`)
      expect(text).toContain(`<link>${PRODUCTION_URL}</link>`)
      expect(text).toContain(
        `<atom:link href="https://www.jameswalsh.dev/feed.xml" rel="self" type="application/rss+xml"/>`,
      )
      expect(text).toContain(`<copyright><![CDATA[2024 ${JAMES_WALSH}}]]></copyright>`)
      expect(text).toContain(`<managingEditor><![CDATA[${EMAIL}]]></managingEditor>`)
      expect(text).toContain(`<webMaster><![CDATA[${EMAIL}]]></webMaster>`)
      expect(text).toContain(`<language><![CDATA[en-us]]></language>`)
      expect(text).toContain(`<pubDate>Thu, 31 Oct 2024 00:00:00 GMT</pubDate>`)
      SITE_MAP_CATEGORIES.forEach((category) => {
        expect(text).toContain(`<category><![CDATA[${category}]]></category>`)
      })
    })

    it('adds blog posts as xml feed items', async () => {
      const mockPosts = [
        getMockPost({ title: 'blog post 1', slug: 'slug-1', thumbnail: '/blog-thumbnails/post-1-thumbnail.webp' }),
        getMockPost({ title: 'blog post 2', slug: 'slug-2', thumbnail: '/blog-thumbnails/post-2-thumbnail.webp' }),
      ]
      vi.mocked(fetchPublishedPosts).mockResolvedValue(mockPosts)
      const response = await GET()
      const blob = await response.blob()
      const text = await blob.text()

      expect(text).toContain('<item>')
      mockPosts.forEach((post) => {
        expect(text).toContain(`<title><![CDATA[${post.title}]]></title>`)
        expect(text).toContain(`<link>${PRODUCTION_URL}/posts/${post.slug}</link>`)
        expect(text).toContain(`<guid isPermaLink="false">${post.slug}</guid>`)
        expect(text).toContain(`<dc:creator><![CDATA[${JAMES_WALSH}]]></dc:creator>`)
        expect(text).toContain(`<pubDate>Sat, 14 Sep 2024 00:00:00 GMT</pubDate>`)
        expect(text).toContain(`<enclosure url="${post.thumbnail}" length="0" type="webp"/>`)
      })
    })
  })
})
