import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import MDXContent from './mdx-content'
import TimeInformation from './time-information'

import { Tag } from '@/components/tag'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { buttonVariants } from '@/components/ui/button'
import { TypographyH1 } from '@/components/ui/typography'
import { JAMES_WALSH, PRODUCTION_URL } from '@/lib/constants'
import { unwrapOrThrow } from '@/lib/result'
import { cn } from '@/lib/utils'
import { getAllPublishedPosts, getPost, getPreviousPost } from '@/services/post'

export async function generateStaticParams() {
  const publishedPostsResult = await getAllPublishedPosts()
  const publishedPosts = unwrapOrThrow(publishedPostsResult)

  return publishedPosts.map((post) => ({
    slug: post.slug,
  }))
}

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params
  const postResult = await getPost(slug)
  const post = unwrapOrThrow(postResult)

  return {
    title: post.title,
    description: post.brief,
    publisher: JAMES_WALSH,
    creator: JAMES_WALSH,
    authors: [{ url: PRODUCTION_URL, name: JAMES_WALSH }],
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.brief,
      images: [post.thumbnail],
      type: 'article',
      tags: post.tags,
      publishedTime: post.publishedAt,
      locale: 'en_us',
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [postResult, previousPostResult] = await Promise.all([getPost(slug), getPreviousPost(slug)])

  const post = unwrapOrThrow(postResult)
  const previousPostSlug = unwrapOrThrow(previousPostResult)?.slug

  return (
    <div className="mx-0 my-10 flex flex-col items-center md:mx-20">
      <AspectRatio ratio={16 / 9}>
        <Image src={post.thumbnail} alt="Article cover image" className="rounded-xl border-2" priority fill />
      </AspectRatio>
      <TypographyH1>{post.title}</TypographyH1>
      <div className="flex w-full flex-col items-center gap-4">
        <span className="flex flex-row flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </span>
        <TimeInformation metadata={{ publishedAt: post.publishedAt, source: post.source }} />
      </div>
      <article className="mt-8">
        <MDXContent source={post.source} />
      </article>
      <div className="border-color mt-8 flex w-full flex-row justify-center gap-4 border-t pt-8">
        <Link href="/posts" className={cn(buttonVariants({ variant: 'outline' }), 'w-2/5 md:w-1/2')}>
          <ChevronLeft width={16} height={16} />
          &nbsp;All posts
        </Link>
        {previousPostSlug && (
          <Link
            href={`/posts/${previousPostSlug}`}
            className={cn(buttonVariants({ variant: 'outline' }), 'w-2/5 md:w-1/2')}
          >
            <ChevronRight width={16} height={16} />
            &nbsp;Next
          </Link>
        )}
      </div>
    </div>
  )
}
