import _ from "lodash"

export const FilterTasks = (tasks, searchQuery, filter) => {
  const match = (task) => _.includes(task.title?.toLowerCase() ?? "", searchQuery?.toLowerCase() ?? "")

  return _.filter(tasks, task => {
    if(!match(task)) return false

    if(filter === "archived") return task.archive
    if(filter === "completed") return !task.archive && task.completed
    if(filter === "open") return !task.archive && !task.completed

    return !task.archive
  })
}

export const CountTasks = (tasks) => {
  return {
    all: _.filter(tasks, task => !task.archive).length,
    open: _.filter(tasks, task => !task.archive && !task.completed).length,
    completed: _.filter(tasks, task => !task.archive && task.completed).length,
    archived: _.filter(tasks, task => task.archive).length,
  }
}

export function GetEmptyTasksTitle(filter) {
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

export function GetEmptyTasksDescription(filter, searchQuery) {
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