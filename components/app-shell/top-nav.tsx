'use client'

import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ModeToggleButton, RssFeedButton } from './action-buttons'
import { MobileMenu } from './mobile-menu'

import { SITE_NAVIGATIONAL_ITEMS } from '@/lib/constants'

const topNavVariants = cva(
  'inline-block border-transparent mx-1 h-8 border-b-2 text-center text-lg opacity-80 transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'transition duration-150 ease-in hover:text-primary opacity-80',
        current: 'opacity-100 text-primary',
        ghost: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
export function TopNavbar() {
  const pathname = usePathname()

  return (
    <>
      <nav className="pointer-events-auto mt-6 hidden h-12 w-full md:flex md:max-w-[1100px] md:flex-row md:justify-between">
        <ul className="flex flex-row items-center gap-x-8 text-sm font-medium">
          <li>
            <Link href="/" className={topNavVariants({ variant: pathname === '/' ? 'current' : 'default' })}>
              ~/
            </Link>
          </li>
          {SITE_NAVIGATIONAL_ITEMS.map((item) => {
            const variant = pathname.includes(item.href) ? 'current' : 'default'

            return (
              <li key={item.href} data-testid={`${item.value.toLowerCase()}-nav-item`}>
                <Link href={item.href} className={topNavVariants({ variant })}>
                  {variant === 'current' ? `/ ${item.value}` : `> ${item.value}`}
                </Link>
              </li>
            )
          })}
        </ul>
        <ul className="flex items-center gap-2 text-sm font-medium">
          <li data-testid="mode-toggle-nav-item" className="h-full">
            <ModeToggleButton />
          </li>
          <li data-testid="rss-feed-nav-item" className="h-full">
            <RssFeedButton />
          </li>
        </ul>
      </nav>
      <MobileMenu />
    </>
  )
}
