import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig, coverageConfigDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json-summary', 'json'],
      thresholds: {
        statements: 95,
        branches: 95,
        functions: 95,
        lines: 95,
      },
      exclude: [
        'components/ui/**', // ignore shadcn directory
        'app/posthog.ts',
        'app/PostHogPageView.tsx',
        'app/tech/static-data.ts',
        './**/mdx-content.tsx', // ignore next-mdx-remote component
        '*.config.*',
        './**/constants.*',
        './test/**', // ignore all test setup files.
        ...coverageConfigDefaults.exclude,
      ],
    },
    setupFiles: './test/setup.ts',
    environment: 'happy-dom',
    exclude: ['e2e/**', 'node_modules/**', '.next/**'],
  },
})
