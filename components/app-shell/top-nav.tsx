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
  'inline-block border-transparent mx-1 h-8 border-b-2 px-5 text-center opacity-80 transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'hover:border-b-2 hover:border-muted-foreground transition duration-300 ease-in',
        current: 'border-b-2 border-primary opacity-100',
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
      <nav className="pointer-events-auto mt-8 hidden h-12 md:flex md:flex-row md:justify-between md:gap-6">
        <ul className="flex flex-row items-center text-sm font-medium">
          <li>
            <Link href="/" className={cn(topNavVariants({ variant: pathname === '/' ? 'current' : 'default' }))}>
              Home
            </Link>
          </li>
          {SITE_NAVIGATIONAL_ITEMS.map((item) => {
            const variant = pathname.includes(item.href) ? 'current' : 'default'

            return (
              <li key={item.href} data-testid={`${item.value.toLowerCase()}-nav-item`}>
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
          <li data-testid="rss-feed-nav-item">
            <Link href="/rss.xml" className={cn(topNavVariants({ variant: 'ghost' }))}>
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
