import nextVitals from 'eslint-config-next/core-web-vitals'
import importPlugin from 'eslint-plugin-import'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

const files = ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}']

const eslintConfig = [
  ...nextVitals,
  {
    files,
    rules: {
      ...importPlugin.flatConfigs.recommended.rules,
      ...importPlugin.flatConfigs.typescript.rules,
    },
  },
  prettierRecommended,
  {
    files,
    rules: {
      'import/no-cycle': [2, { maxDepth: 2 }],
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        },
      ],
      'import/no-named-as-default': 0,
      'import/no-unresolved': [
        'error',
        {
          ignore: ['geist/font/.+'], // @see https://nextjs.org/docs/app/building-your-application/optimizing/fonts
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
  {
    ignores: [
      '.next/',
      '.vscode/',
      'coverage/',
      'next-env.d.ts',
      'node_modules/',
      'playwright-report/',
      'test-results/',
      'package.json',
      'postcss.config.js',
      'pnpm-lock.yaml',
      'vercel.json',
    ],
  },
]

export default eslintConfig
