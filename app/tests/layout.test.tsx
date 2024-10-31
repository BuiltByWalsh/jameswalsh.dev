import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

import RootLayout from '../layout'

vi.mock('geist/font/mono', () => ({
  GeistMono: vi.fn(() => ({
    variable: '--geist-font-sans ',
  })),
}))
vi.mock('geist/font/sans', () => ({
  GeistSans: vi.fn(() => ({
    variable: '--geist-font-sans ',
  })),
}))
vi.mock('next/navigation', () => ({
  ...vi.importActual('next/navigation'),
  usePathname: vi.fn(),
}))
vi.mock('../providers', () => ({
  AnalyticsProvider: ({ children }: PropsWithChildren) => children,
}))
vi.mock('../PostHogPageView', () => ({
  default: (_props: unknown) => null,
}))

const TestComponent = () => {
  return <div>Hello World</div>
}

describe('RootLayout', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValueOnce('/')
  })

  it('displays the TopNavBar', async () => {
    render(await RootLayout({ children: <TestComponent /> }))

    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('displays the footer', async () => {
    render(await RootLayout({ children: <TestComponent /> }))

    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('includes ahrefs site verification', async () => {
    const { container } = render(await RootLayout({ children: <TestComponent /> }))

    expect(container.querySelector('meta[name="ahrefs-site-verification"]')).toBeInTheDocument()
  })
})
