import { render, screen, fireEvent } from '@testing-library/react'
import DeleteTask from '../components/Modals/DeleteTask'
import { Context } from '../libs/Store'
import { ACTION_TYPES } from '../libs/Reducer'
import { archiveTask, deleteTask } from '../services/task'

jest.mock('../services/task', () => ({
  archiveTask: jest.fn(),
  deleteTask: jest.fn(),
}))

const renderComponent = (state, dispatch) => {
  return render(
    <Context.Provider value={[state, dispatch]}>
      <DeleteTask />
    </Context.Provider>
  )
}

describe('<Modals.DeleteTask />', () => {
  const initialState = {
    showDeleteTaskModal: true,
    deleteTaskData: { id: 1, title: 'Test Task' },
    deleteTaskStatus: '',
    archiveTaskStatus: '',
  };
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear()
    archiveTask.mockClear()
    deleteTask.mockClear()
  })

  test('Renders the modal with correct task title', () => {
    renderComponent(initialState, dispatch)

    const modal = screen.getByTestId('delete-task-modal')
    expect(modal).toBeInTheDocument()
    expect(screen.getByText(/Are you sure you want to delete task/i)).toBeInTheDocument()
    expect(screen.getByText(/"Test Task"/i)).toBeInTheDocument()
  });

  test('Closes the modal when close button is clicked', () => {
    renderComponent(initialState, dispatch)

    const closeButton = screen.getByTestId('close-delete-task-modal-button')
    fireEvent.click(closeButton)

    expect(dispatch).toHaveBeenCalledWith({
      type: ACTION_TYPES.SHOW_DELETE_TASK_POPUP,
      payload: { visible: false, deleteTaskData: {} },
    })
  })

  test('Calls archiveTask when "Archive" button is clicked', () => {
    renderComponent(initialState, dispatch)

    const archiveButton = screen.getByText(/Archive/i)
    fireEvent.click(archiveButton)

    expect(archiveTask).toHaveBeenCalledWith({ id: 1, archive: true }, dispatch)
  })

  test('Calls deleteTask when "Permanently Delete" button is clicked', () => {
    renderComponent(initialState, dispatch);

    const deleteButton = screen.getByText(/Permanently Delete/i)
    fireEvent.click(deleteButton)

    expect(deleteTask).toHaveBeenCalledWith({ id: 1 }, dispatch)
  })

  test('Disables buttons when task is loading', () => {
    const loadingState = {
      ...initialState,
      deleteTaskStatus: 'loading',
    }

    renderComponent(loadingState, dispatch)

    const archiveButton = screen.getByText(/Archive/i)
    const deleteButton = screen.getByText(/Permanently Delete/i)

    expect(archiveButton).toBeDisabled()
    expect(deleteButton).toBeDisabled()
  })
})
