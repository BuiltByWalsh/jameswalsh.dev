import { formatDate } from 'date-fns/format'
import { Copyright, Rss } from 'lucide-react'
import Link from 'next/link'

import { LinkedIn, Github, BlueSky } from '@/components/icons'
import { SITE_NAVIGATIONAL_ITEMS } from '@/lib/constants'

interface SocialLink {
  name: string
  href: string
  ariaLabel: string
  icon: React.ReactElement
}
export const socialLinks: SocialLink[] = [
  {
    name: 'Github',
    href: 'https://github.com/BuiltByWalsh',
    ariaLabel: 'Visit my Github',
    icon: <Github />,
  },
  {
    name: 'BlueSky',
    href: 'https://bsky.app/profile/jameswalsh.bsky.social',
    ariaLabel: 'Follow me on BlueSky',
    icon: <BlueSky />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jamesandersonwalsh',
    ariaLabel: 'Go to my LinkedIn',
    icon: <LinkedIn />,
  },
]

export default function Footer() {
  return (
    <footer className="border-border flex w-full flex-col justify-between border-t px-10 py-4 sm:grid-cols-1 md:flex-row">
      <div className="my-4 flex flex-col-reverse items-center justify-center gap-6 md:flex-col md:items-start">
        <div className="flex flex-row gap-6">
          {socialLinks.map(({ name, href, ariaLabel, icon }) => (
            <Link key={name} href={href} aria-label={ariaLabel}>
              {icon}
            </Link>
          ))}
          <Link href="/rss.xml">
            <Rss width={24} height={24} />
          </Link>
        </div>
        <ul className="flex flex-row gap-6">
          {SITE_NAVIGATIONAL_ITEMS.map((item) => (
            <li className="w-full" key={item.value} data-testid={`${item.value.toLowerCase()}-footer-nav-item`}>
              <Link href={item.href}>{item.value}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="my-4 flex flex-row items-center justify-center">
        <Copyright className="h-4 w-4" />
        &nbsp;{formatDate(new Date(), 'yyyy')}&nbsp;James Walsh
      </div>
    </footer>
  )
}
