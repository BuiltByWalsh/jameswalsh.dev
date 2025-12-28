import { err } from 'neverthrow'

import { ResultError, unwrapOrThrow } from './result'

describe('lib/result', () => {
  describe('#unwrapOrThrow', () => {
    it('throws next.js notFound() when result contains NOT_FOUND', () => {
      const serializedNextNotFound = 'NEXT_HTTP_ERROR_FALLBACK;404'

      expect(() => unwrapOrThrow(err(ResultError.NOT_FOUND))).toThrowError(serializedNextNotFound)
    })

    it.each([ResultError.INVALID, ResultError.SYSTEM_FAILURE])(
      `throws result error when result error='%s'`,
      (error) => {
        expect(() => unwrapOrThrow(err(error))).toThrowError(new Error(error))
      },
    )

    it('throws result error when error is generic', () => {
      const error = new Error('uncaught exception')

      expect(() => unwrapOrThrow(err(error))).toThrowError(error)
    })
  })
})
