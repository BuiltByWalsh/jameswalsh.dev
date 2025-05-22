import '@testing-library/jest-dom'

import { MOCK_NEXT_PUBLIC_POSTHOG_KEY } from './mocks/constants'

vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', MOCK_NEXT_PUBLIC_POSTHOG_KEY)

beforeEach(() => {
  global.fetch = vi.fn()
})
