import { render, screen } from '@testing-library/react'
import { ok } from 'neverthrow'

import PostsIndexPage from './page'

import { getAllPublishedPosts } from '@/services/post'
import { getMockPost } from '@/test/mocks/post'

vi.mock('@/services/post')

describe('posts/PostsIndexPage', () => {
  const mockPosts = [
    getMockPost({ slug: 'slug-1', title: 'Title 1', brief: 'this is brief 1', publishedAt: '2020-01-02' }),
    getMockPost({ slug: 'slug-2', title: 'Title 2', brief: 'this is brief 2', publishedAt: '2020-01-03' }),
    getMockPost({ slug: 'slug-3', title: 'Title 3', brief: 'this is brief 3', publishedAt: '2020-01-04' }),
    getMockPost({ slug: 'slug-4', title: 'Title 4', brief: 'this is brief 4', publishedAt: '2020-01-05' }),
    getMockPost({ slug: 'slug-5', title: 'Title 5', brief: 'this is brief 5', publishedAt: '2020-01-06' }),
  ]
  beforeEach(() => {
    vi.mocked(getAllPublishedPosts).mockResolvedValue(ok(mockPosts))
  })

  it('displays page heading', async () => {
    render(await PostsIndexPage())

    expect(screen.getByRole('heading', { name: /posts/i })).toBeInTheDocument()
  })

  it('displays a link card to each blog post', async () => {
    const { container } = render(await PostsIndexPage())

    mockPosts.forEach((blogPost, index) => {
      expect(container.querySelector(`a[href="/posts/${blogPost.slug}"]`)).toBeInTheDocument()
      expect(screen.getByAltText(`${blogPost.title} cover image`)).toBeInTheDocument()
      expect(screen.getByText(blogPost.title)).toBeInTheDocument()
      expect(screen.getByText(blogPost.brief)).toBeInTheDocument()
      expect(screen.getAllByRole('time')[index]).toHaveAttribute('datetime', blogPost.publishedAt)
    })

    expect(screen.getAllByText(/read more/i).length).toStrictEqual(mockPosts.length)
  })
})
