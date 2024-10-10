import { render, screen, fireEvent } from '@testing-library/react'
import { Context } from '../libs/Store'
import CreateTaskModal from "../components/Modals/CreateTask"
import { createTask } from '../services/task'

jest.mock('../services/task', () => ({
  createTask: jest.fn(),
}))

describe('<Modals.CreateTaskForm />', () => {
  const dispatch = jest.fn()
  
  const renderComponent = (state) => {
    return render(
      <Context.Provider value={[state, dispatch]}>
        <CreateTaskModal />
      </Context.Provider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Renders the Create Task modal when showCreateTaskModal is true', async () => {
    const initialState = {
      createTaskStatus: 'idle',
      showCreateTaskModal: true,
      tasks: []
    }

    renderComponent(initialState)

    let modal = screen.getByTestId('create-task-modal')

    expect(modal.className).toContain('opacity-100')
  })

  test('Does not render the Create Task modal when showCreateTaskModal is false', async () => {
    const initialState = {
      createTaskStatus: 'idle',
      showCreateTaskModal: false,
      tasks: []
    }

    renderComponent(initialState)

    let modal = screen.getByTestId('create-task-modal')

    expect(modal.className).toContain('opacity-0')
  })

  test('Input fields update state onChange', () => {
    const initialState = {
      createTaskStatus: 'idle',
      showCreateTaskModal: true, // Ensure the modal is visible
      tasks: []
    }
  
    renderComponent(initialState)
  
    const titleInput = screen.getByTestId('title-input')
    const dateInput = screen.getByTestId('date-input')
    const timeInput = screen.getByTestId('time-input')
    const notesInput = screen.getByTestId('notes-input')
  
    fireEvent.change(titleInput, { target: { value: 'New Task Title' } })
    fireEvent.change(dateInput, { target: { value: '2024-10-10' } })
    fireEvent.change(timeInput, { target: { value: '12:00' } })
    fireEvent.change(notesInput, { target: { value: 'These are notes for the task.' } })
  
    expect(titleInput.value).toBe('New Task Title')
    expect(dateInput.value).toBe('2024-10-10')
    expect(timeInput.value).toBe('12:00')
    expect(notesInput.value).toBe('These are notes for the task.')
  })

  test('Displays validation errors for empty and invalid fields on submit', () => {
    const initialState = {
      createTaskStatus: 'idle',
      showCreateTaskModal: true,
      tasks: []
    }
  
    renderComponent(initialState)
  
    const submitButton = screen.getByTestId('create-task-submit-button')
    fireEvent.click(submitButton)
  
    expect(screen.getByText(/title is required/i)).toBeInTheDocument()
    expect(screen.getByText(/date is required/i)).toBeInTheDocument()
    expect(screen.getByText(/time is required/i)).toBeInTheDocument()
  
    fireEvent.change(screen.getByTestId('title-input'), { target: { name: "title", value: 'T' } })
  
    fireEvent.click(submitButton)
  
    expect(screen.getByText(/Title should be 3-50 characters long and contain only letters, numbers, and spaces./i)).toBeInTheDocument()
  })

  test('Calls createTask when all fields are valid', () => {
    const initialState = {
      showCreateTaskModal: true,
      tasks: []
    }
  
    renderComponent(initialState)

    const button = screen.getByTestId('create-task-submit-button')
  
    fireEvent.change(screen.getByTestId('title-input'), { target: { name: "title", value: 'New Task' } })
    fireEvent.change(screen.getByTestId('date-input'), { target: { name: "date", value: '2024-10-10' } })
    fireEvent.change(screen.getByTestId('time-input'), { target: { name: "time", value: '12:00' } })
    fireEvent.change(screen.getByTestId('notes-input'), { target: { name: "notes", value: 'Some notes' } })
  
    fireEvent.click(button)
  
    expect(createTask).toHaveBeenCalled()
  })
})