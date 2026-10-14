import { render, screen } from '@testing-library/react'

import { SITE_NAVIGATIONAL_ITEMS } from '@/lib/constants'

import Footer, { socialLinks } from './footer'

describe('components/app-shell/footer', () => {
  it.each(socialLinks)('displays a social link for $name', ({ ariaLabel, href }) => {
    render(<Footer />)
    const socialLink = screen.getByRole('link', { name: ariaLabel })

    expect(socialLink).toBeInTheDocument()
    expect(socialLink).toHaveAttribute('href', href)
  })

  it.each(SITE_NAVIGATIONAL_ITEMS)(
    'displays a site navigation item for $href',
    ({ href, value }) => {
      render(<Footer />)

      const siteNavItem = screen.getByRole('link', { name: value })

      expect(siteNavItem).toBeInTheDocument()
      expect(siteNavItem).toHaveAttribute('href', href)
    },
  )

  describe('copyright', () => {
    beforeEach(() => {
      vi.useFakeTimers({ toFake: ['Date'] })
      vi.setSystemTime(new Date(2031, 5, 15))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('displays the current year', () => {
      render(<Footer />)

      expect(screen.getByText(/2031 James Walsh/i)).toBeInTheDocument()
    })
  })
})
