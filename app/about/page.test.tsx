import { render, screen } from '@testing-library/react'

import AboutPage from './page'

import { GITHUB_REPO_LINK } from '@/lib/constants'

describe('about/AboutPage', () => {
  it('displays page heading', async () => {
    render(await AboutPage())

    expect(screen.getByRole('heading', { name: /hey 👋🏻 i'm james/i })).toBeInTheDocument()
  })

  it('displays bio text', async () => {
    render(await AboutPage())

    expect(screen.getByText(/i live in utah where I write software & enjoy the outdoors./i)).toBeInTheDocument()
    expect(
      screen.getByText(
        /in my free-time I love tinkering with home automations, riding my mountain bike & playing video games./i,
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /i'm a coffee nut. from espresso, french-press, to pour over, some of my favorite moments in life are looking out at a crisp morning with a hot cup in my hand./i,
      ),
    ).toBeInTheDocument()
  })

  it('displays profile image', async () => {
    render(await AboutPage())

    const profileImage = screen.getByAltText(/picture of james side profile/i)
    const encodedUriImageSrc = encodeURIComponent('/portraits/side-profile.webp')

    expect(profileImage).toBeInTheDocument()
    expect(profileImage.getAttribute('src')).toContain(encodedUriImageSrc)
  })

  it('displays Get To Know Me card', async () => {
    render(await AboutPage())

    // ? NOTE: To avoid re-testing `about-me.tsx` this should suffice.
    expect(screen.getByText(/get to know me/i)).toBeInTheDocument()
  })

  it('displays link to github repo', async () => {
    render(await AboutPage())

    expect(screen.getByRole('link', { name: /visit github/i })).toHaveAttribute('href', GITHUB_REPO_LINK)
  })

  it('displays subscribe CTA', async () => {
    render(await AboutPage())

    // TODO: should be hooked up to subscription URL via https://linear.app/jdub/issue/JDUB-29/spike-newsletter
    expect(screen.getByRole('link', { name: /subscribe/i })).toHaveAttribute('href', '/#publications')
  })

  it('displays work history', async () => {
    render(await AboutPage())

    // ? NOTE: To avoid re-testing `work-history.tsx` this should suffice.
    expect(screen.getByText(/my career/i)).toBeInTheDocument()
  })
})
