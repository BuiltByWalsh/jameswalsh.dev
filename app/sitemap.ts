import { MetadataRoute } from 'next'

import { PRODUCTION_URL } from '@/lib/constants'
import { unwrapOrThrow } from '@/lib/result'
import { getAllPublishedPosts } from '@/services/post'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publishedPostsResults = await getAllPublishedPosts()
  const publishedPosts = unwrapOrThrow(publishedPostsResults)

  const blogPostSiteMaps: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${PRODUCTION_URL}/posts/${post.slug}`,
    lastModified: new Date(post.lastModified),
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
      url: `${PRODUCTION_URL}/tech`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
