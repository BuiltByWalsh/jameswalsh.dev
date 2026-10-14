import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [
      'rehype-slug',
      'rehype-autolink-headings',
      ['rehype-pretty-code', { theme: 'one-dark-pro', keepBackground: false }],
    ],
  },
})

export default withMDX(nextConfig)
