import { Metadata } from 'next'
import Image from 'next/image'

import { stackCollection } from './stack-collection'

import { Timeline, TimelineItem, TimelineLeftElement, TimelineRightElement } from '@/components/timeline'
import { TypographyH1, TypographyH2, TypographyH3, TypographyP } from '@/components/ui/typography'

export const metadata: Metadata = {
  title: 'Stack - James Walsh',
  description: 'Technologies I use & tools I love.',
}

export default function StackPage() {
  const sectionTitleMap: Record<string, string> = {
    frontend: 'Front end',
    backend: 'Full Stack / Back end',
    databases: 'Databases',
    eventing: 'Data Events',
    devtools: 'Dev Tools',
    principles: 'Practices & Principles',
  }

  return (
    <>
      <TypographyH1>Skills</TypographyH1>
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
                    <TypographyP data-testid={`${item.title}-text`}>{item.description}</TypographyP>
                  </li>
                ))}
              </ul>
            </TimelineRightElement>
          </TimelineItem>
        ))}
      </Timeline>
    </>
  )
}
