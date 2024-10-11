import _ from "lodash"

/**
 * Returns an array of tasks based off each filter and search 
 * 
 * @param {Array} tasks 
 * @param {String} searchQuery 
 * @param {String} filter 
 * @returns {Array}
 */
export const filterTasks = (tasks, searchQuery, filter) => {
  const match = (task) => _.includes(task.title?.toLowerCase() ?? "", searchQuery?.toLowerCase() ?? "")

  return _.filter(tasks, task => {
    if(!match(task)) return false

    if(filter === "archived") return task.archive
    if(filter === "completed") return !task.archive && task.completed
    if(filter === "open") return !task.archive && !task.completed

    return !task.archive
  })
}

/**
 * Returns the length of tasks for each filter
 * 
 * @param {Array} tasks
 * @returns {Object}
 */
export const countTasks = (tasks) => {
  return {
    all: _.filter(tasks, task => !task.archive).length,
    open: _.filter(tasks, task => !task.archive && !task.completed).length,
    completed: _.filter(tasks, task => !task.archive && task.completed).length,
    archived: _.filter(tasks, task => task.archive).length,
  }
}

/**
 * Returns the task title for each given filter
 * 
 * @param {String} filter 
 * @returns {String}
 */
export function getEmptyTasksTitle(filter) {
  switch (filter) {
    case "open":
      return "No open tasks found"
    case "completed":
      return "No completed tasks found"
    case "archived":
      return "No archived tasks found"
    default:
      return "No tasks found"
  }
}

/**
 * Returns the description for each task
 * 
 * @param {String} filter 
 * @param {String} searchQuery 
 * @returns {String}
 */
export function getEmptyTasksDescription(filter, searchQuery) {
  switch (filter) {
    case "open":
      return searchQuery 
        ? `Your search "${searchQuery}" did not match any tasks. Please try again.`
        : "Get started by clicking the button below and creating your first task."
    case "completed":
      return searchQuery 
        ? `Your search "${searchQuery}" did not match any tasks. Please try again.`
        : "As you mark tasks as complete, they will populate here."
    case "archived":
      return searchQuery 
        ? `Your search "${searchQuery}" did not match any tasks. Please try again.`
        : "As you archive tasks, they will populate here."
    default:
      return searchQuery
        ? `Your search "${searchQuery}" did not match any tasks. Please try again.`
        : "Get started by clicking the button below and creating your first task."
  }
}