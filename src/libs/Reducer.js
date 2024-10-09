export const ACTION_TYPES = {
  "LOAD_INITIAL_TASKS": "LOAD_INITIAL_TASKS",

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
      return { ...state, tasks: action.payload }
      
    case ACTION_TYPES.CREATE_TASK_REQUEST: 
      return { ...state, }
    case ACTION_TYPES.CREATE_TASK_SUCCESS:
      return { ...state, }
    case ACTION_TYPES.CREATE_TASK_FAILURE:
      return { ...state, }

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