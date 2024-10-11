import Tasks from "src/components/Tasks"

/**
 * Renders the title and CreateTaskButton for the Home page
 * 
 * @param {React.ComponentProps} props
 * @param {Function} props.createTaskButtonHandler
 * @returns {React.Component}
 */
export default function TasksHeader(props) {
  return (
    <div className="w-full flex items-center justify-between z-10 py-4">
      <h2 className="text-2xl text-slate-900">Tasks</h2>

      <Tasks.CreateTaskButton handleClick={props.createTaskButtonHandler} />
    </div>
  )
}