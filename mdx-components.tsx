import type { MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'
import type { HTMLAttributes, PropsWithChildren } from 'react'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...{
      img: (props: HTMLAttributes<HTMLImageElement>) => (
        <Image
          {...(props as ImageProps)}
          alt="article image"
          className="my-4 aspect-video rounded-lg object-center"
          width={1600}
          height={900}
        />
      ),
      h1: (props: PropsWithChildren) => <h1 className="prose my-8 text-4xl font-semibold md:my-12" {...props} />,
      h2: (props: PropsWithChildren) => <h2 className="prose my-6 text-3xl font-semibold md:my-8" {...props} />,
      h3: (props: PropsWithChildren) => <h3 className="prose my-6 text-2xl font-semibold md:my-8" {...props} />,
      p: (props: PropsWithChildren) => <h4 className="text-normal w-prose my-2 font-normal" {...props} />,
      ol: (props: PropsWithChildren) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
      ul: (props: PropsWithChildren) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
      blockquote: (props: PropsWithChildren) => <blockquote className="my-6 border-l-2 pl-6 italic" {...props} />,
      code: (props: PropsWithChildren) => (
        <code
          className="bg-muted relative rounded-lg px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
          {...props}
        />
      ),
      pre: ({ className, ...rest }: HTMLAttributes<HTMLElement>) => (
        <pre className="my-5 whitespace-pre-wrap [&>code:nth-child(1)]:p-3" {...rest} />
      ),
      a: (props: PropsWithChildren) => (
        <a className="text-md text-primary/75 p-0 underline underline-offset-2" {...props} />
      ),
    },
    ...components,
  }
}
