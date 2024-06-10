import { MetadataRoute } from 'next'

import { fetchPublishedPosts } from '@/app/posts/actions'
import { PRODUCTION_URL } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publishedPosts = await fetchPublishedPosts()

  const blogPostSiteMaps: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${PRODUCTION_URL}/posts/${post.slug}`,
    lastModified: !!post.lastModified ? new Date(post.lastModified) : new Date(post.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [
    {
      url: PRODUCTION_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...blogPostSiteMaps,
    {
      url: `${PRODUCTION_URL}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${PRODUCTION_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${PRODUCTION_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${PRODUCTION_URL}/stack`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ]
}
