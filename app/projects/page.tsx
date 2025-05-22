import { LinkIcon } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { projectsCollection } from './project-collection'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TypographyH1 } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Projects - James Walsh',
  description: `Projects I've contributed to.`,
}

export default function ProjectsPage() {
  return (
    <>
      <TypographyH1 className="w-prose">
        Things I&apos;ve Helped Build That&nbsp;
        <span className="to-primary inline-block bg-linear-to-r from-fuchsia-600 via-red-400 bg-clip-text text-5xl text-transparent">
          Make Me Smile
        </span>
      </TypographyH1>
      <p>
        I&apos;ve enjoyed contributing to many projects over the years, but the following is my professional highlight
        reel. A couple of them are open-source, if you&apos;d like to learn more.
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
    </>
  )
}
