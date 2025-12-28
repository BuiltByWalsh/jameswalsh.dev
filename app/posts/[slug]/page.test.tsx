import { render, screen } from '@testing-library/react'
import * as dateFns from 'date-fns'
import * as dateFnsFormat from 'date-fns/format'
import { err, ok } from 'neverthrow'
import type { PropsWithChildren } from 'react'

import PostPage, { generateMetadata, generateStaticParams } from './page'

import { JAMES_WALSH, PRODUCTION_URL } from '@/lib/constants'
import { ResultError } from '@/lib/result'
import { getAllPublishedPosts, getPost, getPreviousPost } from '@/services/post'
import { getMockPost } from '@/test/mocks/post'

vi.mock('@/services/post')
vi.mock('./mdx-content', () => ({
  __esModule: true,
  default: vi.fn(({ children }: PropsWithChildren) => <div>{children}</div>),
}))
vi.mock('date-fns')
vi.mock('date-fns/format')

describe('posts/[slug]/PostPage', () => {
  const mockSlug = 'my-slug'
  const tags = ['typescript', 'javascript', 'nextjs', 'ssr', 'ssg']
  const mockPost = getMockPost({
    slug: mockSlug,
    title: 'How to win friends & influence people',
    publishedAt: '2024-10-31',
    tags,
  })

  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders H1 for blog post', async () => {
    vi.mocked(getPost).mockResolvedValue(ok(mockPost))
    vi.mocked(getPreviousPost).mockResolvedValue(ok(undefined))

    render(await PostPage({ params: Promise.resolve({ slug: mockSlug }) }))

    expect(screen.getByRole('heading', { name: mockPost.title })).toBeInTheDocument()
  })

  it('renders the blog thumbnail image', async () => {
    vi.mocked(getPost).mockResolvedValue(ok(mockPost))
    vi.mocked(getPreviousPost).mockResolvedValue(ok(undefined))

    render(await PostPage({ params: Promise.resolve({ slug: mockSlug }) }))
    const articleImage = screen.getByAltText('Article cover image')
    const encodedThumbnailSrc = encodeURIComponent(mockPost.thumbnail)

    expect(articleImage).toBeInTheDocument()
    expect(articleImage.getAttribute('src')).toContain(encodedThumbnailSrc)
  })

  it('renders all the blog tags', async () => {
    vi.mocked(getPost).mockResolvedValue(ok(mockPost))
    vi.mocked(getPreviousPost).mockResolvedValue(ok(undefined))

    render(await PostPage({ params: Promise.resolve({ slug: mockSlug }) }))

    tags.forEach((tag) => {
      expect(screen.getByText(`#${tag}`)).toBeInTheDocument()
    })
  })

  it('renders blog time information', async () => {
    vi.mocked(dateFns.formatDistanceToNow).mockReturnValue('1 month')
    vi.mocked(dateFnsFormat.formatDate).mockReturnValue('Oct 31, 2024')
    vi.mocked(getPost).mockResolvedValue(ok(mockPost))
    vi.mocked(getPreviousPost).mockResolvedValue(ok(undefined))

    render(await PostPage({ params: Promise.resolve({ slug: mockSlug }) }))

    expect(screen.getByText('Oct 31, 2024')).toHaveAttribute('datetime', '2024-10-31')
    expect(screen.getByText(/1 min read/i)).toBeInTheDocument()
    expect(screen.getByText(/1 month ago/i)).toBeInTheDocument()
  })

  it('renders a link to all posts', async () => {
    vi.mocked(getPost).mockResolvedValue(ok(mockPost))
    vi.mocked(getPreviousPost).mockResolvedValue(ok(undefined))

    render(await PostPage({ params: Promise.resolve({ slug: mockSlug }) }))

    expect(screen.getByRole('link', { name: /all posts/i })).toBeInTheDocument()
  })

  it('renders a link to the previous blog post', async () => {
    const mockPreviousPostSlug = 'previous-post-slug'
    const mockPreviousPost = getMockPost({ slug: mockPreviousPostSlug })
    vi.mocked(getPost).mockResolvedValue(ok(mockPost))
    vi.mocked(getPreviousPost).mockResolvedValue(ok(mockPreviousPost))

    render(await PostPage({ params: Promise.resolve({ slug: mockSlug }) }))

    const linkToPreviousPost = screen.getByRole('link', { name: /next/i })

    expect(linkToPreviousPost).toBeInTheDocument()
    expect(linkToPreviousPost).toHaveAttribute('href', `/posts/${mockPreviousPost.slug}`)
  })

  describe('error cases', () => {
    it('calls notFound when no blog post can be found', async () => {
      const serializedNextNotFound = 'NEXT_HTTP_ERROR_FALLBACK;404'
      vi.mocked(getPost).mockResolvedValue(err(ResultError.NOT_FOUND))
      vi.mocked(getPreviousPost).mockResolvedValue(ok(undefined))

      await expect(() => PostPage({ params: Promise.resolve({ slug: mockSlug }) })).rejects.toThrowError(
        serializedNextNotFound,
      )
    })

    it.each([ResultError.INVALID, ResultError.SYSTEM_FAILURE])(`throws an error when result is='%s'`, async (error) => {
      vi.mocked(getPost).mockResolvedValue(err(error))
      vi.mocked(getPreviousPost).mockResolvedValue(ok(undefined))

      await expect(() => PostPage({ params: Promise.resolve({ slug: mockSlug }) })).rejects.toThrowError(error)
    })
  })

  describe('#generateMetadata', () => {
    it('generates page metadata based on current post slug', async () => {
      vi.mocked(getPost).mockResolvedValue(ok(mockPost))
      const metadata = await generateMetadata({ params: Promise.resolve({ slug: mockSlug }) })

      expect(metadata).toEqual({
        title: mockPost.title,
        description: mockPost.brief,
        publisher: JAMES_WALSH,
        creator: JAMES_WALSH,
        authors: [{ url: PRODUCTION_URL, name: JAMES_WALSH }],
        keywords: mockPost.tags,
        openGraph: {
          title: mockPost.title,
          description: mockPost.brief,
          images: [mockPost.thumbnail],
          type: 'article',
          tags: mockPost.tags,
          publishedTime: mockPost.publishedAt,
          locale: 'en_us',
        },
      })
    })

    describe('error cases', () => {
      it('calls notFound when no blog post can be found', async () => {
        const serializedNextNotFound = 'NEXT_HTTP_ERROR_FALLBACK;404'
        vi.mocked(getPost).mockResolvedValue(err(ResultError.NOT_FOUND))
        vi.mocked(getPreviousPost).mockResolvedValue(ok(undefined))

        await expect(() => generateMetadata({ params: Promise.resolve({ slug: mockSlug }) })).rejects.toThrowError(
          serializedNextNotFound,
        )
      })

      it.each([ResultError.INVALID, ResultError.SYSTEM_FAILURE])(
        `throws an error when result is='%s'`,
        async (error) => {
          vi.mocked(getPost).mockResolvedValue(err(error))
          vi.mocked(getPreviousPost).mockResolvedValue(ok(undefined))

          await expect(() => generateMetadata({ params: Promise.resolve({ slug: mockSlug }) })).rejects.toThrowError(
            error,
          )
        },
      )
    })
  })

  describe('#generateStaticParams', () => {
    it('returns all available post slugs', async () => {
      vi.mocked(getAllPublishedPosts).mockResolvedValue(
        ok([getMockPost({ slug: 'slug-1' }), getMockPost({ slug: 'slug-2' }), getMockPost({ slug: 'slug-3' })]),
      )
      const staticParams = await generateStaticParams()

      expect(staticParams).toEqual([{ slug: 'slug-1' }, { slug: 'slug-2' }, { slug: 'slug-3' }])
    })
  })
})
