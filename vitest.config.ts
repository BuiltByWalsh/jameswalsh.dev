import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'
import { defineConfig, coverageConfigDefaults } from 'vitest/config'

export default defineConfig({
  // ? NOTE: Compiles .mdx posts in tests. Must run before the React plugin, per the MDX docs.
  plugins: [{ enforce: 'pre', ...mdx() }, react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ })],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    clearMocks: true,
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
        'app/tech/static-data.ts',
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
