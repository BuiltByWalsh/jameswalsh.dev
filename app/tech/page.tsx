import { LinkIcon } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { projectsCollection, stackCollection } from './static-data'

import { Timeline, TimelineItem, TimelineLeftElement, TimelineRightElement } from '@/components/timeline'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TypographyH1, TypographyH2, TypographyH3, TypographyP } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Tech - James Walsh',
  description: `Technologies I use & projects I've contributed to.`,
}

export default function StackPage() {
  const sectionTitleMap: Record<string, string> = {
    web: 'Web Development',
    databases: 'Databases',
    eventing: 'Data events',
    devtools: 'Dev Tools',
    principles: 'Practices & Principles',
  }

  return (
    <div className="flex flex-col gap-8">
      <TypographyH1 className="to-primary inline-block bg-linear-to-r from-fuchsia-600 via-red-400 bg-clip-text text-5xl text-transparent">
        Projects
      </TypographyH1>
      <hr />
      <p className="font-medium">
        I&apos;ve enjoyed contributing to many projects over the years, but the following is my professional highlight
        reel. A couple of them are <b>OSS</b> if you&apos;d like to learn more.
      </p>
      <div className="mt-8 grid w-full gap-8 sm:grid-cols-1 md:grid-cols-2">
        {projectsCollection.map((project) => (
          <Link key={project.title} href={project.externalLink.href}>
            <Card className="ease h-full transition hover:scale-105">
              <CardHeader className="flex flex-row items-center gap-4">
                <Image
                  src={project.imageLink}
                  alt={`Project logo for ${project.title}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="font-light">{project.description}</CardContent>
              <CardFooter>
                <div className="flex flex-row gap-2 font-semibold">
                  <LinkIcon width={16} />
                  {project.externalLink.title}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      <TypographyH2 className="to-primary inline-block bg-linear-to-r from-fuchsia-600 via-red-400 bg-clip-text text-5xl text-transparent">
        Skills
      </TypographyH2>
      <p className="font-medium">How I like to ship 🚀.</p>
      <hr />
      <Timeline>
        {Object.entries(stackCollection).map(([key, items]) => (
          <TimelineItem key={key}>
            <TimelineLeftElement>
              <TypographyH2>{sectionTitleMap[key]}</TypographyH2>
            </TimelineLeftElement>
            <TimelineRightElement>
              <ul className="flex flex-col gap-6" data-testid={`${key}-list`}>
                {items.map((item) => (
                  <li className="w-full" key={item.title}>
                    <div className="flex flex-row items-center gap-4">
                      <Image
                        className="rounded-md"
                        width={36}
                        height={36}
                        src={item.imageLink}
                        alt={`technology logo for ${item.title}`}
                      />
                      <TypographyH3>{item.title}</TypographyH3>
                    </div>
                    <TypographyP data-testid={`${item.title}-text`} className="text-sm">
                      {item.description}
                    </TypographyP>
                  </li>
                ))}
              </ul>
            </TimelineRightElement>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
