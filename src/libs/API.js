import { v4 } from "uuid"

/**
 * Archive task
 * 
 * @param {Object} task
 * @param {String} task.id
 * @param {Boolean} task.archive
 * @returns {Promise}
 */
export async function ArchiveTask(task) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      try {
        resolve({ data: task })
      } catch (error) {
        reject(error)
      }
    }, 2000)
  })
}

/**
 * Create new task
 * 
 * @param {Object} task 
 * @param {String} task.id
 * @param {String} task.date
 * @param {String} task.time
 * @param {String} task.notes
 * @param {String} task.completed
 * @returns {Promise}
 */
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

/**
 * @param {Object} task 
 * @param {String} task.id
 * @returns {Promise}
 */
export async function DeleteTask(task) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      try {
        resolve({ data: task.id })
      } catch (error) {
        reject(error)
      }
    }, 2000)
  })
}

const API = {
  ArchiveTask,
  CreateTask,
  DeleteTask,
  UpdateTask
}

export default API