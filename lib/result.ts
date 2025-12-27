export const ResultError = {
  INVALID: 'Invalid request',
  NOT_FOUND: 'Not found',
  SYSTEM_FAILURE: 'Something went wrong',
} as const

export type ResultError = (typeof ResultError)[keyof typeof ResultError]
