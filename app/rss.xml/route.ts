import RSS from 'rss'

import { SITE_MAP_CATEGORIES } from './constants'

import { fetchPublishedPosts } from '@/app/posts/actions'
import { EMAIL, JAMES_WALSH, PRODUCTION_URL, SITE_DESCRIPTION } from '@/lib/constants'

export async function GET() {
  const feed = new RSS({
    title: JAMES_WALSH,
    description: SITE_DESCRIPTION,
    site_url: PRODUCTION_URL,
    feed_url: `${PRODUCTION_URL}/feed.xml`,
    copyright: `${new Date().getFullYear()} ${JAMES_WALSH}}`,
    managingEditor: EMAIL,
    webMaster: EMAIL,
    language: 'en-us',
    pubDate: new Date(),
    categories: SITE_MAP_CATEGORIES,
  })

  const publishedPosts = await fetchPublishedPosts()
  publishedPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      enclosure: {
        url: post.thumbnail,
        type: post.thumbnail.split('.')[1],
      },
      url: `${PRODUCTION_URL}/posts/${post.slug}`,
      categories: post.tags,
      author: JAMES_WALSH,
      guid: post.slug,
      date: new Date(post.publishedAt),
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
