import { Briefcase, Info, Newspaper, TerminalSquare } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import AboutMe from './about-me'
import WorkHistory from './work-history'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TypographyH1, TypographyP } from '@/components/ui/typography'
import { GITHUB_REPO_LINK } from '@/lib/constants'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'About - James Walsh',
  description: `Learn more about me.`,
}

export default function AboutPage() {
  return (
    <>
      <div className="mt-8 grid grid-cols-12 gap-10">
        <div className="col-span-12 flex flex-col justify-start md:col-span-7">
          <TypographyH1>
            <span className="from-primary inline-block bg-linear-to-r via-fuchsia-600 to-red-400 bg-clip-text text-5xl text-transparent">
              Hey 👋🏻
            </span>
            &nbsp;I&apos;m James
          </TypographyH1>
          <TypographyP className="my-3 text-xl break-normal">
            I live in Utah where I write software & enjoy the outdoors.
          </TypographyP>
          <TypographyP className="my-3 text-xl break-normal">
            In my free-time I love tinkering with home automations, riding my mountain bike & playing video games.
          </TypographyP>
          <TypographyP className="my-3 text-xl break-normal">
            I&apos;m a coffee nut. From Espresso, French-Press, to Pour Over, some of my favorite moments in life are
            looking out at a crisp morning with a hot cup in my hand.
          </TypographyP>
        </div>
        <Image
          src="/portraits/side-profile-pic-sticker.webp"
          alt="Illustration of James Side Profile"
          width={416}
          height={416}
          className="col-span-12 mr-auto mb-8 rounded-lg shadow-xl md:col-span-5 md:rotate-3"
          priority
        />
        <section className="col-span-12 flex flex-col gap-8 md:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-row gap-4">
                <Info />
                Get to Know Me
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AboutMe />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row gap-4">
              <Briefcase />
              <CardTitle>My Career</CardTitle>
            </CardHeader>
            <CardContent>
              <WorkHistory />
            </CardContent>
          </Card>
        </section>
        <section className="col-span-12 flex flex-col gap-8 md:col-span-5">
          <Card>
            <CardHeader className="flex flex-row items-baseline gap-2">
              <Newspaper />
              <CardTitle>Read My Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <TypographyP>
                Get notified when I publish new posts, unsubscribe any time. My blog is hosted here, & published to
                Hashnode & DEV.to.
              </TypographyP>
            </CardContent>
            <CardFooter>
              <Link href="/#publications" className={cn('w-full', buttonVariants())}>
                <b>Subscribe</b>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-baseline gap-2">
              <TerminalSquare />
              <CardTitle>How I Built This</CardTitle>
            </CardHeader>
            <CardContent>
              This site was built with Next.js, Typescript, & TailwindCSS. Use the link below to checkout the source
              code.
            </CardContent>
            <CardFooter>
              <Link href={GITHUB_REPO_LINK} download className={cn('w-full', buttonVariants())}>
                <b>Visit Github</b>
              </Link>
            </CardFooter>
          </Card>
        </section>
      </div>
    </>
  )
}
