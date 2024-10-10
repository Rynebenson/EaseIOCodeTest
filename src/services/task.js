import API from "../libs/API"
import { ACTION_TYPES } from "../libs/Reducer"

export async function createTask(task, dispatch) {
  dispatch({ type: ACTION_TYPES.CREATE_TASK_REQUEST })

  try {
    let response = await API.CreateTask(task)

    dispatch({ type: ACTION_TYPES.CREATE_TASK_SUCCESS, payload: response.data })
  } catch(error) {
    dispatch({ type: ACTION_TYPES.CREATE_TASK_FAILURE, payload: error })
  }
}

export async function updateTask(task, dispatch) {
  dispatch({ type: ACTION_TYPES.UPDATE_TASK_REQUEST })

  try {
    let response = await API.UpdateTask(task)
    
    dispatch({ type: ACTION_TYPES.UPDATE_TASK_SUCCESS, payload: response.data })
  } catch(error) {
    dispatch({ type: ACTION_TYPES.UPDATE_TASK_FAILURE, payload: error })
  }
}