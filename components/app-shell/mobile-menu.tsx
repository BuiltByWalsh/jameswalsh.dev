'use client'

import {
  HomeIcon,
  BookTypeIcon,
  SquareTerminalIcon,
  FolderGit2Icon,
  BadgeInfoIcon,
  Menu,
  Moon,
  RssIcon,
  Sun,
} from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { type ReactNode } from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SITE_NAVIGATIONAL_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const navItemIcons: Record<string, ReactNode> = {
  blog: <BookTypeIcon className="mr-2 h-4 w-4" />,
  about: <BadgeInfoIcon className="mr-2 h-4 w-4" />,
  stack: <SquareTerminalIcon className="mr-2 h-4 w-4" />,
  portfolio: <FolderGit2Icon className="mr-2 h-4 w-4" />,
}

export function MobileMenu() {
  const { theme, setTheme } = useTheme()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu
          className="absolute right-0 mt-6 mr-6 mb-4 h-10 w-10 cursor-pointer md:hidden"
          data-testid="mobile-menu-trigger"
        />
      </SheetTrigger>
      <SheetContent>
        <ul className="mt-8 flex flex-col gap-6">
          <li className="h-full w-full" data-testid="home-nav-item">
            <SheetClose asChild>
              <Link
                href="/"
                className={cn(buttonVariants({ variant: 'ghost' }), 'w-full justify-start rounded-none border-b')}
              >
                <HomeIcon className="mr-2 h-4 w-4" />
                Home
              </Link>
            </SheetClose>
          </li>
          {SITE_NAVIGATIONAL_ITEMS.map((navItem) => {
            return (
              <li className="w-full" key={navItem.value} data-testid={`${navItem.value.toLowerCase()}-nav-item`}>
                <SheetClose asChild>
                  <Link
                    href={navItem.href}
                    className={cn(buttonVariants({ variant: 'ghost' }), 'w-full justify-start rounded-none border-b')}
                  >
                    {navItemIcons[navItem.value.toLowerCase()]}
                    {navItem.value}
                  </Link>
                </SheetClose>
              </li>
            )
          })}
          <li data-testid="rss-feed-text-nav-item">
            <SheetClose asChild>
              <Link
                target="_blank"
                href="/rss.xml"
                className={cn(buttonVariants({ variant: 'ghost' }), 'w-full justify-start rounded-none border-b')}
              >
                <RssIcon className="mr-2 h-4 w-4" />
                Get RSS Feed
              </Link>
            </SheetClose>
          </li>
          <li data-testid="mode-toggle-text-nav-item">
            <SheetClose asChild>
              <Button
                variant="ghost"
                className={cn(buttonVariants({ variant: 'ghost' }), 'w-full justify-start rounded-none border-b')}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" />
                    Toggle Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" />
                    Toggle Dark Mode
                  </>
                )}
              </Button>
            </SheetClose>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  )
}
