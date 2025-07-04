import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { useTheme } from 'next-themes'

import { ModeToggleButton, RssFeedButton } from './action-buttons'

const mockSetTheme = vi.fn()

vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
  setTheme: vi.fn(),
}))

describe('components/app-shell/action-buttons', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('#ModeToggleButton', () => {
    it.each([
      ['light', 'dark'],
      ['dark', 'light'],
    ])('calls setTheme with $expected when $input option is clicked', async (currentTheme, expectedNewTheme) => {
      vi.mocked(useTheme).mockReturnValue({
        resolvedTheme: currentTheme,
        setTheme: mockSetTheme,
        themes: ['light', 'dark', 'system'],
      })

      const user = userEvent.setup()
      render(<ModeToggleButton />)
      await user.click(screen.getByRole('button'))

      expect(mockSetTheme).toHaveBeenCalledOnce()
      expect(mockSetTheme).toHaveBeenCalledWith(expectedNewTheme)
    })
  })

  describe('#RssFeedButton', () => {
    it('renders a link to the rss feed route', () => {
      render(<RssFeedButton />)

      expect(screen.getByRole('link')).toHaveAttribute('href', '/rss.xml')
    })
  })
})
