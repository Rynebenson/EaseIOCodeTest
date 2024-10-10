import { useContext, useMemo } from "react"
import { Context } from "../../libs/Store"
import Tasks from "../../components/Tasks"
import _ from "lodash"

export default function TasksContainer() {
  const [state] = useContext(Context)

  const tasks = useMemo(() => {
    return _.filter(state.tasks, task => !task.archive)
  }, [state.tasks])

  return (
    <Tasks.List status={state.tasks_status} tasks={tasks} />
  )
}