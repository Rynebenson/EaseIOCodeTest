import _ from "lodash"
import { useCallback, useContext, useEffect, useState } from "react"
import { ACTION_TYPES } from "../../libs/Reducer"
import { Context } from "../..//libs/Store"
import { createTask } from "../../services/task"
import Wrapper from "./Wrapper"
import Tasks from "../Tasks"

export default function CreateTask() {
  const [state, dispatch] = useContext(Context)
  const [task, setTask] = useState({ title: "", notes: "", date: "", time: "", completed: false })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if(state.createTaskStatus === "success") {
      setTask({ title: "", notes: "", date: "", time: "", completed: false })

      dispatch({ type: ACTION_TYPES.SHOW_CREATE_TASK_MODAL, payload: false })
    }
  }, [state.createTaskStatus, dispatch])

  const handleClose = useCallback(() => {
    setTask({ title: "", notes: "", date: "", time: "", completed: false })

    dispatch({ type: ACTION_TYPES.SHOW_CREATE_TASK_MODAL, payload: false })
  }, [dispatch])
  
  /**
   * Update task property with given name, value
   * 
   * @param {React.FormEvent<InputEvent>} event
   * @param {String} event.target.name
   * @param {String|Date} event.target.value
   */
  const handleInputChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value })
  }

  const validateTask = () => {
    let mutableErrors = {}

    let TASK_VALIDATIONS = {
      title: {
        required: true,
        regex: /^[a-zA-Z0-9\s]{3,50}$/, // Alphanumeric, 3-50 characters
        message: "Title should be 3-50 characters long and contain only letters, numbers, and spaces."
      },
      notes: {
        required: false,
        regex: /^[\s\S]{0,300}$/, // Any character, up to 300 characters (if provided)
        message: "Notes can be up to 300 characters."
      },
      date: {
        required: true,
        regex: /^\d{4}-\d{2}-\d{2}$/, // Matches dates in the format YYYY-MM-DD
        message: "Date must be in the format YYYY-MM-DD."
      },
      time: {
        required: true,
        regex: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/, // Matches times in 24-hour format HH:mm
        message: "Time must be in the format HH:mm (24-hour format)."
      }
    }

    for(let [key, value] of Object.entries(TASK_VALIDATIONS)) {
      if(value.required && !task[key]) {
        mutableErrors[key] = `${key} is required`
        continue
      }
  
      if(task[key] && value.regex && !value.regex.test(task[key]))
        mutableErrors[key] = value.message
    }

    setErrors(mutableErrors)

    if(_.isEmpty(mutableErrors)) return true

    return false
  }

  /**
   * Validate the task
   *   - If successful, call the createTask service
   *   - If unsuccessful, display errors on form
   * 
   * @param {React.FormEvent} event
   */
  const handleSubmit = (event) => {
    event.preventDefault()

    if(state.createTaskStatus === "loading") return

    let isValid = validateTask()

    if(isValid) {
      createTask(task, dispatch)
    }
  }

  return (
    <Wrapper dataTestId="create-task-modal" closeButtonDataTestId="close-create-task-modal-button" title="Create Task" visible={state.showCreateTaskModal} handleClose={handleClose}>
      <Tasks.CreateTaskForm 
        task={task}
        errors={errors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        status={state.createTaskStatus}
      />
    </Wrapper>
  )
}