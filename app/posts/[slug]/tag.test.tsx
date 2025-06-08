import { render, screen } from '@testing-library/react'

import { Tag } from './tag'

describe('posts/[slug]/tag', () => {
  it.each([
    ['jessica', 'blue'],
    ['ted', 'fuchsia'],
    ['rowan', 'violet'],
    ['james', 'emerald'],
  ])(`displays tag when text='%s' with %s color`, async (text, expectedColor) => {
    render(<Tag text={text} />)

    expect(screen.getByText(`#${text}`)).toHaveClass(`bg-${expectedColor}-900`)
  })

  // cspell:disable-next-line
  it.each(['theo', 'THEO', 'tHeO'])('always displays the same color for the same text (%s)', (text) => {
    render(<Tag text={text} />)
    expect(screen.getByText(`#${text}`)).toHaveClass(`bg-emerald-900`)
  })
})
