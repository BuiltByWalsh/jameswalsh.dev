import '@testing-library/jest-dom/vitest'

beforeEach(() => {
  global.fetch = vi.fn()
})
