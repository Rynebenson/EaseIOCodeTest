import Tasks from "src/components/Tasks"
import { GetEmptyTasksDescription, GetEmptyTasksTitle } from "src/libs/utils/tasks"

/**
 * Renders list of Tasks or empty tasks message based off of filter and search query
 * 
 * @param {React.ComponentProps} props
 * @param {Boolean} props.status
 * @param {Array} props.tasks
 * @param {Function} props.handleTaskCompletionClick
 * @param {Function} props.handleTaskDeletionClick
 * @returns {React.Component}
 */
export default function TasksList(props) {
  if(props.tasks?.length === 0) {
    const emptyTitle = GetEmptyTasksTitle(props.filter)
    const emptyDescription = GetEmptyTasksDescription(props.filter, props.searchQuery)

    return (
      <div className="flex flex-col items-center w-full max-w-md mx-auto mt-12">
        <h3 className="font-medium">{emptyTitle}</h3>

        <p className="text-slate-500 text-center mb-4">{emptyDescription}</p>

        <Tasks.CreateTaskButton handleClick={props.createTaskButtonHandler} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-6">
      {props.tasks.map((task) => (
        <Tasks.TaskCard
          key={task.id} 
          task={task} 
          handleTaskCompletionClick={props.handleTaskCompletionClick} 
          handleTaskDeletionClick={props.handleTaskDeletionClick}
        />
      ))}
    </div>
  )
}