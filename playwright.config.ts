import { defineConfig, devices } from '@playwright/test'

const PORT = 3000
const BASE_URL = `http://127.0.0.1:${PORT}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'line',
  webServer: {
    command: process.env.CI ? 'pnpm preview' : 'pnpm dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: BASE_URL,
    trace: 'retry-with-trace',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // ? As of Feb 7, 2024 testing against mobile browsers in github actions is too slow. Locally it's encouraged.
    ...(process.env.CI
      ? []
      : [
          {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
          },
          {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 13'] },
          },
        ]),
  ],
})
