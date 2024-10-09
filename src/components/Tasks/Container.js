import { useContext } from "react"
import { Context } from "src/libs/Store"
import Tasks from "src/components/Tasks"

export default function TasksContainer() {
  const [state] = useContext(Context)

  return (
    <Tasks.List status={state.tasks_status} tasks={state.tasks} />
  )
}