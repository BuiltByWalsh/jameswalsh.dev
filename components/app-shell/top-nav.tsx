'use client'

import { cva } from 'class-variance-authority'
import { RssIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

import { MobileMenu } from './mobile-menu'
import { ModeToggleMenu } from './mode-toggle-menu'

import { SITE_NAVIGATIONAL_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const topNavVariants = cva(
  'flex items-center px-5 w-18 mx-1 transition opacity-80 transition-colors duration-200 h-full border-b-2 border-transparent',
  {
    variants: {
      variant: {
        default: '',
        current: 'border-b-2 border-primary opacity-100',
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
      <nav className="pointer-events-auto mt-8 hidden h-12 md:flex md:flex-row md:justify-between md:gap-6">
        <ul className="flex items-center text-sm font-medium">
          <li className="h-full">
            <Link href="/" className={cn(topNavVariants({ variant: pathname === '/' ? 'current' : 'default' }))}>
              Home
            </Link>
          </li>
          {SITE_NAVIGATIONAL_ITEMS.map((item) => {
            const variant = pathname.includes(item.href) ? 'current' : 'default'

            return (
              <li key={item.href} className="h-full" data-testid={`${item.value.toLowerCase()}-nav-item`}>
                <Link href={item.href} className={cn(topNavVariants({ variant }))}>
                  {item.value}
                </Link>
              </li>
            )
          })}
        </ul>
        <ul className="flex items-center text-sm font-medium">
          <li data-testid="mode-toggle-menu">
            <ModeToggleMenu />
          </li>
          <li className="h-full" data-testid="rss-feed-nav-item">
            <Link href="/rss.xml" className={cn(topNavVariants({ variant: 'default' }))}>
              <TooltipProvider>
                <Tooltip delayDuration={250}>
                  <TooltipTrigger className="hover:cursor-pointer">
                    <RssIcon />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Get the RSS Feed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </li>
        </ul>
      </nav>
      <MobileMenu />
    </>
  )
}
