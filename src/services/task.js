import API from "src/libs/API"
import { ACTION_TYPES } from "src/libs/Reducer"

export async function createTask(task, dispatch) {
  dispatch({ type: ACTION_TYPES.CREATE_TASK_REQUEST })

  try {
    let response = await API.CreateTask(task)

    console.log(response.data)
    
    dispatch({ type: ACTION_TYPES.CREATE_TASK_SUCCESS, payload: response.data })
  } catch(error) {
    console.log(error)

    dispatch({ type: ACTION_TYPES.CREATE_TASK_FAILURE, payload: error })
  }
}