import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'

import { TopNavbar } from './top-nav'

import { SITE_NAVIGATIONAL_ITEMS } from '@/lib/constants'

vi.mock('next/navigation', () => ({
  ...vi.importActual('next/navigation'),
  usePathname: vi.fn(),
}))

describe('components/app-shell/top-nav', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it.each(SITE_NAVIGATIONAL_ITEMS)('displays active state for navigation item $href', ({ href, value }) => {
    vi.mocked(usePathname).mockReturnValueOnce(href)

    render(<TopNavbar />)

    const siteNavItem = screen.getByRole('link', { name: new RegExp(`/ ${value}`, 'i') })

    expect(siteNavItem).toBeInTheDocument()
    expect(siteNavItem).toHaveAttribute('href', href)
    expect(siteNavItem).toHaveClass('border-b-2')
  })

  it('displays a nav item with a tooltip for /rss.xml', () => {
    vi.mocked(usePathname).mockReturnValueOnce('/')

    render(<TopNavbar />)

    const rssFeedNavItem = screen.getByTestId('rss-feed-nav-item')
    expect(rssFeedNavItem).toBeInTheDocument()
  })

  it('displays a mode toggle menu', () => {
    vi.mocked(usePathname).mockReturnValueOnce('/')

    render(<TopNavbar />)

    const modeToggle = screen.getByTestId('mode-toggle-menu')
    expect(modeToggle).toBeInTheDocument()
  })
})
