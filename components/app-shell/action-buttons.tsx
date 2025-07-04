'use client'

import { Moon, RssIcon, Sun } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function ModeToggleButton() {
  const { setTheme, resolvedTheme } = useTheme()

  const handleToggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={250}>
        <TooltipTrigger asChild>
          <Button variant="ghost" onClick={handleToggleTheme} className="size-5 !p-5">
            <Moon className="fixed size-5 scale-100 dark:scale-0" />
            <Sun className="fixed size-5 scale-0 dark:scale-100" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{resolvedTheme === 'light' ? 'Toggle dark mode' : 'Toggle light mode'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function RssFeedButton() {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={250}>
        <TooltipTrigger asChild>
          <Button asChild variant="ghost" className="size-5 !p-5">
            <Link href="/rss.xml">
              <RssIcon className="size-5" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Get the RSS Feed</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
