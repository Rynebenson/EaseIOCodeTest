import _ from "lodash"
import moment from "moment"

export const ACTION_TYPES = {
  "LOAD_INITIAL_TASKS": "LOAD_INITIAL_TASKS",

  "SHOW_CREATE_TASK_MODAL": "SHOW_CREATE_TASK_MODAL",

  "CREATE_TASK_REQUEST": "CREATE_TASK_REQUEST",
  "CREATE_TASK_SUCCESS": "CREATE_TASK_SUCCESS",
  "CREATE_TASK_FAILURE": "CREATE_TASK_FAILURE",

  "UPDATE_TASK_REQUEST": "UPDATE_TASK_REQUEST",
  "UPDATE_TASK_SUCCESS": "UPDATE_TASK_SUCCESS",
  "UPDATE_TASK_FAILURE": "UPDATE_TASK_FAILURE",

  "ARCHIVE_TASK_REQUEST": "ARCHIVE_TASK_REQUEST",
  "ARCHIVE_TASK_SUCCESS": "ARCHIVE_TASK_SUCCESS",
  "ARCHIVE_TASK_FAILURE": "ARCHIVE_TASK_FAILURE",

  "DELETE_TASK_REQUEST": "DELETE_TASK_REQUEST",
  "DELETE_TASK_SUCCESS": "DELETE_TASK_SUCCESS",
  "DELETE_TASK_FAILURE": "DELETE_TASK_FAILURE"
}

export const Reducer = (state, action) => {
  switch(action.type) {
    case ACTION_TYPES.LOAD_INITIAL_TASKS:
      return { ...state, tasks: action.payload, fetch_tasks_request: false }

    case ACTION_TYPES.SHOW_CREATE_TASK_MODAL:
      return { ...state, show_create_task_modal: action.payload }
      
    case ACTION_TYPES.CREATE_TASK_REQUEST:
      return { ...state, createTaskStatus: "loading" }
    case ACTION_TYPES.CREATE_TASK_SUCCESS: {
      let mutableTasks = [...state.tasks]

      mutableTasks.push(action.payload)

      mutableTasks = _.sortBy(mutableTasks, (task) => moment(`${task.date} ${task.time}`, "YYYY-MM-DD HH:mm"));

      localStorage.setItem("tasks", JSON.stringify(mutableTasks))

      return { ...state, createTaskStatus: "success", tasks: mutableTasks }
    }
    case ACTION_TYPES.CREATE_TASK_FAILURE:
      return { ...state, createTaskStatus: "error" }

    case ACTION_TYPES.UPDATE_TASK_REQUEST:
      return { ...state, }
    case ACTION_TYPES.UPDATE_TASK_SUCCESS:
      return { ...state, }
    case ACTION_TYPES.UPDATE_TASK_FAILURE:
      return { ...state, }

    case ACTION_TYPES.ARCHIVE_TASK_REQUEST:
      return { ...state, }
    case ACTION_TYPES.ARCHIVE_TASK_SUCCESS:
      return { ...state, }
    case ACTION_TYPES.ARCHIVE_TASK_FAILURE:
      return { ...state, }

    case ACTION_TYPES.DELETE_TASK_REQUEST:
      return { ...state, }
    case ACTION_TYPES.DELETE_TASK_SUCCESS:
      return { ...state, }
    case ACTION_TYPES.DELETE_TASK_FAILURE:
      return { ...state, }

    default:
      return state
  }
}