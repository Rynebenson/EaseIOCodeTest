import API from "src/libs/API"
import { ACTION_TYPES } from "src/libs/Reducer"

/**
 * Call the create task API endpoint and dispatch the respective states (loading, success, failure)
 * 
 * @param {Object} task
 * @param {String} task.id
 * @param {String} task.title
 * @param {String} task.date
 * @param {String} task.time
 * @param {String} task.notes
 * @param {Function} dispatch 
 */
export async function createTask(task, dispatch) {
  dispatch({ type: ACTION_TYPES.CREATE_TASK_REQUEST })

  try {
    let response = await API.CreateTask(task)

    dispatch({ type: ACTION_TYPES.CREATE_TASK_SUCCESS, payload: response.data })
  } catch(error) {
    dispatch({ type: ACTION_TYPES.CREATE_TASK_FAILURE, payload: error })
  }
}

/**
 * Call the update task API endpoint and dispatch the respective states (loading, success, failure)
 * 
 * @param {Object} task
 * @param {String} task.id
 * @param {Boolean} task.completed
 * @param {Function} dispatch
 */
export async function updateTask(task, dispatch) {
  dispatch({ type: ACTION_TYPES.UPDATE_TASK_REQUEST })

  try {
    let response = await API.UpdateTask(task)
    
    dispatch({ type: ACTION_TYPES.UPDATE_TASK_SUCCESS, payload: response.data })
  } catch(error) {
    dispatch({ type: ACTION_TYPES.UPDATE_TASK_FAILURE, payload: error })
  }
}

/**
 * Call the archive task API endpoint and dispatch the respective states (loading, success, failure)
 * 
 * @param {Object} task
 * @param {String} task.id
 * @param {String} task.archived
 * @param {Function} dispatch 
 */
export async function archiveTask(task, dispatch) {
  dispatch({ type: ACTION_TYPES.ARCHIVE_TASK_REQUEST })

  try {
    let response = await API.ArchiveTask(task)
    
    dispatch({ type: ACTION_TYPES.ARCHIVE_TASK_SUCCESS, payload: response.data })
  } catch(error) {
    dispatch({ type: ACTION_TYPES.ARCHIVE_TASK_FAILURE, payload: error })
  }
}

/**
 * Call the delete task API endpoint and dispatch the respective states (loading, success, failure)
 * 
 * @param {Object} task
 * @param {String} task.id
 * @param {Function} dispatch 
 */
export async function deleteTask(task, dispatch) {
  dispatch({ type: ACTION_TYPES.DELETE_TASK_REQUEST })

  try {
    let response = await API.DeleteTask(task)
    
    dispatch({ type: ACTION_TYPES.DELETE_TASK_SUCCESS, payload: response.data })
  } catch(error) {
    dispatch({ type: ACTION_TYPES.DELETE_TASK_FAILURE, payload: error })
  }
}