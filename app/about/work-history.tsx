'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface CVItem {
  image: React.ReactNode
  company: string
  role: string
  startDate: string
  endDate: string | 'Present'
}

export const cvItems: CVItem[] = [
  {
    image: (
      <Image
        src="/logos/employers/schoolai.jpg"
        width={32}
        height={32}
        alt="SchoolAI company logo"
        className="rounded-full"
      />
    ),
    company: 'SchoolAI',
    role: 'Senior Software Engineer',
    startDate: '2025',
    endDate: 'Present',
  },
  {
    image: (
      <Image src="/logos/employers/tomo.webp" width={32} height={32} alt="Tomo company logo" className="rounded-full" />
    ),
    company: 'Tomo',
    role: 'Senior Software Engineer',
    startDate: '2024',
    endDate: '2024',
  },
  {
    image: (
      <Image
        src="/logos/employers/vasion.webp"
        width={32}
        height={32}
        alt="Vasion company logo"
        className="rounded-full"
      />
    ),
    company: 'Vasion',
    role: 'Staff Software Engineer',
    startDate: '2022',
    endDate: '2024',
  },
  {
    image: (
      <Image
        src="/logos/employers/podium.webp"
        width={32}
        height={32}
        alt="Podium company logo"
        className="rounded-full"
      />
    ),
    company: 'Podium',
    role: 'Senior Software Engineer',
    startDate: '2021',
    endDate: '2022',
  },
  {
    image: (
      <Image
        src="/logos/employers/pluralsight.webp"
        width={32}
        height={32}
        alt="Pluralsight company logo"
        className="rounded-full"
      />
    ),
    company: 'Pluralsight',
    role: 'Full Stack Software Engineer',
    startDate: '2016',
    endDate: '2020',
  },
  {
    image: (
      <Image
        src="/logos/employers/maersk.webp"
        width={32}
        height={32}
        alt="Maersk company logo"
        className="rounded-full"
      />
    ),
    company: 'Maersk',
    role: 'Software Engineer',
    startDate: '2014',
    endDate: '2016',
  },
]

export default function WorkHistory() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="work-history">
        <AccordionTrigger>View Work History</AccordionTrigger>
        <AccordionContent>
          <ul className="mt-4 flex flex-col gap-6">
            {cvItems.map((cvItem) => (
              <li className="w-full" key={cvItem.company} data-testid={`${cvItem.company.toLowerCase()}-cv-item`}>
                {cvItem.image}
                <dl className="flex w-full flex-wrap gap-2">
                  <dt className="hidden">Company</dt>
                  <dd className="w-full font-semibold">{cvItem.company}</dd>
                  <dt className="hidden">Role</dt>
                  <dd className="text-xs">{cvItem.role}</dd>
                  <dt className="hidden">Date</dt>
                  <dd className="font-lighter ml-auto text-xs">
                    <time dateTime={cvItem.startDate}>{cvItem.startDate}</time>
                    <span aria-hidden="true"> — </span>
                    <time
                      dateTime={cvItem.endDate === 'Present' ? new Date().getFullYear().toString() : cvItem.endDate}
                    >
                      {cvItem.endDate}
                    </time>
                  </dd>
                </dl>
              </li>
            ))}
            <li className="w-full">
              <Link href="resume.pdf" className={cn('w-full', buttonVariants())}>
                <b>Download CV</b>
              </Link>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
