import moment from "moment"
import { TbCheck } from "react-icons/tb"

/**
 * @param {React.ComponentProps} props
 * @param {Boolean} props.task
 * @returns {React.Component}
 */
export default function TaskCard(props) {
  return (
    <div
      key={props.task.index}
      className="relative rounded-xl shadow-sm bg-white p-6"
    >
      <div className="flex items-center">
        <div className="w-full">
          <h2 className="text-xl text-slate-900 font-medium">{props.task.title}</h2>

          <p className="text-slate-500">{props.task.notes}</p>
        </div>

        <button
          className={`rounded-full h-8 w-8 border border-slate-200 shrink-0

          `}
        >
          {props.task.completed && <TbCheck />}
        </button>
      </div>

      <div className="border-t border-slate-100 pt-3 mt-6">
        <p className="text-sm text-slate-500">{moment(`${props.task.date} ${props.task.time}`).format("MMMM Do, YYYY h:mm a")}</p>
      </div>
    </div>
  )
}