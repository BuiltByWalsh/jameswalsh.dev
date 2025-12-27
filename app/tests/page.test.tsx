import { render, screen } from '@testing-library/react'

import HomePage from '../page'

import { getAllPublishedPosts } from '@/services/post'
import { getMockPost } from '@/test/mocks/post'

vi.mock('@/services/post', () => ({
  getAllPublishedPosts: vi.fn().mockResolvedValue([]),
}))

describe('HomePage', () => {
  it('displays page heading', async () => {
    render(await HomePage())

    expect(screen.getByRole('heading', { name: /james walsh/i })).toBeInTheDocument()
  })

  it('displays intro text', async () => {
    render(await HomePage())

    const expectedText = /i'm a full-stack, front-end focused web developer interested in frameworks like/i
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })

  it('renders blog post cards', async () => {
    const mockPosts = [
      getMockPost({ slug: 'slug-1', title: 'Title 1', brief: 'this is brief 1', publishedAt: '2020-01-02' }),
      getMockPost({ slug: 'slug-2', title: 'Title 2', brief: 'this is brief 2', publishedAt: '2020-01-03' }),
      getMockPost({ slug: 'slug-3', title: 'Title 3', brief: 'this is brief 3', publishedAt: '2020-01-04' }),
      getMockPost({ slug: 'slug-4', title: 'Title 4', brief: 'this is brief 4', publishedAt: '2020-01-05' }),
      getMockPost({ slug: 'slug-5', title: 'Title 5', brief: 'this is brief 5', publishedAt: '2020-01-06' }),
    ]
    vi.mocked(getAllPublishedPosts).mockResolvedValue(mockPosts)

    const { container } = render(await HomePage())

    mockPosts.forEach((blogPost, index) => {
      expect(container.querySelector(`a[href="/posts/${blogPost.slug}"]`)).toBeInTheDocument()
      expect(screen.getByText(blogPost.title)).toBeInTheDocument()
      expect(screen.getByText(blogPost.brief)).toBeInTheDocument()
    })

    expect(screen.getAllByText(/read more/i).length).toStrictEqual(mockPosts.length)
  })
})
