import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { useTheme } from 'next-themes'

import { ModeToggleMenu } from './mode-toggle-menu'

const mockSetTheme = vi.fn()

vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
  setTheme: vi.fn(),
}))

describe('components/app-shell/ModeToggleMenu', () => {
  beforeEach(() => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      themes: ['light', 'dark', 'system'],
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('displays a dropdown menu with light, dark, and system options', async () => {
    const user = userEvent.setup()
    render(<ModeToggleMenu />)
    await user.click(screen.getByRole('button'))
    await waitFor(() => {
      screen.getByRole('menu')
    })

    expect(screen.getByRole('menuitem', { name: /light/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /dark/i })).toBeInTheDocument()
  })

  it.each([
    { input: /dark/i, expected: 'dark' },
    { input: /light/i, expected: 'light' },
    { input: /system/i, expected: 'system' },
  ])('calls setTheme with $expected when $input option is clicked', async ({ input, expected }) => {
    const user = userEvent.setup()
    render(<ModeToggleMenu />)
    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      screen.getByRole('menu')
    })

    await user.click(screen.getByRole('menuitem', { name: input }))

    expect(mockSetTheme).toHaveBeenCalledOnce()
    expect(mockSetTheme).toHaveBeenCalledWith(expected)
  })
})
