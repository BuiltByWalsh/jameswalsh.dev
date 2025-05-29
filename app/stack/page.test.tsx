import { render, screen, within } from '@testing-library/react'

import StackPage from './page'
import { stackCollection } from './stack-collection'
import { TimelineTypes } from './types'

const stackCollectionKeys = Object.keys(stackCollection) as TimelineTypes[]

describe('stack/StackPage', () => {
  it('displays page heading', () => {
    render(<StackPage />)

    expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument()
  })

  it.each(stackCollectionKeys)('renders a list with all content present for %s', (stackCollectionKey) => {
    render(<StackPage />)
    const stackKeyList = screen.getByTestId(`${stackCollectionKey}-list`)
    expect(stackKeyList).toBeInTheDocument()

    stackCollection[stackCollectionKey].forEach((item) => {
      expect(within(stackKeyList).getByRole('heading', { name: item.title })).toBeInTheDocument()
      expect(within(stackKeyList).getByAltText(`technology logo for ${item.title}`)).toBeInTheDocument()
      expect(within(stackKeyList).getByTestId(`${item.title}-text`)).toBeInTheDocument()
    })
  })
})
