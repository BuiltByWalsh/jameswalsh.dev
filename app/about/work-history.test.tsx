import { render, screen, act, within } from '@testing-library/react'

import WorkflowHistory, { type CVItem, cvItems } from './work-history'

const mockPresentYear = 2024

describe('about/WorkHistory', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(mockPresentYear, 0, 1))
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it.each(['SchoolAI', 'Tomo', 'Vasion', 'Podium', 'Pluralsight', 'Maersk'])(
    'displays logo images for %s',
    (companyName: string) => {
      render(<WorkflowHistory />)

      act(() => screen.getByRole('button', { name: /view work history/i }).click())

      expect(screen.getByAltText(`${companyName} company logo`)).toBeInTheDocument()
    },
  )

  it.each(cvItems)('displays work history for $company', ({ company, role, startDate, endDate }: CVItem) => {
    const dataTestId = `${company.toLowerCase()}-cv-item`
    render(<WorkflowHistory />)

    act(() => screen.getByRole('button', { name: /view work history/i }).click())

    const workListItem = screen.getByTestId(dataTestId)
    const expectedEndDate = endDate === 'Present' ? mockPresentYear.toString() : endDate

    expect(workListItem).toBeInTheDocument()
    expect(workListItem).toHaveTextContent(company)
    expect(workListItem).toHaveTextContent(role)
    expect(within(workListItem).getAllByRole('time')[0]).toHaveAttribute('datetime', startDate)
    expect(within(workListItem).getAllByRole('time')[1]).toHaveAttribute('datetime', expectedEndDate)
  })

  it('allows a user to download CV', () => {
    render(<WorkflowHistory />)

    act(() => screen.getByRole('button', { name: /view work history/i }).click())

    const cvLink = screen.getByRole('link')

    expect(cvLink).toBeInTheDocument()
    expect(cvLink).toHaveTextContent(/download cv/i)
    expect(cvLink).toHaveAttribute('href', 'resume.pdf')
  })
})
