import { render, screen } from '@testing-library/react'

import Footer, { socialLinks } from './footer'

import { SITE_NAVIGATIONAL_ITEMS } from '@/lib/constants'

describe('components/app-shell/footer', () => {
  it.each(socialLinks)('displays a social link for $name', ({ ariaLabel, href }) => {
    render(<Footer />)
    const socialLink = screen.getByRole('link', { name: ariaLabel })

    expect(socialLink).toBeInTheDocument()
    expect(socialLink).toHaveAttribute('href', href)
  })

  it.each(SITE_NAVIGATIONAL_ITEMS)('displays a site navigation item for $href', ({ href, value }) => {
    render(<Footer />)

    const siteNavItem = screen.getByRole('link', { name: value })

    expect(siteNavItem).toBeInTheDocument()
    expect(siteNavItem).toHaveAttribute('href', href)
  })

  it('displays copyright timestamp', () => {
    render(<Footer />)

    expect(screen.getByText(/© 2025 James Walsh/i)).toBeInTheDocument()
  })
})
