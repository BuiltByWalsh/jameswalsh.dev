export type TimelineTypes = 'frontend' | 'backend' | 'databases' | 'eventing' | 'devtools' | 'principles'

export interface TimelineItem {
  title: string
  description: string
  imageLink: string
}

export type TimelineCollectionRecord = Record<TimelineTypes, TimelineItem[]>
