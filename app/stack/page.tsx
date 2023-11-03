import Image from 'next/image'
import { css } from 'styled-system/css'
import { hstack } from 'styled-system/patterns'

import TimelineCollection from './timelineCollection'

import { UnorderedList } from '@/components/List'
import { TypographyH2 } from '@/components/ui/typography'
import { PageLayout } from '@ui/Layouts'
import { Timeline } from '@ui/Timeline'

const itemTitleContainer = hstack({
  alignItems: 'self-end',
  gap: 4,
})
const h3 = css({
  mt: '1rem',
  fontSize: 'larger',
})
const p = css({
  fontSize: 'smaller',
  lineHeight: '1.33rem',
})
const technologyLogo = css({
  borderRadius: 'md',
})

export const metadata = {
  title: 'Stack - James Walsh',
  description: 'Technologies I use & tools I love.',
}

export default function StackPage() {
  const timelineCollection = TimelineCollection

  const sectionTitleMap: Record<string, string> = {
    frontend: 'Front-end',
    backend: 'Full Stack / Back-end',
    databases: 'Databases',
    eventing: 'Data Events',
    devtools: 'Dev Tools',
    principles: 'Practices & Principles',
  }

  return (
    <>
      <PageLayout.Title align="center">Technology tools I both use & recommend.</PageLayout.Title>
      <PageLayout.Content>
        <Timeline>
          {Object.entries(timelineCollection).map(([key, items]) => (
            <Timeline.Item key={key}>
              <Timeline.LeftElement>
                <TypographyH2>{sectionTitleMap[key]}</TypographyH2>
              </Timeline.LeftElement>
              <Timeline.RightElement>
                <UnorderedList>
                  {items.map((item) => (
                    <UnorderedList.ListItem key={item.title} type="vertical">
                      <div className={itemTitleContainer}>
                        <Image
                          className={technologyLogo}
                          width={36}
                          height={36}
                          src={item.imageLink}
                          alt="technology logo"
                        />
                        <h3 className={h3}>{item.title}</h3>
                      </div>
                      <p className={p}>{item.description}</p>
                    </UnorderedList.ListItem>
                  ))}
                </UnorderedList>
              </Timeline.RightElement>
            </Timeline.Item>
          ))}
        </Timeline>
      </PageLayout.Content>
    </>
  )
}
