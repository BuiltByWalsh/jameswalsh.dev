import { Clock, MapPin, Terminal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { fetchPublishedPosts } from './posts/actions'
import { ReadMore } from './posts/read-more'

import { Tag } from '@/components/tag'
import { Time } from '@/components/time'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { calculateTimeToRead } from '@/lib/utils'

export default async function HomePage() {
  const posts = await fetchPublishedPosts()

  return (
    <div className="mt-16 mb-6 flex w-full flex-col gap-8 md:mt-0 md:flex-row">
      <div className="flex h-fit w-full flex-col gap-4 rounded-xl border p-4 shadow-sm md:w-fit">
        <div className="flex flex-row gap-4">
          <div>
            <Image
              src="/portraits/profile-pic-sticker.webp"
              className="rounded-xl border shadow-xs"
              height={120}
              width={120}
              alt="profile pic"
            />
          </div>
          <div className="space-y-2">
            <h1 className="from-primary inline-block bg-linear-to-r via-fuchsia-600 to-red-400 bg-clip-text text-2xl font-semibold text-transparent">
              James Walsh
            </h1>
            <h2 className="font-semibold text-fuchsia-600">Sr Software Engineer</h2>
            <p className="flex flex-row gap-2 font-medium">
              <MapPin className="h-5 w-5" />
              SLC, UT
            </p>
          </div>
        </div>
        <hr />
        <p className="w-[300px] text-sm text-balance">
          I&apos;m a full-stack, front-end focused web developer interested in frameworks like{' '}
          <code className="gray-300 rounded-sm bg-gray-300 px-1 py-0.5 text-xs dark:bg-gray-600">Next.js</code> &{' '}
          <code className="gray-300 mr-0.5 rounded-sm bg-gray-300 px-0.5 py-0.5 text-xs dark:bg-gray-600">Remix</code>.
          I&apos;m writing blog posts about the things I&apos;m learning along the way. In my free-time I&apos;m also an
          indie developer, & blogger.
        </p>
      </div>
      <div>
        <div className="flex flex-row gap-4">
          <Terminal className="text-primary h-10 w-10" />
          <h2 className="text-primary mb-8 text-4xl md:mb-10" id="latest-blog-posts">
            posts
          </h2>
        </div>
        <section className="flex max-w-2xl flex-col gap-4">
          {posts.map((post) => (
            <Link className="h-full" key={post.slug} href={`/posts/${post.slug}`}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Time dateTime={post.publishedAt} />
                  <span className="text-muted-foreground flex items-center">
                    <Clock width={16} height={16} />
                    &nbsp;
                    {calculateTimeToRead(post.source)}&nbsp;min read
                  </span>

                  <span className="flex flex-row flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </span>
                  <p className="text-sm">{post.brief}</p>
                </CardContent>
                <CardFooter>
                  <ReadMore />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </div>
  )
}
