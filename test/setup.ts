import '@testing-library/jest-dom/vitest'

// ? NOTE: `server-only` throws outside Next's React Server Components build, so stub it for unit tests.
vi.mock('server-only', () => ({}))

beforeEach(() => {
  global.fetch = vi.fn()
})
