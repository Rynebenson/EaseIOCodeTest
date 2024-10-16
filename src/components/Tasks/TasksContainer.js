import React, { useCallback, useContext, useMemo, useState } from "react"
import { Context } from "src/libs/Store"
import Tasks from "src/components/Tasks"
import { useLocation } from "react-router-dom"
import { countTasks, filterTasks } from "src/libs/utils/Tasks"
import { ACTION_TYPES } from "src/libs/Reducer"
import { updateTask } from "src/services/task"

/**
 * Smart container for Tasks
 * 
 * @returns {React.Component}
 */
export default function TasksContainer() {
  const [state, dispatch] = useContext(Context)
  const [query, setQuery] = useState("")
  const location = useLocation()

  const filter = useMemo(() => new URLSearchParams(location.search).get("filter"), [location.search])
  const tasks = useMemo(() => filterTasks(state.tasks, state.search_query, filter), [state.tasks, state.search_query, filter])
  const counts = useMemo(() => countTasks(state.tasks, state.search_query), [state.tasks, state.search_query])

  const createTaskButtonHandler = useCallback(() => {
    dispatch({ type: ACTION_TYPES.SHOW_CREATE_TASK_MODAL, payload: true })
  }, [dispatch])

  const handleSearchInputChange = useCallback((event) => {
    setQuery(event.target.value)

    dispatch({ type: ACTION_TYPES.UPDATE_SEARCH_QUERY, payload: event.target.value })
  }, [dispatch])

  const handleTaskCompletionClick = useCallback((task) => {
    updateTask(task, dispatch)
  }, [dispatch])

  const handleTaskDeletionClick = useCallback((payload) => (
    dispatch({ type: ACTION_TYPES.SHOW_DELETE_TASK_POPUP, payload })
  ), [dispatch])

  return (
    <div>
      <Tasks.TasksHeader createTaskButtonHandler={createTaskButtonHandler} />

      <Tasks.TasksSearchInput query={query} handleInputChange={handleSearchInputChange} />

      <Tasks.TasksNavigation filter={filter} counts={counts} />

      <Tasks.TasksList 
        status={state.tasks_status} 
        filter={filter} 
        searchQuery={query} 
        tasks={tasks} 
        createTaskButtonHandler={createTaskButtonHandler}
        handleTaskCompletionClick={handleTaskCompletionClick}
        handleTaskDeletionClick={handleTaskDeletionClick}
      />
    </div>
  )
}