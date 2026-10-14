import '@testing-library/jest-dom'

beforeEach(() => {
  global.fetch = vi.fn()
})
