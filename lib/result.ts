import { Result } from 'neverthrow'
import { notFound } from 'next/navigation'

export const ResultError = {
  INVALID: 'Invalid request',
  NOT_FOUND: 'Not found',
  SYSTEM_FAILURE: 'Something went wrong',
} as const

export type ResultError = (typeof ResultError)[keyof typeof ResultError]

/**
 * Unwraps a Result inside an RSC.
 * If it's an Err with the code 'NOT_FOUND', it triggers Next.js `notFound()`.
 * For other Errs, it throws a standard error for error.tsx boundaries.
 * @remarks useful to reduce duplication of effort in RSC. Discouraged outside of RSC.
 */
export function unwrapOrThrow<T, E>(result: Result<T, E>): T {
  return result.match(
    (value) => value,
    (error) => {
      if (error === ResultError.NOT_FOUND) {
        notFound() // This throws an internal Next.js error
      }

      // Fallback for other error types
      throw error instanceof Error ? error : new Error(String(error))
    },
  )
}
