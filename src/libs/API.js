import { v4 } from "uuid"

export async function CreateTask(task) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      try {
        resolve({ data: { id: v4(), ...task } })
      } catch (error) {
        reject(error)
      }
    }, 2000)
  })
}

/**
 * Update task
 * 
 *   - Note* If you want to see loading toast for update, increase timeout to 2000
 * 
 * @param {Object} task 
 * @param {String} task.id
 * @param {Boolean} task.completed
 * @returns {Promise}
 */
export async function UpdateTask(task) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      try {
        resolve({ data: task })
      } catch (error) {
        reject(error)
      }
    }, 0)
  })
}

const API = {
  CreateTask,
  UpdateTask
}

export default API