import { render, screen, within } from '@testing-library/react'

import Page from './page'
import { projectsCollection, stackCollection } from './static-data'
import { TimelineTypes } from './types'

const stackCollectionKeys = Object.keys(stackCollection) as TimelineTypes[]

describe('tech/page', () => {
  describe('projects section', () => {
    it('displays page headings', () => {
      render(<Page />)

      expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument()
    })

    it.each(projectsCollection)('renders a link card for project $title', (project) => {
      render(<Page />)

      const projectLink = screen.getByText(project.externalLink.title).closest('a')
      const projectTitle = screen.getByText(new RegExp(project.title.toLowerCase(), 'i'))
      const projectDescription = screen.getByText(project.description)
      const projectImageIcon = screen.getByAltText(`Project logo for ${project.title}`)

      expect(projectLink).toHaveAttribute('href', project.externalLink.href)
      expect(projectTitle).toBeInTheDocument()
      expect(projectDescription).toBeInTheDocument()
      expect(projectImageIcon).toBeInTheDocument()
    })
  })

  describe('tech section', () => {
    it('displays page heading', () => {
      render(<Page />)

      expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument()
    })

    it.each(stackCollectionKeys)('renders a list with all content present for %s', (stackCollectionKey) => {
      render(<Page />)

      const stackKeyList = screen.getByTestId(`${stackCollectionKey}-list`)
      expect(stackKeyList).toBeInTheDocument()

      stackCollection[stackCollectionKey].forEach((item) => {
        expect(within(stackKeyList).getByRole('heading', { name: item.title })).toBeInTheDocument()
        expect(within(stackKeyList).getByAltText(`technology logo for ${item.title}`)).toBeInTheDocument()
        expect(within(stackKeyList).getByTestId(`${item.title}-text`)).toBeInTheDocument()
      })
    })
  })
})
