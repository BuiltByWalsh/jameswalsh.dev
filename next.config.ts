import createMDX from '@next/mdx'
import { type NextConfig } from 'next'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { type HighlighterCoreOptions, getSingletonHighlighter } from 'shiki'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  transpilePackages: ['next-mdx-remote'],
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ]
  },
  // ? NOTE: This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
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
})

export default withMDX(nextConfig)
