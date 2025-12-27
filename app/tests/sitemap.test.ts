import sitemap from '../sitemap'

import { PRODUCTION_URL } from '@/lib/constants'
import { getAllPublishedPosts } from '@/services/post'
import { getMockPost } from '@/test/mocks/post'

vi.mock('@/services/post', () => ({
  getAllPublishedPosts: vi.fn().mockResolvedValue([]),
}))

describe('sitemap', () => {
  const mockDateTime = new Date(2024, 9, 31) // happy halloween 🎃

  beforeEach(() => {
    vi.setSystemTime(mockDateTime)
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
  })

  it.each([
    ['about', { url: `${PRODUCTION_URL}/about`, lastModified: mockDateTime, changeFrequency: 'yearly', priority: 0.7 }],
    [
      'projects',
      { url: `${PRODUCTION_URL}/projects`, lastModified: mockDateTime, changeFrequency: 'yearly', priority: 0.5 },
    ],
    [
      'stack',
      { url: `${PRODUCTION_URL}/projects`, lastModified: mockDateTime, changeFrequency: 'yearly', priority: 0.1 },
    ],
    ['posts', { url: `${PRODUCTION_URL}/posts`, lastModified: mockDateTime, changeFrequency: 'weekly', priority: 0.8 }],
  ])('contains sitemap record for /%s', async () => {
    const sitemapList = await sitemap()
    expect(sitemapList.find((sm) => sm.url.includes('/about'))).toEqual({
      url: `${PRODUCTION_URL}/about`,
      lastModified: mockDateTime,
      changeFrequency: 'yearly',
      priority: 0.7,
    })
  })

  it('contains sitemap record for index', async () => {
    const sitemapList = await sitemap()
    expect(sitemapList[0]).toEqual({
      url: PRODUCTION_URL,
      lastModified: mockDateTime,
      changeFrequency: 'monthly',
      priority: 1,
    })
  })

  it('contains sitemap record for all blog posts', async () => {
    const mockPublishedPosts = [
      getMockPost({
        slug: 'my-cool-slug-1',
        lastModified: '2024-09-14',
        publishedAt: '2024-09-14',
      }),
      getMockPost({
        slug: 'my-cool-slug-2',
        lastModified: '2024-09-16',
        publishedAt: '2024-09-16',
      }),
    ]
    vi.mocked(getAllPublishedPosts).mockResolvedValue(mockPublishedPosts)

    const sitemapList = await sitemap()

    expect(sitemapList[1]).toEqual({
      url: `${PRODUCTION_URL}/posts/${mockPublishedPosts[0].slug}`,
      lastModified: new Date(mockPublishedPosts[0].publishedAt),
      changeFrequency: 'weekly',
      priority: 0.9,
    })

    expect(sitemapList[2]).toEqual({
      url: `${PRODUCTION_URL}/posts/${mockPublishedPosts[1].slug}`,
      lastModified: new Date(mockPublishedPosts[1].publishedAt),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  })
})
