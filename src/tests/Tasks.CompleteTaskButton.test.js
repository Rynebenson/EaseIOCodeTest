import { render, screen, fireEvent } from "@testing-library/react"
import CompleteTaskButton from "../components/Tasks/CompleteTaskButton"
import { Context } from "../libs/Store"
import { updateTask } from "../services/task"

// Mock the updateTask service
jest.mock("../services/task")

describe("CompleteTaskButton", () => {
  const dispatch = jest.fn()
  
  const renderComponent = (props) => {
    return render(
      <Context.Provider value={[{}, dispatch]}>
        <CompleteTaskButton {...props} />
      </Context.Provider>
    )
  }

  it("Renders a button", () => {
    renderComponent({ id: 1, completed: false })
    const button = screen.getByTestId("task-1-button")
    expect(button).toBeInTheDocument()
  })

  it("Shows the check icon when the task is completed", () => {
    renderComponent({ id: 1, completed: true })
    const checkIcon = screen.getByTestId("task-1-button").querySelector("svg")
    expect(checkIcon).toBeInTheDocument()
  })

  it("Does not show the check icon when the task is not completed", () => {
    renderComponent({ id: 1, completed: false })
    const checkIcon = screen.getByTestId("task-1-button").querySelector("svg")
    expect(checkIcon).toBeNull()
  })

  it("Has correct class when task is completed", () => {
    renderComponent({ id: 1, completed: true })
    const button = screen.getByTestId("task-1-button")
    expect(button).toHaveClass("bg-blue-600 text-white")
  })

  it("Has correct class when task is not completed", () => {
    renderComponent({ id: 1, completed: false })
    const button = screen.getByTestId("task-1-button")
    expect(button).not.toHaveClass("bg-blue-600 text-white")
  })

  it("Toggles task completion on button click", () => {
    renderComponent({ id: 1, completed: false })
    const button = screen.getByTestId("task-1-button")
    fireEvent.click(button)

    expect(updateTask).toHaveBeenCalledWith(
      { id: 1, completed: true },
      dispatch
    )
  })
})