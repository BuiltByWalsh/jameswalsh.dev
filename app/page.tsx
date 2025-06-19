import { Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { fetchPublishedPosts } from './posts/actions'
import { ReadMore } from './posts/read-more'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TypographyH1, TypographyH2, TypographyP } from '@/components/ui/typography'
import { calculateTimeToRead } from '@/lib/utils'

export default async function HomePage() {
  const posts = await fetchPublishedPosts()

  return (
    <>
      <div className="mb-10 flex flex-col items-center">
        <div className="flex max-w-prose flex-col items-center gap-2 text-center">
          <TypographyH1 className="my-6 text-4xl md:my-3 md:text-6xl">Hey 👋🏻 I&apos;m James</TypographyH1>
          <TypographyP className="my-3 text-lg">
            I&apos;m a full-stack Software Engineer, UI/UX enthusiast, tinkerer, & self-proclaimed developer advocate.
            I&apos;m currently dedicated to enhancing personalized learning for every student at{' '}
            <Link href="https://schoolai.com" className="text-primary mr-0.5 hover:underline">
              SchoolAI
            </Link>
            .
          </TypographyP>
          <TypographyP>
            I&apos;m interested in full-stack, front-end focused web frameworks like{' '}
            <code className="gray-300 rounded-sm bg-gray-300 px-2 py-0.5 text-sm dark:bg-gray-600">Next.js</code> &{' '}
            <code className="gray-300 mr-0.5 rounded-sm bg-gray-300 px-2 py-0.5 text-sm dark:bg-gray-600">Remix</code>.
            I&apos;m writing blog posts about the things I&apos;m learning along the way. In my free-time I&apos;m also
            an indie developer, & blogger.
          </TypographyP>
        </div>
      </div>
      <TypographyH2 id="latest-blog-posts">Read Latest Blog Posts</TypographyH2>
      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4">
        {posts.map((post) => (
          <Link className="col-span-2 h-full" key={post.slug} href={`/posts/${post.slug}`}>
            <Card className="ease h-full transition hover:scale-105">
              <CardHeader>
                <AspectRatio ratio={16 / 9}>
                  <Image className="rounded-lg" fill src={post.thumbnail} alt={`${post.title} cover image`} />
                </AspectRatio>
                <CardTitle className="mt-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <span className="text-muted-foreground flex items-center">
                  <Clock width={16} height={16} />
                  &nbsp;
                  {calculateTimeToRead(post.source)}&nbsp;min read
                </span>
                <span>{post.brief}</span>
              </CardContent>
              <CardFooter>
                <ReadMore />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </section>
    </>
  )
}
