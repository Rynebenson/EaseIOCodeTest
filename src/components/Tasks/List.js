import moment from "moment";
import { TbCheck } from "react-icons/tb";

/**
 * @param {React.ComponentProps} props
 * @param {Boolean} props.status
 * @param {Array} props.tasks
 * @returns {React.Component}
 */
export default function TasksList(props) {
  return (
    <div className="flex flex-col gap-y-6 pb-10">
      {props.tasks?.map((task, index) => (
        <div
          key={task.index}
          className="relative rounded-xl shadow-md border border-slate-100 p-6"
        >
          <div className="flex items-center">
            <div className="w-full">
              <h2 className="text-xl text-slate-900 font-medium">{task.title}</h2>

              <p className="text-slate-500">{task.notes}</p>
            </div>

            <button
              className={`rounded-full h-8 w-8 border border-slate-200 shrink-0

              `}
            >
              {task.completed && <TbCheck />}
            </button>
          </div>

          <div className="border-t border-slate-100 pt-3 mt-6">
            <p className="text-sm text-slate-500">{moment(`${task.date} ${task.time}`).format("MMMM Do, YYYY h:mm a")}</p>
          </div>
        </div>
      ))}
    </div>
  )
}