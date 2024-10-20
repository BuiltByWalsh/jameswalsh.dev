import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { fetchPublishedPosts } from '../actions'

import { fetchPostBySlug, fetchPreviousPost } from './actions'
import MDXContent from './mdx-content'
import { Tag } from './tag'
import TimeInformation from './time-information'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { buttonVariants } from '@/components/ui/button'
import { TypographyH1 } from '@/components/ui/typography'
import { PRODUCTION_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

export async function generateStaticParams() {
  const publishedPosts = await fetchPublishedPosts()

  return publishedPosts.map((post) => ({
    slug: post.slug,
  }))
}

export const generateMetadata = async ({ params }: { params: { slug: string } }): Promise<Metadata> => {
  const post = await fetchPostBySlug(params.slug)

  return {
    title: post.title,
    description: post.brief,
    publisher: 'James Walsh',
    creator: 'James Walsh',
    authors: [{ url: PRODUCTION_URL, name: 'James Walsh' }],
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

export interface PostPageProps {
  params: { slug: string }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await fetchPostBySlug(params.slug)
  const previousPost = await fetchPreviousPost(params.slug)

  return (
    <div className="py-10">
      <AspectRatio ratio={16 / 9}>
        <Image src={post.thumbnail} alt="Article cover image" className="rounded-xl border-2" priority fill />
      </AspectRatio>
      <TypographyH1>{post.title}</TypographyH1>
      <div className="flex w-full flex-col gap-4">
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
      <div className="border-color mt-8 flex w-full flex-row justify-between gap-6 border-t pt-8">
        <Link href="/posts" className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}>
          <ChevronLeft width={16} height={16} />
          &nbsp;All posts
        </Link>
        {!!previousPost && (
          <Link href={`/posts/${previousPost.slug}`} className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}>
            <ChevronRight width={16} height={16} />
            &nbsp;Next
          </Link>
        )}
      </div>
    </div>
  )
}
