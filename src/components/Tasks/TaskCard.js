import moment from "moment"
import CompleteTaskButton from "./CompleteTaskButton"
import DeleteTaskButton from "./DeleteTaskButton"

/**
 * @param {React.ComponentProps} props
 * @param {Boolean} props.task
 * @returns {React.Component}
 */
export default function TaskCard(props) {
  return (
    <div
      key={props.task.index}
      className="relative rounded-xl shadow-sm bg-white p-6 pb-3"
    >
      <div className="flex items-center">
        <div className="w-full">
          <h2 
            className={`text-xl text-slate-900 font-medium
              ${props.task.completed ? "line-through" : ""}
            `}
          >{props.task.title}</h2>

          <p className="text-slate-500">{props.task.notes}</p>
        </div>

        <CompleteTaskButton id={props.task.id} completed={props.task.completed} />
      </div>

      <div className="flex items-center border-t border-slate-100 pt-3 mt-6">
        <p className="text-sm text-slate-500">{moment(`${props.task.date} ${props.task.time}`).format("MMMM Do, YYYY h:mm a")}</p>

        <DeleteTaskButton id={props.task.id} title={props.task.title} />
      </div>
    </div>
  )
}