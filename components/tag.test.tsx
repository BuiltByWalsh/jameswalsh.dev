import { render, screen } from '@testing-library/react'

import { Tag } from './tag'

describe('components/tag', () => {
  it.each([
    ['jessica', 'fuchsia'],
    ['ted', 'cyan'],
    ['rowan', 'blue'],
    ['james', 'violet'],
  ])(`displays tag when text='%s' with %s color`, async (text, expectedColor) => {
    render(<Tag text={text} />)

    expect(screen.getByText(`#${text}`)).toHaveClass(`bg-${expectedColor}-200`)
    expect(screen.getByText(`#${text}`)).toHaveClass(`dark:bg-${expectedColor}-900/50`)
  })

  // cspell:disable-next-line
  it.each(['theo', 'THEO', 'tHeO'])('always displays the same color for the same text (%s)', (text) => {
    render(<Tag text={text} />)
    expect(screen.getByText(`#${text}`)).toHaveClass(`bg-blue-200`)
    expect(screen.getByText(`#${text}`)).toHaveClass(`bg-blue-200 dark:bg-blue-900/50`)
  })
})
