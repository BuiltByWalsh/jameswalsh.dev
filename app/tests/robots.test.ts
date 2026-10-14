import { PRODUCTION_URL } from '@/lib/constants'

import robots from '../robots'

describe('robots', () => {
  it('contains desired robots metadata', () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/drafts/',
      },
      sitemap: `${PRODUCTION_URL}/sitemap.xml`,
    })
  })
})
