import { cva } from 'class-variance-authority'

import { Badge } from '@/components/ui/badge'

const tagVariants = cva('font-semibold cursor-default border-2 h-6 rounded-sm', {
  variants: {
    variant: {
      blue: 'bg-blue-200 border-blue-400 text-blue-700 dark:bg-blue-900/50 dark:border-blue-800 dark:text-blue-300',
      fuchsia:
        'bg-fuchsia-200 border-fuchsia-400 text-fuchsia-700 dark:bg-fuchsia-900/50 dark:border-fuchsia-800 dark:text-fuchsia-300',
      violet:
        'bg-violet-200 border-violet-400 text-violet-700 dark:bg-violet-900/50 dark:border-violet-800 dark:text-violet-300',
      emerald:
        'bg-emerald-200 border-emerald-400 text-emerald-700 dark:bg-emerald-900/50 dark:border-emerald-800 dark:text-emerald-300',
      cyan: 'bg-cyan-200 border-cyan-400 text-cyan-700 dark:bg-cyan-900/50 dark:border-cyan-800 dark:text-cyan-300',
    },
  },
})
const COLOR_OPTS: TagColorOptions[] = ['emerald', 'fuchsia', 'blue', 'violet', 'cyan']

type TagColorOptions = 'blue' | 'fuchsia' | 'violet' | 'emerald' | 'cyan'

interface TagProps {
  text: string
}

export function Tag({ text }: TagProps) {
  const convertTextToColorVariant = (str: string) => COLOR_OPTS[hashString(str) % COLOR_OPTS.length]

  return (
    <Badge variant="outline" className={tagVariants({ variant: convertTextToColorVariant(text) })}>
      #{text}
    </Badge>
  )
}

function hashString(str: string): number {
  return str
    .toLowerCase()
    .split('')
    .reduce((hash, char) => {
      const charCode = char.charCodeAt(0)
      return ((hash << 5) + hash + charCode) >>> 0
    }, 5381)
}
