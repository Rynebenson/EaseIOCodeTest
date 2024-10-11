import { useMemo } from "react"
import Tasks from "."

/**
 * @param {React.ComponentProps} props
 * @param {Boolean} props.status
 * @param {Array} props.tasks
 * @returns {React.Component}
 */
export default function TasksList(props) {

  const emptyTasksTitle = useMemo(() => {
    switch(props.filter) {
      case "open":
        return "No open tasks found"
      case "completed":
        return "No completed tasks found"
      case "archived":
        return "No archived tasks found"
      default:
        return "No tasks found"
    }
  }, [props.filter])

  const emptyTasksDescription = useMemo(() => {
    switch(props.filter) {
      case "open":
        return "Get started by clicking the button below and creating your first task."
      case "completed":
        return "As you mark tasks as complete, they will populate here."
      case "archived":
        return "As you archive tasks, they will populate here."
      default:
        return "Get started by clicking the button below and creating your first task."
    }
  }, [props.filter])

  if(props.tasks?.length === 0 && !props.searchQuery) {
    return (
      <div className="flex flex-col items-center w-full max-w-md mx-auto mt-12">
        <h3 className="font-medium">{emptyTasksTitle}</h3>

        <p className="text-slate-500 text-center mb-4">{emptyTasksDescription}</p>

        <Tasks.CreateTaskButton />
      </div>
    )
  }

  if(props.tasks?.length === 0 && props.searchQuery) {
    return (
      <div className="text-center w-full max-w-md mx-auto mt-12">
        <h3 className="font-medium">{emptyTasksTitle}</h3>

        <p className="text-slate-500">{`Your search "${props.searchQuery}" did not match any tasks. Please try again.`}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-6">
      {props.tasks?.map((task, index) => <Tasks.TaskCard key={index} task={task} />)}
    </div>
  )
}