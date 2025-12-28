'use client'

import { formatDistanceToNow } from 'date-fns'

import { Time } from '@/components/time'
import { calculateTimeToRead } from '@/lib/utils'
import { type Post } from '@/services/types'

interface TimeInformationProps {
  metadata: Pick<Post, 'publishedAt' | 'source'>
}

export default function TimeInformation({ metadata }: TimeInformationProps) {
  return (
    <span className="flex flex-row text-lg font-medium">
      <Time dateTime={metadata.publishedAt} />
      <span className="ml-2 flex flex-row gap-1 text-sm md:text-lg">
        —&nbsp;{calculateTimeToRead(metadata.source)}&nbsp;min read&nbsp;(
        {formatDistanceToNow(new Date(metadata.publishedAt))} ago)
      </span>
    </span>
  )
}
