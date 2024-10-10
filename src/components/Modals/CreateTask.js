import _ from "lodash"
import { useContext, useEffect, useState } from "react"
import { TbX } from "react-icons/tb"
import { ACTION_TYPES } from "../../libs/Reducer"
import { Context } from "../..//libs/Store"
import { createTask } from "../../services/task"
import Spinner from "react-spinners/ClipLoader"

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

  const handleClose = () => {
    setTask({ title: "", notes: "", date: "", time: "", completed: false })

    dispatch({ type: ACTION_TYPES.SHOW_CREATE_TASK_MODAL, payload: false })
  }
  
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

    let valid = validateTask()

    if(valid) {
      createTask(task, dispatch)
    }
  }

  return (
    <div 
      data-testid="create-task-modal" 
      className={`fixed ${state.showCreateTaskModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} overflow-auto top-0 left-0 h-full w-full bg-slate-500/50 z-40`}
    >
      <div className={`flex flex-col ${state.showCreateTaskModal ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transition-all duration-300 origin-top h-auto bg-white p-6 m-auto sm:rounded-xl sm:my-20 w-full max-w-lg shadow-md md:w-50`}>
        <div className="flex justify-between items-center pb-4">
          <h2 className="font-medium text-xl">Create Task</h2>

          <button 
            className="flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-all text-xl h-8 w-8 ml-auto"
            onClick={handleClose}
          >
            <TbX />
          </button>
        </div>

        <form
          className="flex flex-col gap-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              data-testid="title-input"
              className="w-full border-b-2 border-slate-200 placeholder:text-slate-400 rounded-none h-10 outline-none focus:border-blue-600"
              name="title"
              placeholder="Title"
              value={task.title}
              onChange={handleInputChange}
              autoComplete="off"
            />

            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="flex gap-x-6">
            <div className="w-full">
              <input
                data-testid="date-input"
                className="w-full border-b-2 border-slate-200 placeholder:text-slate-400 h-10 rounded-none outline-none focus:border-blue-600"
                type="date"
                name="date"
                placeholder="Date"
                value={task.date}
                onChange={handleInputChange}
                autoComplete="off"
              />

              {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
            </div>
            
            <div className="w-1/3 shrink-0">
              <input
                data-testid="time-input"
                className="w-full border-b-2 border-slate-200 placeholder:text-slate-400 h-10 rounded-none outline-none focus:border-blue-600"
                type="time"
                name="time"
                placeholder="Time"
                value={task.time}
                onChange={handleInputChange}
                autoComplete="off"
              />

              {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
            </div>
          </div>

          <div>
            <textarea
              data-testid="notes-input"
              className="w-full border-b-2 border-slate-200 placeholder:text-slate-400 h-20 outline-none resize-none rounded-none focus:border-blue-600"
              name="notes"
              placeholder="Notes (Optional)"
              value={task.notes}
              onChange={handleInputChange}
              autoComplete="off"
            />

            {errors.notes && <p className="text-sm text-red-500">{errors.notes}</p>}
          </div>

          <div>
            <button 
              data-testid="create-task-submit-button"
              className="flex items-center justify-center w-full h-10 bg-blue-600 rounded-full text-white font-medium"
              disabled={state.createTaskStatus === "loading"}
            >
              {state.createTaskStatus === "loading" ? <Spinner color="#FFF" size={18} /> : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}