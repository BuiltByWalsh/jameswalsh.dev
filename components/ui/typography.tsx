import { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

export type TypographyProps = PropsWithChildren & React.HtmlHTMLAttributes<HTMLElement>

export function TypographyH1({ className, ...rest }: TypographyProps) {
  return <h1 className={cn('my-8 scroll-m-20 text-4xl font-extrabold lg:text-5xl', className)} {...rest} />
}

export function TypographyH2({ className, ...rest }: TypographyProps) {
  return <h2 className={cn('my-6 scroll-m-20 text-3xl font-semibold', className)} {...rest} />
}

export function TypographyH3({ className, ...rest }: TypographyProps) {
  return <h3 className={cn('my-5 scroll-m-20 text-2xl font-semibold', className)} {...rest} />
}

export function TypographyH4({ className, ...rest }: TypographyProps) {
  return <h4 className={cn('my-4 scroll-m-20 text-xl font-semibold', className)} {...rest} />
}

export function TypographyP({ className, ...rest }: TypographyProps) {
  return <p className={cn('leading-7', className)} {...rest} />
}

export function TypographyBlockquote({ className, ...rest }: TypographyProps) {
  return <blockquote className={cn('my-6 border-l-2 pl-6 italic', className)} {...rest} />
}
