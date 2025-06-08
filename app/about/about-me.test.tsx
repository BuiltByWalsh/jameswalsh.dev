import { act, render, screen } from '@testing-library/react'

import AboutMe from './about-me'

describe('about/AboutMe', () => {
  it('displays an accordion', () => {
    render(<AboutMe />)

    expect(screen.getByText(/who i am/i)).toBeInTheDocument()
    expect(screen.getByText(/how i got started/i)).toBeInTheDocument()
    expect(screen.getByText(/today/i)).toBeInTheDocument()
  })

  it.each([
    ['Who I Am', /growing up i was drawn/i],
    ['How I Got Started', /in summer 2014/i],
    ['Today', /today i'm a seasoned/i],
  ])('clicks on accordion displays content for %s', async (text, expectedContent) => {
    const textSelector = new RegExp(text.toLowerCase(), 'i')

    render(<AboutMe />)

    await act(() => screen.getByRole('button', { name: textSelector }).click())

    expect(screen.getByText(expectedContent)).toBeInTheDocument()
  })
})
