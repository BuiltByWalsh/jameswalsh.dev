import { render, screen } from '@testing-library/react'
import * as dateFns from 'date-fns'

import TimeInformation from './time-information'

import * as utils from '@/lib/utils'

vi.mock('@/lib/utils')
vi.mock('date-fns')

describe('posts/[slug]/time-information', () => {
  const metadata = { source: 'The quick fox jumped.', publishedAt: '2019-08-29' }

  beforeEach(() => {
    vi.mocked(dateFns.formatDistanceToNow)
    vi.mocked(utils.calculateTimeToRead)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders timestamp as a semantic time element', () => {
    render(<TimeInformation metadata={metadata} />)

    expect(screen.getByRole('time')).toBeInTheDocument()
    expect(screen.getByRole('time')).toHaveAttribute('datetime', metadata.publishedAt)
  })

  it('calls formatDistanceToNow with publishedAt timestamp', () => {
    render(<TimeInformation metadata={metadata} />)

    expect(dateFns.formatDistanceToNow).toHaveBeenCalledTimes(1)
    expect(dateFns.formatDistanceToNow).toHaveBeenCalledWith(new Date(metadata.publishedAt))
  })

  it('calls calculateTimeToRead with post source content', () => {
    render(<TimeInformation metadata={metadata} />)

    expect(utils.calculateTimeToRead).toHaveBeenCalledTimes(1)
    expect(utils.calculateTimeToRead).toHaveBeenCalledWith(metadata.source)
  })
})
