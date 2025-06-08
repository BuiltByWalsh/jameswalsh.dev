import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { useTheme } from 'next-themes'
import RSS from 'rss'

import { MobileMenu } from './mobile-menu'

import { SITE_MAP_CATEGORIES } from '@/app/rss.xml/constants'
import { EMAIL, JAMES_WALSH, PRODUCTION_URL, SITE_DESCRIPTION } from '@/lib/constants'

const mockSetTheme = vi.fn()

vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}))
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}))

const server = setupServer(
  http.get('/rss.xml', () => {
    return HttpResponse.xml(
      new RSS({
        title: JAMES_WALSH,
        description: SITE_DESCRIPTION,
        site_url: PRODUCTION_URL,
        feed_url: `${PRODUCTION_URL}/feed.xml`,
        copyright: `${new Date().getFullYear()} ${JAMES_WALSH}}`,
        managingEditor: EMAIL,
        webMaster: EMAIL,
        language: 'en-us',
        pubDate: new Date(),
        categories: SITE_MAP_CATEGORIES,
      }).xml({ indent: true }),
    )
  }),
)

describe('components/app-shell/MobileMenu', () => {
  beforeAll(() => server.listen())

  beforeEach(() => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      themes: ['light', 'dark', 'system'],
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    server.resetHandlers()
  })

  afterAll(() => server.close())

  it('renders the mobile menu as a sheet', () => {
    render(<MobileMenu />)
    expect(screen.getByTestId('mobile-menu-trigger')).toBeInTheDocument()
  })

  it.each([
    { dataTestId: 'home-nav-item', expectedText: /home/i },
    { dataTestId: 'blog-nav-item', expectedText: /blog/i },
    { dataTestId: 'about-nav-item', expectedText: /about/i },
    { dataTestId: 'stack-nav-item', expectedText: /stack/i },
    { dataTestId: 'portfolio-nav-item', expectedText: /portfolio/i },
    { dataTestId: 'rss-feed-text-nav-item', expectedText: /get rss feed/i },
    { dataTestId: 'mode-toggle-text-nav-item', expectedText: /toggle light mode|toggle dark mode/i },
  ])('displays nav item for $expectedText', async ({ dataTestId, expectedText }) => {
    const user = userEvent.setup()
    render(<MobileMenu />)

    await user.click(screen.getByTestId('mobile-menu-trigger'))

    expect(screen.getByRole('dialog')).toBeVisible()
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument()
    expect(screen.getByText(expectedText)).toBeInTheDocument()

    await user.click(screen.getByText(expectedText))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it.each([
    { currentTheme: 'light', expectedText: /toggle dark mode/i, expectedNewTheme: 'dark' },
    { currentTheme: 'dark', expectedText: /toggle light mode/i, expectedNewTheme: 'light' },
  ])(
    'user can select $expectedText when current theme is $currentTheme',
    async ({ currentTheme, expectedText, expectedNewTheme }) => {
      vi.mocked(useTheme).mockReturnValue({
        theme: currentTheme,
        setTheme: mockSetTheme,
        themes: ['light', 'dark', 'system'],
      })
      const user = userEvent.setup()
      render(<MobileMenu />)

      await user.click(screen.getByTestId('mobile-menu-trigger'))
      await user.click(screen.getByText(expectedText))

      expect(mockSetTheme).toHaveBeenCalledOnce()
      expect(mockSetTheme).toHaveBeenCalledWith(expectedNewTheme)
    },
  )
})
