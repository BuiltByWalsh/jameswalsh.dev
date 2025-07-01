// import { render, screen } from '@testing-library/react'

// // import Projects from './___projects'
// import { projectsCollection } from './project-collection'

// describe('/projects/ProjectsPage', () => {
//   it('displays page heading', () => {
//     render(<Projects />)

//     expect(screen.getByRole('heading', { name: /things i've helped build that make me smile/i })).toBeInTheDocument()
//   })

//   it.each(projectsCollection)('renders a link card for project $title', (project) => {
//     render(<Projects />)

//     const projectLink = screen.getByText(project.externalLink.title).closest('a')
//     const projectTitle = screen.getByText(new RegExp(project.title.toLowerCase(), 'i'))
//     const projectDescription = screen.getByText(project.description)
//     const projectImageIcon = screen.getByAltText(`Project logo for ${project.title}`)

//     expect(projectLink).toHaveAttribute('href', project.externalLink.href)
//     expect(projectTitle).toBeInTheDocument()
//     expect(projectDescription).toBeInTheDocument()
//     expect(projectImageIcon).toBeInTheDocument()
//   })
// })
