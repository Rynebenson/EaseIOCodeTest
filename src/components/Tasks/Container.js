import { useContext, useMemo } from "react"
import { Context } from "../../libs/Store"
import Tasks from "../../components/Tasks"
import _ from "lodash"
import { useLocation } from "react-router-dom"

export default function TasksContainer() {
  const [state] = useContext(Context)
  const location = useLocation()

  const filter = useMemo(() => {
    return new URLSearchParams(location.search).get("filter")
  }, [location.search])

  const tasks = useMemo(() => {
    return _.filter(state.tasks, task => {
      const isMatch = _.includes(task.title?.toLowerCase(), state.search_query?.toLowerCase() ?? "")
    
      if(filter === "archived") {
        return task.archive && isMatch
      } else if (filter === "completed") {
        return !task.archive && task.completed && isMatch
      } else if (filter === "open") {
        return !task.archive && !task.completed && isMatch
      } else {
        return !task.archive && isMatch
      }
    })
  }, [state.tasks, state.search_query, filter])

  const counts = useMemo(() => {
    const isMatch = (task) => _.includes(task.title?.toLowerCase() ?? "", state.search_query?.toLowerCase() ?? "")
  
    return {
      all: _.filter(state.tasks, task => !task.archive && isMatch(task)).length,
      open: _.filter(state.tasks, task => !task.archive && !task.completed && isMatch(task)).length,
      completed: _.filter(state.tasks, task => !task.archive && task.completed && isMatch(task)).length,
      archived: _.filter(state.tasks, task => task.archive && isMatch(task)).length
    }
  }, [state.tasks, state.search_query])

  return (
    <div>
      <Tasks.Header />

      <Tasks.SearchInput />

      <Tasks.Navigation counts={counts} />

      <Tasks.List status={state.tasks_status} filter={filter} searchQuery={state.search_query} tasks={tasks} />
    </div>
  )
}