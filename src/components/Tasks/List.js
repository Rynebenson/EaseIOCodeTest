import Tasks from "."

/**
 * @param {React.ComponentProps} props
 * @param {Boolean} props.status
 * @param {Array} props.tasks
 * @returns {React.Component}
 */
export default function TasksList(props) {
  return (
    <div className="flex flex-col gap-y-6 pb-10">
      {props.tasks?.map((task, index) => <Tasks.TaskCard key={index} task={task} />)}
    </div>
  )
}