import _ from "lodash"
import moment from "moment"
import TOASTS from "./TOASTS"
import { v4 } from "uuid"

export const ACTION_TYPES = {
  "LOAD_INITIAL_TASKS": "LOAD_INITIAL_TASKS",

  "SHOW_CREATE_TASK_MODAL": "SHOW_CREATE_TASK_MODAL",

  "CLEAR_CACHE": "CLEAR_CACHE",

  "REMOVE_TOAST": "REMOVE_TOAST",

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
      return { ...state, showCreateTaskModal: action.payload }

    case ACTION_TYPES.CLEAR_CACHE: {
      localStorage.setItem("tasks", JSON.stringify([]))

      return { ...state, tasks: [] }
    }

    case ACTION_TYPES.REMOVE_TOAST: {
      let mutableToasts = [...state.toasts]

      mutableToasts = _.filter(mutableToasts, toast => toast.id !== action.payload)

      return { ...state, toasts: [...mutableToasts] }
    }
      
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
      return { 
        ...state,
        toasts: [...state.toasts, { id: v4(), ...TOASTS.UPDATE_TASK_REQUEST }] 
      }
    case ACTION_TYPES.UPDATE_TASK_SUCCESS: {
      let mutableTasks = [...state.tasks]
      let mutableToasts = [...state.toasts]

      for(let task of mutableTasks) {
        if(task.id !== action.payload.id) continue

        task.completed = action.payload.completed
      }

      localStorage.setItem("tasks", JSON.stringify(mutableTasks))

      mutableToasts = _.filter(mutableToasts, toast => toast.message !== "Updating task...")

      return { 
        ...state,
        tasks: mutableTasks,
        toasts: [...mutableToasts, { id: v4(), ...TOASTS.UPDATE_TASK_SUCCESS }]
      }
    }
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