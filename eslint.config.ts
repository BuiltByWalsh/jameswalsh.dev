import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ),
  {
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
    ignores: [
      '.next',
      '.vscode/',
      'node_modules/',
      'package.json',
      'postcss.config.js',
      'pnpm-lock.yaml',
      'vercel.json',
    ],
  },
]

export default eslintConfig
