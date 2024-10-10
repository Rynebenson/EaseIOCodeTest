import { useContext } from "react"
import { Context } from "../../libs/Store"
import Tasks from "../../components/Tasks"

export default function TasksContainer() {
  const [state] = useContext(Context)

  return (
    <Tasks.List status={state.tasks_status} tasks={state.tasks} />
  )
}