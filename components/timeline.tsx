import { PropsWithChildren } from 'react'

export function Timeline(props: PropsWithChildren) {
  return <ol className="mt-6 flex w-full flex-col gap-12 border-s-2 px-4 md:px-6" {...props} />
}

export function TimelineItem(props: PropsWithChildren) {
  return <li className="grid grid-cols-1 gap-6 md:grid-cols-4" {...props} />
}

export function TimelineLeftElement(props: PropsWithChildren) {
  return <div className="col-span-1" {...props} />
}

export function TimelineRightElement(props: PropsWithChildren) {
  return <div className="col-span-3 px-4" {...props} />
}
