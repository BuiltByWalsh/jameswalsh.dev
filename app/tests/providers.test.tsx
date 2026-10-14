import { render } from '@testing-library/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { ThemeProvider } from '../providers'

vi.mock('next-themes', () => ({
  ThemeProvider: vi.fn<typeof import('next-themes').ThemeProvider>(),
}))

const TestComponent = () => {
  return <div>Test Child Component</div>
}

describe('providers', () => {
  describe('ThemeProvider', () => {
    it('wraps child props in the NextThemesProvider', () => {
      vi.mocked(NextThemesProvider)

      render(<ThemeProvider>{<TestComponent />}</ThemeProvider>)
      expect(NextThemesProvider).toHaveBeenCalledOnce()
    })
  })
})
