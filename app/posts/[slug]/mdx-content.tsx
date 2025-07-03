import Image, { ImageProps } from 'next/image'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import { HTMLAttributes, PropsWithChildren } from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { HighlighterCoreOptions, getSingletonHighlighter } from 'shiki'

import { TypographyBlockquote, TypographyH1, TypographyH2, TypographyH3, TypographyP } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

const components: MDXRemoteProps['components'] = {
  img: (props: HTMLAttributes<HTMLImageElement>) => (
    <Image
      {...(props as ImageProps)}
      alt="article image"
      className="my-4 aspect-video rounded-lg object-center"
      width={1600}
      height={900}
    />
  ),
  h1: (props: PropsWithChildren) => <TypographyH1 className="my-5" {...props} />,
  h2: (props: PropsWithChildren) => <TypographyH2 className="my-4" {...props} />,
  h3: (props: PropsWithChildren) => <TypographyH3 className="my-3" {...props} />,
  p: (props: PropsWithChildren) => <TypographyP className="w-prose mb-1.5" {...props} />,
  ol: (props: PropsWithChildren) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
  ul: (props: PropsWithChildren) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
  blockquote: (props: PropsWithChildren) => <TypographyBlockquote {...props} />,
  code: (props: PropsWithChildren) => (
    <code className="bg-muted relative rounded-lg px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props} />
  ),
  pre: ({ className, ...rest }: HTMLAttributes<HTMLElement>) => (
    <pre className={cn(className, 'my-5 whitespace-pre-wrap', '[&>code:nth-child(1)]:p-3')} {...rest} />
  ),
  a: (props: PropsWithChildren) => <a className="text-md text-primary p-0 underline underline-offset-2" {...props} />,
}
const options: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
          keepBackground: false,
          getHighlighter: (options: HighlighterCoreOptions) => {
            return getSingletonHighlighter({
              ...options,
              themes: ['one-dark-pro'],
              langs: ['js', 'ts', 'jsx', 'tsx', 'json', 'json5', 'shell', 'bash', 'astro', 'markdown'],
            })
          },
        },
      ],
    ],
  },
}

type MdxContentProps = {
  source: string
}

export default function MDXContent({ source }: MdxContentProps) {
  return <MDXRemote source={source} components={components} options={options} />
}
