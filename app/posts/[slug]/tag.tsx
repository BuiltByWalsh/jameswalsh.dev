import { cva } from 'class-variance-authority'

import { Badge } from '@/components/ui/badge'

const tagVariants = cva('font-semibold cursor-default border-2 h-6', {
  variants: {
    variant: {
      blue: 'bg-blue-900 border-blue-800 text-blue-300',
      fuchsia: 'bg-fuchsia-900 border-fuchsia-800 text-fuchsia-300',
      violet: 'bg-violet-900 border-violet-800 text-violet-300',
      emerald: 'bg-emerald-900 border-emerald-800 text-emerald-300',
      cyan: 'bg-cyan-900 border-cyan-800 text-cyan-300',
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
