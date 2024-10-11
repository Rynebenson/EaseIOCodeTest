import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TasksNavigation from '../components/Tasks/TasksNavigation'

describe('<Tasks.Navigation />', () => {
  it('Renders the task counts correctly based on props', () => {
    const mockCounts = {
      all: 3,
      open: 2,
      completed: 1,
      archived: 0,
    }

    render(
      <MemoryRouter>
        <TasksNavigation filter="/" counts={mockCounts} />
      </MemoryRouter>
    )

    expect(screen.getByTestId('all-navigation-tab')).toBeInTheDocument()
    expect(screen.getByTestId('all-count-container')).toHaveTextContent(mockCounts.all.toString())

    expect(screen.getByTestId('open-navigation-tab')).toBeInTheDocument()
    expect(screen.getByTestId('open-count-container')).toHaveTextContent(mockCounts.open.toString())

    expect(screen.getByTestId('completed-navigation-tab')).toBeInTheDocument()
    expect(screen.getByTestId('completed-count-container')).toHaveTextContent(mockCounts.completed.toString())

    expect(screen.getByTestId('archived-navigation-tab')).toBeInTheDocument()
    expect(screen.getByTestId('archived-count-container')).toHaveTextContent(mockCounts.archived.toString())
  })

  it('Applies the correct class names based on the current filter', () => {
    const mockCounts = {
      all: 3,
      open: 2,
      completed: 1,
      archived: 0,
    }

    render(
      <MemoryRouter initialEntries={['/']}>
        <TasksNavigation filter="" counts={mockCounts} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('all-navigation-tab')).toHaveClass('text-blue-600')
  })
})